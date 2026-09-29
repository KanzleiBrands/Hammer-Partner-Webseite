import { bewerbungEmpfaenger, sendMail, table } from "@/lib/mail";

const MAX = 4 * 1024 * 1024;
const allowed = [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"];

export async function POST(request: Request) {
  const fd = await request.formData();
  if (fd.get("website")) return Response.json({ ok: true }); // Honeypot

  const get = (k: string) => (fd.get(k) as string | null)?.toString().trim().slice(0, 2000) || undefined;
  const name = get("name");
  const email = get("email");
  const telefon = get("telefon");
  if (!name || !email || !telefon || !/^\S+@\S+\.\S+$/.test(email)) {
    return Response.json({ ok: false, error: "Bitte Name, E-Mail und Telefon angeben." }, { status: 400 });
  }

  const attachments = [];
  const file = fd.get("lebenslauf");
  if (file instanceof File && file.size > 0) {
    const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
    if (file.size > MAX || !allowed.includes(ext)) {
      return Response.json({ ok: false, error: "Datei zu groß oder falsches Format." }, { status: 400 });
    }
    attachments.push({ filename: file.name, content: Buffer.from(await file.arrayBuffer()) });
  }

  const stelle = get("stelle") ?? "Initiativbewerbung";
  try {
    await sendMail({
      to: bewerbungEmpfaenger(),
      subject: `Neue Bewerbung: ${stelle} – ${name}`,
      replyTo: email,
      attachments,
      html: `<h2 style="font-family:Arial,sans-serif;color:#253781">Neue Bewerbung über die Website</h2>${table([
        ["Stelle", stelle],
        ["Name", name],
        ["E-Mail", email],
        ["Telefon", telefon],
        ["Berufserfahrung", get("erfahrung")],
        ["DATEV-Kenntnisse", get("datev")],
        ["Wunsch-Umfang", get("umfang")],
        ["Möglicher Start", get("start")],
        ["Lebenslauf", attachments[0]?.filename ?? "nicht angehängt"],
      ])}`,
    });
    return Response.json({ ok: true });
  } catch (e) {
    console.error(e);
    return Response.json({ ok: false }, { status: 500 });
  }
}
