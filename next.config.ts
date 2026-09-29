import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
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
    ];
  },
};

export default nextConfig;
