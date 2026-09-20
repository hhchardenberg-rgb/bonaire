import type { Taak } from "@/types";

// Namen zijn placeholders — pas ze aan naar de echte groepsleden.
export const groepsleden = ["Jermaine", "Sanne", "Tim", "Fleur", "Milan", "Noor"];

export const taken: Taak[] = [
  {
    id: "boodschappen",
    naam: "Boodschappen",
    toegewezenAan: ["Sanne", "Tim"],
    omschrijving: "Wekelijkse grote boodschappen en aanvullen tussendoor.",
  },
  {
    id: "vervoer",
    naam: "Vervoer / rijden",
    toegewezenAan: ["Milan", "Jermaine"],
    omschrijving: "Huurauto's besturen en navigeren.",
  },
  {
    id: "reserveringen",
    naam: "Reserveringen bijhouden",
    toegewezenAan: ["Fleur"],
    omschrijving: "Restaurants en activiteiten bevestigen en tijden bewaken.",
  },
  {
    id: "muziek",
    naam: "Muziek",
    toegewezenAan: ["Noor"],
    omschrijving: "Playlist voor onderweg en aan het strand.",
  },
  {
    id: "fotos",
    naam: "Foto's verzamelen",
    toegewezenAan: ["Fleur", "Noor"],
    omschrijving: "Groepsfoto's maken en verzamelen voor de fotomuur.",
  },
  {
    id: "ontbijt",
    naam: "Ontbijt verzorgen",
    toegewezenAan: ["Tim", "Milan"],
    omschrijving: "Toebereiden op de ochtenden dat we thuis ontbijten.",
  },
  {
    id: "diner",
    naam: "Diner op huisavonden",
    toegewezenAan: ["Jermaine", "Sanne"],
    omschrijving: "Koken op de avonden dat we niet uit eten gaan.",
  },
];
