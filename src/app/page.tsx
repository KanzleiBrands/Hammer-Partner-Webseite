export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-surface px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand">
        Hammer &amp; Partner mbB Steuerberater
      </p>
      <h1 className="mt-4 max-w-2xl text-4xl font-bold text-ink sm:text-5xl">
        Für uns steht der Mensch im Mittelpunkt.
      </h1>
      <p className="mt-6 text-muted">Unsere neue Website entsteht gerade.</p>
      <p className="mt-2 text-muted">
        Moltkestraße 71 · 57518 Betzdorf ·{" "}
        <a className="text-brand underline" href="tel:+492741991730">
          02741 991730
        </a>
      </p>
    </main>
  );
}
