"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Loader2, Upload } from "lucide-react";

type Question = { key: string; frage: string; optionen: string[] };

const questions: Question[] = [
  {
    key: "erfahrung",
    frage: "Wie viel Berufserfahrung bringst Du mit?",
    optionen: ["Berufseinsteiger/in", "1–3 Jahre", "3–5 Jahre", "Mehr als 5 Jahre"],
  },
  {
    key: "datev",
    frage: "Wie sicher bist Du im Umgang mit DATEV?",
    optionen: ["Sehr sicher – täglich im Einsatz", "Gute Kenntnisse", "Grundkenntnisse", "Noch keine Erfahrung"],
  },
  {
    key: "umfang",
    frage: "In welchem Umfang möchtest Du arbeiten?",
    optionen: ["Vollzeit (40 Std.)", "Vollzeit reduziert (30–39 Std.)", "Teilzeit (20–29 Std.)", "Bin noch flexibel"],
  },
  {
    key: "start",
    frage: "Wann könntest Du bei uns starten?",
    optionen: ["Sofort", "In 1–3 Monaten", "In mehr als 3 Monaten", "Weiß ich noch nicht"],
  },
];

export function ApplicationForm({ jobTitle, jobSlug }: { jobTitle: string; jobSlug: string }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [fileName, setFileName] = useState<string | null>(null);
  const total = questions.length + 1;
  const progress = status === "done" ? 100 : Math.round((step / total) * 100);

  const choose = (key: string, value: string) => {
    setAnswers((a) => ({ ...a, [key]: value }));
    setTimeout(() => setStep((s) => s + 1), 220);
  };

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const fd = new FormData(e.currentTarget);
    fd.set("stelle", jobTitle);
    fd.set("slug", jobSlug);
    Object.entries(answers).forEach(([k, v]) => fd.set(k, v));
    try {
      const res = await fetch("/api/bewerbung", { method: "POST", body: fd });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="overflow-hidden rounded-[2rem] bg-white shadow-[0_40px_100px_-40px_rgba(14,22,54,0.45)] ring-1 ring-ink/5">
      <div className="h-1.5 bg-brand-50">
        <motion.div className="h-full bg-brand" animate={{ width: `${progress}%` }} transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.6 }} />
      </div>
      <div className="p-6 sm:p-10">
        <div className="flex items-center justify-between text-sm text-muted">
          <span className="font-medium text-brand">Bewerbung in 60 Sekunden</span>
          {status !== "done" && <span>Schritt {Math.min(step + 1, total)} von {total}</span>}
        </div>

        <AnimatePresence mode="wait">
          {status === "done" ? (
            <motion.div key="done" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-10 text-center">
              <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                <Check className="h-10 w-10" />
              </span>
              <h3 className="mt-6 text-3xl font-semibold tracking-tight">Danke, Deine Bewerbung ist da!</h3>
              <p className="mx-auto mt-4 max-w-md text-muted">
                Wir melden uns persönlich bei Dir, um ein unverbindliches Kennenlernen zu vereinbaren.
                Wir freuen uns auf Dich!
              </p>
            </motion.div>
          ) : step < questions.length ? (
            <motion.div
              key={questions[step].key}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6"
            >
              <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{questions[step].frage}</h3>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {questions[step].optionen.map((o) => {
                  const active = answers[questions[step].key] === o;
                  return (
                    <button
                      key={o}
                      type="button"
                      onClick={() => choose(questions[step].key, o)}
                      className={`group flex items-center justify-between gap-4 rounded-2xl border-2 px-5 py-5 text-left text-[16px] font-medium transition-all ${
                        active ? "border-brand bg-brand-50 text-brand" : "border-grey-100 hover:border-brand/40 hover:bg-brand-50/50"
                      }`}
                    >
                      {o}
                      <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 transition ${active ? "border-brand bg-brand text-white" : "border-grey group-hover:border-brand/40"}`}>
                        {active && <Check className="h-4 w-4" />}
                      </span>
                    </button>
                  );
                })}
              </div>
              {step > 0 && (
                <button type="button" onClick={() => setStep((s) => s - 1)} className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-brand">
                  <ArrowLeft className="h-4 w-4" /> Zurück
                </button>
              )}
            </motion.div>
          ) : (
            <motion.form
              key="kontakt"
              onSubmit={submit}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6"
            >
              <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">Fast geschafft! Wie erreichen wir Dich?</h3>
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <Field label="Vor- und Nachname" name="name" required autoComplete="name" />
                <Field label="Telefonnummer" name="telefon" type="tel" required autoComplete="tel" />
                <Field label="E-Mail-Adresse" name="email" type="email" required autoComplete="email" className="sm:col-span-2" />
                <label className="sm:col-span-2 flex cursor-pointer items-center gap-4 rounded-2xl border-2 border-dashed border-grey px-5 py-4 transition hover:border-brand/50">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand"><Upload className="h-5 w-5" /></span>
                  <span className="text-sm">
                    <span className="block font-semibold text-ink">{fileName ?? "Lebenslauf anhängen (optional)"}</span>
                    <span className="text-muted">PDF, Word oder Bild · max. 4 MB</span>
                  </span>
                  <input type="file" name="lebenslauf" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" className="sr-only" onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)} />
                </label>
                <label className="sm:col-span-2 flex items-start gap-3 text-sm text-muted">
                  <input type="checkbox" required className="mt-1 h-4 w-4 accent-[#253781]" />
                  <span>
                    Ich bin mit der Verarbeitung meiner Daten zum Zweck der Bewerbung einverstanden. Mehr dazu in der{" "}
                    <a href="/datenschutz" className="text-brand underline">Datenschutzerklärung</a>.
                  </span>
                </label>
              </div>
              {status === "error" && (
                <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                  Das hat leider nicht geklappt. Bitte versuche es erneut oder schreib uns direkt eine E-Mail.
                </p>
              )}
              <div className="mt-8 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button type="button" onClick={() => setStep((s) => s - 1)} className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-brand">
                  <ArrowLeft className="h-4 w-4" /> Zurück
                </button>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-8 py-4 font-semibold text-white transition hover:bg-brand-600 disabled:opacity-60"
                >
                  {status === "sending" ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Bewerbung absenden <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function Field({
  label, name, type = "text", required, autoComplete, className = "", textarea = false,
}: {
  label: string; name: string; type?: string; required?: boolean; autoComplete?: string; className?: string; textarea?: boolean;
}) {
  const cls = "peer w-full rounded-2xl border-2 border-grey-100 bg-grey-50 px-5 pt-6 pb-2 text-[16px] text-ink outline-none transition focus:border-brand focus:bg-white";
  return (
    <label className={`relative block ${className}`}>
      {textarea ? (
        <textarea name={name} required={required} rows={5} placeholder=" " className={`${cls} resize-none`} />
      ) : (
        <input name={name} type={type} required={required} autoComplete={autoComplete} placeholder=" " className={cls} />
      )}
      <span className="pointer-events-none absolute top-4 left-5 origin-left text-[15px] text-muted transition-all peer-focus:top-2 peer-focus:text-xs peer-focus:text-brand peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs">
        {label}
        {required && " *"}
      </span>
    </label>
  );
}
