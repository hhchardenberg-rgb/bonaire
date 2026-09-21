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
    id: "bachelors-beach",
    naam: "Bachelor's Beach",
    type: "strand",
    omschrijving: "Instapsnorkelen zo vanaf het strand.",
    kaartUrl: mapsUrl("Bachelor's Beach Bonaire"),
  },
  {
    id: "no-name-beach",
    naam: "No Name Beach",
    type: "strand",
    omschrijving: "Op Klein Bonaire, per boot bereikbaar.",
    kaartUrl: mapsUrl("No Name Beach Klein Bonaire"),
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
    id: "klein-bonaire",
    naam: "Klein Bonaire",
    type: "activiteit",
    omschrijving: "Onbewoond eilandje, alleen per boot bereikbaar.",
    kaartUrl: mapsUrl("Klein Bonaire"),
  },
  {
    id: "donkey-sanctuary",
    naam: "Donkey Sanctuary",
    type: "activiteit",
    omschrijving: "Opvang voor ezels, rustig ritje tussen de dieren door.",
    kaartUrl: mapsUrl("Donkey Sanctuary Bonaire"),
  },
  {
    id: "mangrove-center",
    naam: "Mangrove Center",
    type: "activiteit",
    omschrijving: "Begeleide kajaktochten door de mangroves bij Lac Bay.",
    kaartUrl: mapsUrl("Mangrove Center Bonaire"),
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
  {
    id: "slavenhutjes",
    naam: "Slavenhutjes bij de zoutpannen",
    type: "bezienswaardigheid",
    kaartUrl: mapsUrl("Slave Huts Bonaire"),
  },
];

export const locatieTypeLabels: Record<Locatie["type"], { label: string; emoji: string }> = {
  accommodatie: { label: "Accommodatie", emoji: "🏠" },
  luchthaven: { label: "Luchthaven", emoji: "✈️" },
  strand: { label: "Stranden", emoji: "🏖️" },
  activiteit: { label: "Activiteiten", emoji: "🤿" },
  boodschappen: { label: "Boodschappen", emoji: "🛒" },
  medisch: { label: "Medische hulp", emoji: "⚕️" },
  bezienswaardigheid: { label: "Bezienswaardigheden", emoji: "📸" },
};
