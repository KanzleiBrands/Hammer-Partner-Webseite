// Prüft alle Seiten auf mehreren Bildschirmgrößen: Werden Gesichter (siehe src/lib/faces.ts)
// von Text/Elementen verdeckt oder vom Bildausschnitt abgeschnitten?
// Nutzung: npm run build && npm start, dann: npm run test:faces
import { chromium } from 'playwright-core';
import fs from 'fs';
const src = fs.readFileSync(new URL('../src/lib/faces.ts', import.meta.url), 'utf8');
const zones = {};
for (const m of src.matchAll(/"?([a-z0-9-]+)"?: \[([0-9., ]+)\]/g)) zones[m[1]] = m[2].split(',').map(Number);
const pages = (process.argv[2] || '/,/leistungen,/ueber-uns,/karriere,/karriere/steuerfachangestellter-lohn,/karriere/initiativbewerbung,/kontakt,/mandantenbereich').split(',');
const sizes = (process.env.SIZES || '1440x900,1280x800,1024x768,768x1024,390x664,320x568').split(',').map(s => s.split('x').map(Number));
const b = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH, args: ['--no-sandbox'] });
let problems = 0;
for (const [w, h] of sizes) for (const path of pages) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  await p.goto((process.env.BASE_URL || 'http://localhost:3000') + path, { waitUntil: 'networkidle' });
  await p.addStyleTag({ content: '*{animation:none!important;transition:none!important}' });
  const n = await p.evaluate(() => document.querySelectorAll('main img').length);
  for (let i = 0; i < n; i++) {
    const info = await p.evaluate(async ({ i, zones }) => {
      const img = document.querySelectorAll('main img')[i];
      if (img.hasAttribute('data-single-face') || img.hasAttribute('data-face-exempt')) return null; const s = img.currentSrc || img.src; const u = decodeURIComponent(s);
      const m = u.match(/\/cms\/([^/]+)\/bild\./) || u.match(/\/([^/?&]+)\.(webp|jpe?g|png)/);
      const k = m && m[1]; const z = zones[k]; if (!z) return null;
      img.scrollIntoView({ block: 'center' }); await new Promise(r => setTimeout(r, 1400)); try { await img.decode(); } catch {}
      // Reveal/Framer: warten bis sichtbar
      const r = img.getBoundingClientRect(); if (r.width < 20 || r.height < 20) return null;
      const cs = getComputedStyle(img);
      if (!img.naturalWidth) return null;
      const nw = img.naturalWidth, nh = img.naturalHeight;
      const sc = Math.max(r.width / nw, r.height / nh); const dw = nw * sc, dh = nh * sc;
      const [px, py] = cs.objectPosition.split(' ').map(v => parseFloat(v) / 100);
      const ox = r.left + (r.width - dw) * px, oy = r.top + (r.height - dh) * py;
      const f = { l: ox + z[0] * dw, t: oy + z[1] * dh, r: ox + z[2] * dw, b: oy + z[3] * dh };
      // Clip durch overflow-hidden Vorfahren
      let c = { l: r.left, t: r.top, r: r.right, b: r.bottom };
      for (let el = img.parentElement; el && el !== document.body; el = el.parentElement) {
        const st = getComputedStyle(el);
        if (st.overflow !== 'visible' || st.overflowX !== 'visible') {
          const er = el.getBoundingClientRect();
          c = { l: Math.max(c.l, er.left), t: Math.max(c.t, er.top), r: Math.min(c.r, er.right), b: Math.min(c.b, er.bottom) };
        }
      }
      const area = (a) => Math.max(0, a.r - a.l) * Math.max(0, a.b - a.t);
      const inter = { l: Math.max(f.l, c.l), t: Math.max(f.t, c.t), r: Math.min(f.r, c.r), b: Math.min(f.b, c.b) };
      const visibleShare = area(inter) / area(f);
      const issues = [];
      if (visibleShare < 0.97) issues.push(`CUT ${(100 - visibleShare * 100).toFixed(0)}%`);
      // Verdeckung prüfen
      const vp = { l: 0, t: 0, r: innerWidth, b: innerHeight };
      const q = { l: Math.max(inter.l, vp.l), t: Math.max(inter.t, vp.t), r: Math.min(inter.r, vp.r), b: Math.min(inter.b, vp.b) };
      const hits = new Set();
      if (area(q) > 0) for (let gx = 0; gx <= 6; gx++) for (let gy = 0; gy <= 6; gy++) {
        const x = q.l + (q.r - q.l) * gx / 6, y = q.t + (q.b - q.t) * gy / 6;
        for (const el of document.elementsFromPoint(x, y)) {
          if (el === img) break;
          const er = el.getBoundingClientRect(); const st = getComputedStyle(el);
          if (st.visibility === 'hidden' || +st.opacity < 0.05) continue;
          // eigener Text an diesem Punkt?
          let text = false;
          for (const node of el.childNodes) if (node.nodeType === 3 && node.textContent.trim()) {
            const rg = document.createRange(); rg.selectNodeContents(node);
            for (const rr of rg.getClientRects()) if (x >= rr.left && x <= rr.right && y >= rr.top && y <= rr.bottom) text = true;
          }
          const full = er.width >= c.r - c.l - 2 && er.height >= c.b - c.t - 2;
          const solid = st.backgroundColor !== 'rgba(0, 0, 0, 0)' || st.backgroundImage !== 'none' || st.boxShadow !== 'none' || el.tagName === 'svg' || el.tagName === 'IMG';
          if (text) hits.add('TEXT:' + el.tagName + ' "' + el.textContent.trim().slice(0, 30) + '"');
          else if (solid && !full && !el.closest('header')) hits.add('ELEM:' + el.tagName + '.' + String(el.className).slice(0, 40));
          else if (el.closest('header') && (text || el.tagName === 'svg' || el.tagName === 'A')) hits.add('HEADER');
        }
      }
      issues.push(...hits);
      return { k, issues };
    }, { i, zones });
    if (info && info.issues.length) { problems++; console.log(`${w}px ${path} [${info.k}] ${info.issues.join(' | ')}`); }
  }
  await p.close();
}
console.log('PROBLEMS:', problems);
await b.close();
process.exitCode = problems ? 1 : 0;
