import type { MetadataRoute } from "next";
import { getJobs } from "@/lib/content";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hammerpartnerwebseite.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const jobs = await getJobs();
  const pages = ["", "/leistungen", "/ueber-uns", "/karriere", "/karriere/initiativbewerbung", "/mandantenbereich", "/kontakt"];
  return [
    ...pages.map((p) => ({ url: `${base}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 })),
    ...jobs.map((j) => ({ url: `${base}/karriere/${j.slug}`, changeFrequency: "weekly" as const, priority: 0.9 })),
  ];
}
