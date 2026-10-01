import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Höhere Qualität für die großen Teamfotos (Standard wäre 75)
    qualities: [85],
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920, 2560, 3200],
  },
  async redirects() {
    // Alte URLs der bisherigen Website auf die neuen Seiten umleiten (SEO)
    return [
      { source: "/kanzlei", destination: "/ueber-uns", permanent: true },
      { source: "/kanzlei/partner", destination: "/ueber-uns", permanent: true },
      { source: "/kanzlei/mitarbeiter", destination: "/ueber-uns", permanent: true },
      { source: "/kanzlei/stellenangebote", destination: "/karriere", permanent: true },
      { source: "/leistungen/:path+", destination: "/leistungen", permanent: true },
      { source: "/beratungskonzept", destination: "/leistungen", permanent: true },
      { source: "/mandantenbereich/:path+", destination: "/mandantenbereich", permanent: true },
      { source: "/kontakt/:path+", destination: "/kontakt", permanent: true },
      { source: "/karriere/steuerfachangestellte-lohn", destination: "/karriere/steuerfachangestellter-lohn", permanent: true },
    ];
  },
};

export default nextConfig;
