// Kopfbereiche je Foto (x0, y0, x1, y1 in Anteilen 0–1). Daraus berechnen wir den
// Bildausschnitt (object-position), damit Gesichter nie abgeschnitten werden.
// Auch für den automatischen Layout-Test (Gesichter nicht verdeckt) genutzt.
export const faceZones: Record<string, [number, number, number, number]> = {
  "arbeitsplatz-1": [0.33, 0.2, 0.62, 0.6],
  "arbeitsplatz-2": [0.4, 0.18, 0.63, 0.55],
  "arbeitsplatz-3": [0.32, 0.08, 0.58, 0.47],
  "arbeitsplatz-4": [0.43, 0.15, 0.66, 0.52],
  "arbeitsplatz-5": [0.33, 0.22, 0.52, 0.6],
  "arbeitsplatz-6": [0.34, 0.08, 0.57, 0.48],
  "arbeitsplatz-lachen": [0.33, 0.15, 0.58, 0.55],
  belegablage: [0.47, 0.2, 0.72, 0.55],
  "beratung-gespraech": [0.0, 0.08, 0.65, 0.5],
  "besprechung-flipchart": [0.62, 0.18, 0.82, 0.45],
  "besprechung-lachen": [0.38, 0.2, 0.65, 0.62],
  "besprechung-logo": [0.2, 0.3, 0.7, 0.62],
  "besprechung-team": [0.05, 0.3, 0.95, 0.55],
  buerohund: [0.3, 0.08, 0.58, 0.45],
  "empfang-hund": [0.25, 0.28, 0.66, 0.7],
  "flur-gespraech": [0.35, 0.25, 0.62, 0.45],
  headset: [0.35, 0.05, 0.62, 0.48],
  "kollegen-bildschirm": [0.3, 0.05, 0.7, 0.6],
  "kollegen-lachen": [0.45, 0.2, 0.9, 0.7],
  "kolleginnen-ordner": [0.28, 0.15, 0.68, 0.45],
  "partner-himmel": [0.33, 0.2, 0.65, 0.45],
  partner: [0.32, 0.15, 0.62, 0.45],
  quartett: [0.2, 0.25, 0.72, 0.47],
  schreibtisch: [0.6, 0.3, 0.8, 0.62],
  stehpult: [0.5, 0.2, 0.62, 0.4],
  "team-aussen": [0.2, 0.42, 0.82, 0.58],
  "team-eingang": [0.12, 0.25, 0.82, 0.42],
  "team-innen": [0.1, 0.28, 0.98, 0.52],
  "team-jung": [0.3, 0.25, 0.85, 0.72],
  // CMS-Bilder (Leistungen / Stellen)
  "laufende-steuerberatung": [0.3, 0.05, 0.7, 0.6],
  "vorausschauende-steuergestaltung": [0.62, 0.18, 0.82, 0.45],
  "digitale-buchhaltung-und-lohn": [0.33, 0.15, 0.58, 0.55],
  "betriebswirtschaftliche-beratung": [0.0, 0.08, 0.65, 0.5],
  "steuerfachangestellte-lohn": [0.35, 0.05, 0.62, 0.48],
};

function key(src: string) {
  const m = src.match(/\/cms\/([^/]+)\/bild\./) ?? src.match(/\/([^/]+)\.(webp|jpe?g|png)$/);
  return m?.[1] ?? "";
}

/**
 * object-position, das die Gesichter im Ausschnitt hält: Der freie Rand links/rechts
 * (bzw. oben/unten) wird proportional verteilt. Damit bleiben alle Köpfe sichtbar,
 * sobald der Ausschnitt überhaupt breit genug ist – egal welches Seitenverhältnis.
 */
export function focus(src: string, fallback = "50% 50%") {
  const z = faceZones[key(src)];
  if (!z) return fallback;
  const axis = (a: number, b: number) => {
    const free = a + (1 - b);
    return free <= 0 ? 50 : (a / free) * 100;
  };
  return `${axis(z[0], z[2]).toFixed(1)}% ${axis(z[1], z[3]).toFixed(1)}%`;
}
