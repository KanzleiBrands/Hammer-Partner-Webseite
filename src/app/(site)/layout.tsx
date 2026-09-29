import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getJobs, getSettings } from "@/lib/content";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, jobs] = await Promise.all([getSettings(), getJobs()]);
  return (
    <>
      <a
        href="#inhalt"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
      >
        Zum Inhalt springen
      </a>
      <Header jobCount={jobs.length} phone={settings.telefon} phoneLink={settings.telefonLink} />
      <main id="inhalt">{children}</main>
      <Footer settings={settings} />
    </>
  );
}
