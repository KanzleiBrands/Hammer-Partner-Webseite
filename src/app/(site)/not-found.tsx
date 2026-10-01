import { Button, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[80vh] items-center bg-brand-900 pt-24 text-white">
      <Container>
        <div className="text-8xl font-semibold tracking-tight text-brand-200/40 sm:text-[10rem]">404</div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Diese Seite gibt es leider nicht.</h1>
        <p className="mt-4 max-w-lg text-lg text-white/70">Vielleicht hilft Dir einer dieser Wege weiter:</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/" variant="light">Zur Startseite</Button>
          <Button href="/kontakt" variant="outline-light">Kontakt</Button>
        </div>
      </Container>
    </section>
  );
}
