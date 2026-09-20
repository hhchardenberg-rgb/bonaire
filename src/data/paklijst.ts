import type { PaklijstCategorie } from "@/types";

function items(namen: string[], prefix: string): { id: string; naam: string }[] {
  return namen.map((naam, i) => ({ id: `${prefix}-${i}`, naam }));
}

export const paklijst: PaklijstCategorie[] = [
  {
    id: "documenten",
    naam: "Documenten",
    emoji: "🛂",
    items: items(
      [
        "Paspoort / ID-kaart",
        "Vliegtickets (e-tickets op telefoon)",
        "Reisverzekeringspapieren",
        "Rijbewijs (voor huurauto)",
        "Reserveringsbevestigingen (huis, auto, activiteiten)",
        "Creditcard",
      ],
      "doc"
    ),
  },
  {
    id: "kleding",
    naam: "Kleding",
    emoji: "👕",
    items: items(
      [
        "Lichte zomerkleding",
        "Zwemkleding (meerdere sets)",
        "Regenjasje (lichte bui)",
        "Comfortabele wandelschoenen",
        "Slippers/sandalen",
        "Iets warms voor de airco-avonden",
        "Hoed of pet",
      ],
      "kleding"
    ),
  },
  {
    id: "strand",
    naam: "Strand",
    emoji: "🏖️",
    items: items(
      [
        "Strandlaken",
        "Zonnebrand (rifvriendelijk)",
        "Zonnebril",
        "Waterschoenen",
        "Droogzak voor telefoon",
        "Strandtas",
      ],
      "strand"
    ),
  },
  {
    id: "snorkelen",
    naam: "Snorkelen",
    emoji: "🤿",
    items: items(
      [
        "Eigen snorkelset (of ter plekke huren)",
        "Duikcertificaat + logboek",
        "Onderwatercamera / GoPro",
        "Anti-fog voor duikbril",
      ],
      "snorkel"
    ),
  },
  {
    id: "verzorging",
    naam: "Verzorging",
    emoji: "🧴",
    items: items(
      [
        "Aftersun",
        "Insectenspray",
        "Toilettas",
        "Tandenborstel & tandpasta",
        "Lippenbalsem met SPF",
      ],
      "verzorging"
    ),
  },
  {
    id: "medicijnen",
    naam: "Medicijnen",
    emoji: "💊",
    items: items(
      [
        "Persoonlijke medicatie (voldoende voor hele reis)",
        "Pleisters en een kleine EHBO-set",
        "Paracetamol",
        "Middel tegen reisziekte",
        "Middel tegen diarree",
      ],
      "medicijnen"
    ),
  },
  {
    id: "elektronica",
    naam: "Elektronica",
    emoji: "🔌",
    items: items(
      [
        "Telefoon + oplader",
        "Powerbank",
        "Wereldstekker (Bonaire gebruikt Amerikaanse stopcontacten, type A/B)",
        "Camera + geheugenkaart",
        "Koptelefoon",
      ],
      "elektronica"
    ),
  },
  {
    id: "extras",
    naam: "Handige extra's",
    emoji: "🎒",
    items: items(
      [
        "Herbruikbare waterfles",
        "Snacks voor onderweg",
        "Kaartspel / spelletje voor 's avonds",
        "Oordopjes en slaapmasker",
        "Boodschappentas (herbruikbaar)",
      ],
      "extra"
    ),
  },
];
