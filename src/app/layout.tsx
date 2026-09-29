import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://hammerpartnerwebseite.vercel.app",
  ),
  title: {
    default: "Hammer & Partner mbB Steuerberater | Betzdorf",
    template: "%s | Hammer & Partner mbB Steuerberater",
  },
  description:
    "Steuerberatung in Betzdorf – digital, vorausschauend und persönlich. Für uns steht der Mensch im Mittelpunkt.",
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Hammer & Partner mbB Steuerberater",
    images: ["/images/fotos/team-aussen.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#253781",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
