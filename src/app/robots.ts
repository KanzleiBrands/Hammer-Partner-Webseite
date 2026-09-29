import type { MetadataRoute } from "next";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hammerpartnerwebseite.vercel.app";

export default function robots(): MetadataRoute.Robots {
  // Solange die Seite nur als Vorschau unter *.vercel.app läuft, nicht indexieren.
  const isLive = process.env.NEXT_PUBLIC_SITE_URL && !process.env.NEXT_PUBLIC_SITE_URL.includes("vercel.app");
  return {
    rules: isLive ? { userAgent: "*", allow: "/", disallow: ["/keystatic", "/api"] } : { userAgent: "*", disallow: "/" },
    sitemap: `${base}/sitemap.xml`,
  };
}
