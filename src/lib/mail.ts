import "server-only";
import { Resend } from "resend";

type Attachment = { filename: string; content: Buffer };

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export function table(rows: [string, string | undefined][]) {
  return `<table cellpadding="8" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${rows
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="color:#5a6072;vertical-align:top">${esc(k)}</td><td style="color:#0f1526"><strong>${esc(v!).replace(/\n/g, "<br>")}</strong></td></tr>`,
    )
    .join("")}</table>`;
}

/**
 * Versendet eine E-Mail über Resend. Ohne RESEND_API_KEY (z. B. lokal oder in der
 * Vorschau) wird die Nachricht nur geloggt, damit Formulare testbar bleiben.
 */
export async function sendMail({
  to,
  subject,
  html,
  replyTo,
  attachments,
}: {
  to: string[];
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: Attachment[];
}) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.info("[mail:dry-run]", { to, subject, replyTo, attachments: attachments?.map((a) => a.filename) });
    return { dryRun: true };
  }
  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from: process.env.MAIL_FROM ?? "Website Hammer & Partner <onboarding@resend.dev>",
    to,
    subject,
    html,
    replyTo,
    attachments,
  });
  if (error) throw new Error(error.message);
  return { dryRun: false };
}

export const bewerbungEmpfaenger = () =>
  (process.env.BEWERBUNG_EMAIL ?? "m.boehmer@hammerpartner.de,s.klapper@hammerpartner.de")
    .split(",")
    .map((s) => s.trim());

export const kontaktEmpfaenger = () =>
  (process.env.KONTAKT_EMAIL ?? "kanzlei@hammerpartner.de").split(",").map((s) => s.trim());
