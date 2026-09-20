import type { Locatie } from "@/types";
import { mapsUrl } from "@/lib/maps";

export const locaties: Locatie[] = [
  {
    id: "accommodatie",
    naam: "Kas den Daas",
    type: "accommodatie",
    omschrijving: "Onze basis voor de hele week.",
    kaartUrl: mapsUrl("4P95+X94 Kralendijk Bonaire"),
  },
  {
    id: "luchthaven",
    naam: "Flamingo International Airport (BON)",
    type: "luchthaven",
    omschrijving: "Aankomst en vertrek.",
    kaartUrl: mapsUrl("Flamingo International Airport Bonaire"),
  },
  {
    id: "it-rains-fishes",
    naam: "It Rains Fishes",
    type: "eten-drinken",
    omschrijving: "Welkomstdiner.",
    kaartUrl: mapsUrl("It Rains Fishes Bonaire"),
  },
  {
    id: "zeezicht",
    naam: "Zeezicht Restaurant",
    type: "eten-drinken",
    omschrijving: "Afscheidsdiner.",
    kaartUrl: mapsUrl("Zeezicht Restaurant Bonaire"),
  },
  {
    id: "te-amo-beach",
    naam: "Te Amo Beach",
    type: "strand",
    kaartUrl: mapsUrl("Te Amo Beach Bonaire"),
  },
  {
    id: "sorobon-beach",
    naam: "Sorobon Beach",
    type: "strand",
    kaartUrl: mapsUrl("Sorobon Beach Bonaire"),
  },
  {
    id: "1000-steps",
    naam: "1000 Steps",
    type: "activiteit",
    omschrijving: "Snorkelen en duiken.",
    kaartUrl: mapsUrl("1000 Steps Bonaire"),
  },
  {
    id: "washington-slagbaai",
    naam: "Washington Slagbaai National Park",
    type: "activiteit",
    kaartUrl: mapsUrl("Washington Slagbaai National Park Bonaire"),
  },
  {
    id: "van-den-tweel",
    naam: "Van den Tweel Supermarkt",
    type: "boodschappen",
    kaartUrl: mapsUrl("Van den Tweel Supermarkt Bonaire"),
  },
  {
    id: "cortina-market",
    naam: "Cortina Market",
    type: "boodschappen",
    kaartUrl: mapsUrl("Cortina Market Bonaire"),
  },
  {
    id: "hospital",
    naam: "Mariadal Ziekenhuis",
    type: "medisch",
    omschrijving: "Dichtstbijzijnde ziekenhuis. Bel bij spoed altijd eerst 911.",
    kaartUrl: mapsUrl("Mariadal Hospital Bonaire"),
  },
  {
    id: "apotheek",
    naam: "Botika Bonaire (apotheek)",
    type: "medisch",
    kaartUrl: mapsUrl("Botika Bonaire apotheek"),
  },
  {
    id: "zoutpannen",
    naam: "Zoutpannen en flamingo's",
    type: "bezienswaardigheid",
    kaartUrl: mapsUrl("Zoutpannen Bonaire"),
  },
  {
    id: "willemstoren",
    naam: "Willemstoren Vuurtoren",
    type: "bezienswaardigheid",
    kaartUrl: mapsUrl("Willemstoren Lighthouse Bonaire"),
  },
];

export const locatieTypeLabels: Record<Locatie["type"], { label: string; emoji: string }> = {
  accommodatie: { label: "Accommodatie", emoji: "🏠" },
  luchthaven: { label: "Luchthaven", emoji: "✈️" },
  "eten-drinken": { label: "Eten & drinken", emoji: "🍽️" },
  strand: { label: "Stranden", emoji: "🏖️" },
  activiteit: { label: "Activiteiten", emoji: "🤿" },
  boodschappen: { label: "Boodschappen", emoji: "🛒" },
  medisch: { label: "Medische hulp", emoji: "⚕️" },
  bezienswaardigheid: { label: "Bezienswaardigheden", emoji: "📸" },
};
