export const trip = {
  titel: "Bonaire 2026",
  ondertitel: "Vriendengroep-vakantie",
  startDatum: "2026-09-22", // aankomst (heenvlucht OR393, 08:15 uur)
  // Terugvlucht nog niet doorgegeven — hier voorlopig aangenomen dat de trip
  // even lang duurt als het oorspronkelijke programma (9 dagen). Pas dit aan
  // zodra de echte terugvluchtdatum bekend is, en verschuif src/data/programma.ts
  // en src/data/dagtips.ts mee.
  eindDatum: "2026-09-30", // vertrek terug — nog controleren
  tijdzone: "AST (UTC-4, geen zomertijd op Bonaire)",
  bestemming: "Kralendijk, Bonaire",
  welkomstTekst:
    "Nog een paar nachtjes slapen! Alles wat je nodig hebt voor de trip staat hier: het programma, de gids, de kaart en praktische zaken. Voeg deze pagina toe aan je beginscherm, dan heb je 'm altijd bij de hand.",
  accommodatie: {
    naam: "Vakantiehuis Kaya Kunuku (placeholder)",
    adres: "Kaya Kunuku 12, Kralendijk, Bonaire",
    checkIn: "vanaf 15:00",
    checkOut: "voor 11:00",
    wifi: "Netwerk: nog controleren · Wachtwoord: nog controleren",
    contact: "Verhuurder: nog controleren",
    kaartUrl: "https://maps.google.com/?q=Kaya+Kunuku+12+Kralendijk+Bonaire",
  },
  // Vul hier een link naar een gedeeld album (bv. Google Foto's of iCloud) in voor de fotomuur.
  fotoAlbumUrl: "",
} as const;

export type Trip = typeof trip;
