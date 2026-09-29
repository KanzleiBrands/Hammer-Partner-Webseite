// Weiche Trennstellen (­) für lange Wörter, die auf dem Handy sonst
// über den Rand laufen. Browser trennen nur dort, wo es nötig ist.
const parts: [RegExp, string][] = [
  [/Steuerfachangestellte/g, "Steuer­fach­angestellte"],
  [/Betriebswirtschaftliche/g, "Betriebs­wirtschaftliche"],
  [/Steuergestaltung/g, "Steuer­gestaltung"],
  [/Steuerberatung/g, "Steuer­beratung"],
  [/Mandantenbereich/g, "Mandanten­bereich"],
  [/Datenschutzerklärung/g, "Datenschutz­erklärung"],
  [/Initiativbewerbung/g, "Initiativ­bewerbung"],
];

export function hy(text: string) {
  return parts.reduce((t, [re, rep]) => t.replace(re, rep), text);
}
