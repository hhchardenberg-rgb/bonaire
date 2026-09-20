export interface PraktischSectie {
  id: string;
  titel: string;
  emoji: string;
  inhoud: { label?: string; tekst: string; telefoon?: string }[];
}

export const praktischeInfo: PraktischSectie[] = [
  {
    id: "vlucht",
    titel: "Vlucht",
    emoji: "✈️",
    inhoud: [
      {
        label: "Heenvlucht (iedereen)",
        tekst: "22 september 2026, 08:15 uur vertrek — vluchtnummer OR393, aankomst Bonaire 12:45 uur.",
      },
      { label: "Vertrekhal", tekst: "Vertrekhal 3" },
      { label: "Check-in balies", tekst: "Balie 22–23" },
      {
        label: "Vlucht Charella & Bart naar Miami",
        tekst: "30 september 2026, 14:44 uur — AA2691 (BON → MIA), aankomst 17:55 uur. Miami is niet 'thuis' maar hun volgende bestemming.",
      },
      {
        label: "Terugvlucht Ella naar Amsterdam",
        tekst: "2 oktober 2026, 16:35 uur — OR393 (BON → AMS), aankomst 3 oktober 10:55 uur. Boekingsreferentie 200061985925.",
      },
      {
        label: "Vlucht Remco & Jermaine naar Miami",
        tekst: "3 oktober 2026, 14:44 uur — AA2691 (BON → MIA), aankomst 17:55 uur. Miami is niet 'thuis' maar hun volgende bestemming.",
      },
      { label: "Bagage", tekst: "Ruimbagage en handbagage: nog controleren per boeking" },
    ],
  },
  {
    id: "accommodatie",
    titel: "Accommodatie",
    emoji: "🏠",
    inhoud: [
      { label: "Adres", tekst: "Kaya Kunuku 12, Kralendijk, Bonaire" },
      { label: "Check-in", tekst: "Vanaf 15:00" },
      { label: "Check-out", tekst: "Voor 11:00" },
      { label: "Wifi", tekst: "Netwerk en wachtwoord: nog controleren" },
      { label: "Verhuurder", tekst: "Dennis — +599 782 9691" },
    ],
  },
  {
    id: "huurauto",
    titel: "Huurauto",
    emoji: "🚙",
    inhoud: [
      { label: "Verhuurder", tekst: "AB Drive" },
      { label: "Reserveringsnummer", tekst: "nog controleren" },
      { tekst: "Rijbewijs (ouder dan 1 jaar) en creditcard nodig bij ophalen." },
      { tekst: "Wegen buiten het centrum zijn vaak onverhard — rustig rijden." },
    ],
  },
  {
    id: "bagage",
    titel: "Bagage & paklijst",
    emoji: "🧳",
    inhoud: [
      { tekst: "Zie de interactieve paklijst voor het volledige overzicht." },
      { tekst: "Snorkelspullen kunnen ook lokaal gehuurd worden — nog controleren of nodig." },
    ],
  },
  {
    id: "tijdverschil",
    titel: "Tijdverschil",
    emoji: "🕓",
    inhoud: [
      { tekst: "Bonaire loopt op AST (UTC-4) en kent geen zomertijd." },
      { tekst: "In de Nederlandse zomertijd (CEST, UTC+2) is Bonaire 6 uur achter. In de winter (CET) is dat 5 uur." },
    ],
  },
  {
    id: "geld",
    titel: "Geld en betalen",
    emoji: "💳",
    inhoud: [
      { tekst: "Officiële munt is de US dollar (USD)." },
      { tekst: "Pinnen kan op de meeste plekken, maar neem ook wat contant geld mee voor kleine strandtenten." },
      { tekst: "Wissel- en pinkosten: nog controleren bij eigen bank." },
    ],
  },
  {
    id: "gebruiken",
    titel: "Lokale gebruiken",
    emoji: "🤝",
    inhoud: [
      { tekst: "Bonaire is onderdeel van het Caribisch Nederland; voertaal is Papiaments, Nederlands en Engels worden breed gesproken." },
      { tekst: "Het rif is beschermd natuurgebied: koraal niet aanraken en geen zonnebrand met schadelijke stoffen gebruiken." },
      { tekst: "Fooien in restaurants: rond de 10%, vaak niet verplicht — nog controleren." },
    ],
  },
  {
    id: "internet",
    titel: "Internet en bereik",
    emoji: "📶",
    inhoud: [
      { tekst: "Lokale simkaart of roamingbundel: nog controleren per provider." },
      { tekst: "Wifi in het vakantiehuis: zie accommodatiegegevens hierboven." },
    ],
  },
  {
    id: "telefoonnummers",
    titel: "Belangrijke telefoonnummers",
    emoji: "📞",
    inhoud: [
      { label: "Alarmnummer (politie, brandweer, ambulance)", tekst: "911", telefoon: "911" },
      { label: "Kustwacht Caribisch Gebied", tekst: "913", telefoon: "913" },
      { label: "Mariadal Ziekenhuis", tekst: "+599 715 8900", telefoon: "+599 715 8900" },
      { label: "Verhuurder accommodatie (Dennis)", tekst: "+599 782 9691", telefoon: "+599 782 9691" },
      { label: "Autoverhuurder (AB Drive)", tekst: "+599-717-8980", telefoon: "+599-717-8980" },
    ],
  },
  {
    id: "medisch",
    titel: "Medische hulp en noodnummer",
    emoji: "⚕️",
    inhoud: [
      { tekst: "Bij spoed: bel 911." },
      { label: "Dichtstbijzijnde ziekenhuis", tekst: "Mariadal Ziekenhuis, Kralendijk" },
      { tekst: "Zorg dat iedereen een geldige reisverzekering heeft. Polisnummer: nog controleren." },
    ],
  },
  {
    id: "vooraf-regelen",
    titel: "Vooraf regelen",
    emoji: "✅",
    inhoud: [
      { tekst: "Reisverzekering afsluiten of controleren." },
      { tekst: "Paspoort/ID-geldigheid controleren (minimaal 6 maanden geldig aanraden)." },
      { tekst: "Duikcertificaten en logboeken meenemen indien van toepassing." },
      { tekst: "Restaurantreserveringen bevestigen dichter bij vertrek." },
      { tekst: "Roaming of lokale simkaart regelen." },
    ],
  },
];
