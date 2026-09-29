import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hammer & Partner mbB Steuerberater | Betzdorf",
  description:
    "Steuerberatung in Betzdorf – digital, vorausschauend und persönlich. Für uns steht der Mensch im Mittelpunkt.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
