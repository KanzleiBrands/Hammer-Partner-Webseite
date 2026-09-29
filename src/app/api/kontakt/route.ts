import { kontaktEmpfaenger, sendMail, table } from "@/lib/mail";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Record<string, string>;
  if (body.website) return Response.json({ ok: true }); // Honeypot

  const get = (k: string) => body[k]?.toString().trim().slice(0, 5000) || undefined;
  const name = get("name");
  const email = get("email");
  const nachricht = get("nachricht");
  if (!name || !email || !nachricht || !/^\S+@\S+\.\S+$/.test(email)) {
    return Response.json({ ok: false }, { status: 400 });
  }
  try {
    await sendMail({
      to: kontaktEmpfaenger(),
      subject: `Kontaktanfrage: ${get("thema") ?? "Allgemein"} – ${name}`,
      replyTo: email,
      html: `<h2 style="font-family:Arial,sans-serif;color:#253781">Neue Anfrage über die Website</h2>${table([
        ["Thema", get("thema")],
        ["Name", name],
        ["Unternehmen", get("unternehmen")],
        ["E-Mail", email],
        ["Telefon", get("telefon")],
        ["Nachricht", nachricht],
      ])}`,
    });
    return Response.json({ ok: true });
  } catch (e) {
    console.error(e);
    return Response.json({ ok: false }, { status: 500 });
  }
}
