export const trip = {
  titel: "Bonaire 2027",
  ondertitel: "Vriendengroep-vakantie",
  startDatum: "2027-03-13", // aankomst
  eindDatum: "2027-03-21", // vertrek terug
  tijdzone: "AST (UTC-4, geen zomertijd op Bonaire)",
  bestemming: "Kralendijk, Bonaire",
  welkomstTekst:
    "Over een paar maanden staan we samen met onze tenen in het zand. Alles wat je nodig hebt voor de trip staat hier: het programma, de gids, de kaart en praktische zaken. Voeg deze pagina toe aan je beginscherm, dan heb je 'm altijd bij de hand.",
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
