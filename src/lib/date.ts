export function vandaagIso(): string {
  const now = new Date();
  return now.toISOString().slice(0, 10);
}

export function formatDatumLang(iso: string): string {
  const datum = new Date(`${iso}T12:00:00`);
  return new Intl.DateTimeFormat("nl-NL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(datum);
}

export function formatDatumKort(iso: string): string {
  const datum = new Date(`${iso}T12:00:00`);
  return new Intl.DateTimeFormat("nl-NL", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(datum);
}

export function dagenTussen(a: string, b: string): number {
  const msPerDag = 1000 * 60 * 60 * 24;
  const da = new Date(`${a}T00:00:00`).getTime();
  const db = new Date(`${b}T00:00:00`).getTime();
  return Math.round((db - da) / msPerDag);
}

export type ReisFase = "voor" | "tijdens" | "na";

export function bepaalReisFase(vandaag: string, start: string, eind: string): ReisFase {
  if (vandaag < start) return "voor";
  if (vandaag > eind) return "na";
  return "tijdens";
}
