"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Field } from "./ApplicationForm";

const topics = ["Neue Mandantschaft", "Existenzgründung", "Steuergestaltung", "Digitale Buchhaltung", "Sonstiges"];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [topic, setTopic] = useState(topics[0]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, thema: topic }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-[2rem] bg-white p-10 text-center shadow-xl ring-1 ring-ink/5">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-50 text-emerald-600">
          <Check className="h-10 w-10" />
        </span>
        <h3 className="mt-6 text-3xl font-semibold tracking-tight">Danke für deine Nachricht!</h3>
        <p className="mx-auto mt-4 max-w-md text-muted">Wir melden uns so schnell wie möglich bei dir.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-[2rem] bg-white p-6 shadow-[0_40px_100px_-40px_rgba(14,22,54,0.35)] ring-1 ring-ink/5 sm:p-10">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="text-sm font-medium text-ink">Worum geht es?</div>
      <div className="mt-3 flex flex-wrap gap-2">
        {topics.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTopic(t)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              topic === t ? "bg-brand text-white" : "bg-grey-50 text-ink/80 ring-1 ring-grey-100 hover:ring-brand/40"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Field label="Vor- und Nachname" name="name" required autoComplete="name" />
        <Field label="Unternehmen (optional)" name="unternehmen" autoComplete="organization" />
        <Field label="E-Mail-Adresse" name="email" type="email" required autoComplete="email" />
        <Field label="Telefonnummer" name="telefon" type="tel" autoComplete="tel" />
        <Field label="Deine Nachricht" name="nachricht" required textarea className="sm:col-span-2" />
        <label className="flex items-start gap-3 text-sm text-muted sm:col-span-2">
          <input type="checkbox" required className="mt-1 h-4 w-4 accent-[#253781]" />
          <span>
            Ich bin mit der Verarbeitung meiner Daten zur Bearbeitung meiner Anfrage einverstanden. Mehr dazu in der{" "}
            <a href="/datenschutz" className="text-brand underline">Datenschutzerklärung</a>.
          </span>
        </label>
      </div>
      {status === "error" && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          Das hat leider nicht geklappt. Bitte ruf uns an oder schreib uns eine E-Mail.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-8 py-4 font-semibold text-white transition hover:bg-brand-600 disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Nachricht senden <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>}
      </button>
    </form>
  );
}
