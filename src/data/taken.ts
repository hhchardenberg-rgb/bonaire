import type { Taak } from "@/types";

// Pas namen en taken hier aan wanneer de groep wijzigt.
export const groepsleden = ["Charella", "Bart", "Remco", "Jermaine", "Ella"];

export const taken: Taak[] = [
  {
    id: "boodschappen",
    naam: "Boodschappen",
    toegewezenAan: ["Charella", "Bart"],
    omschrijving: "Wekelijkse grote boodschappen en aanvullen tussendoor.",
  },
  {
    id: "vervoer",
    naam: "Vervoer / rijden",
    toegewezenAan: ["Remco", "Jermaine"],
    omschrijving: "Huurauto's besturen en navigeren.",
  },
  {
    id: "reserveringen",
    naam: "Reserveringen bijhouden",
    toegewezenAan: ["Ella"],
    omschrijving: "Restaurants en activiteiten bevestigen en tijden bewaken.",
  },
  {
    id: "muziek",
    naam: "Muziek",
    toegewezenAan: ["Bart"],
    omschrijving: "Playlist voor onderweg en aan het strand.",
  },
  {
    id: "fotos",
    naam: "Foto's verzamelen",
    toegewezenAan: ["Charella", "Ella"],
    omschrijving: "Groepsfoto's maken en verzamelen voor de fotomuur.",
  },
  {
    id: "ontbijt",
    naam: "Ontbijt verzorgen",
    toegewezenAan: ["Remco", "Ella"],
    omschrijving: "Toebereiden op de ochtenden dat we thuis ontbijten.",
  },
  {
    id: "diner",
    naam: "Diner op huisavonden",
    toegewezenAan: ["Jermaine", "Bart"],
    omschrijving: "Koken op de avonden dat we niet uit eten gaan.",
  },
];
