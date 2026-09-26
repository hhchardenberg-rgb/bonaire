import { mapsUrl } from "@/lib/maps";

export const trip = {
  titel: "Bonaire 2026",
  startDatum: "2026-09-22", // aankomst (heenvlucht OR393, 08:15 uur)
  vertrekMoment: "2026-09-22T08:15:00", // exacte vertrektijd voor de countdown
  ostracodMoment: "2026-09-29T18:30:00", // aanwezig-tijd voor de Ostracod Night-countdown
  // De groep vertrekt in etappes: Charella & Bart op 30 sept, Ella op 2 okt,
  // Remco & Jermaine (de laatsten) op 3 okt. eindDatum = laatste vertrekdag.
  eindDatum: "2026-10-03",
  tijdzone: "AST (UTC-4, geen zomertijd op Bonaire)",
  bestemming: "Kralendijk, Bonaire",
  welkomstTekst:
    "Alles wat je nodig hebt voor de trip staat hier: het programma, de gids, de kaart en praktische zaken. Voeg deze pagina toe aan je beginscherm, dan heb je 'm altijd bij de hand.",
  accommodatie: {
    naam: "Kas den Daas",
    adres: "4P95+X94, Kralendijk, Caribisch Nederland",
    checkIn: "vanaf 15:00",
    checkOut: "voor 11:00",
    wifi: "Wachtwoord: beachhousebonaire",
    contact: "Host: Dennis — +599 782 9691",
    kaartUrl: mapsUrl("4P95+X94 Kralendijk Bonaire"),
  },
  // Vul hier een link naar een gedeeld album (bv. Google Foto's of iCloud) in voor de fotomuur.
  fotoAlbumUrl: "https://photos.icloud.com/shared/album/0ffaWqP1RdLFknAyiE03Aj1Iw",
  // Digitale wegwerpcamera (Lense): iedereen maakt foto's, ze verschijnen later pas.
  wegwerpcameraUrl: "https://lense.app/join-event/69c6b8f91dde27fe-d5ff4285",
} as const;

export type Trip = typeof trip;
