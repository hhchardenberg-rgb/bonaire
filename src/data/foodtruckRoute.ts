// Route voor het Jella & Co Foodtruck Festival, alleen relevant op deze ene dag.
export const foodtruckTourDatum = "2026-09-25";

export type FoodtruckStopType = "kern" | "optioneel" | "tijdkritisch" | "reserve" | "laat";

export interface FoodtruckStop {
  id: string;
  naam: string;
  emoji: string;
  tijden: string;
  locatie: string;
  kaartQuery: string;
  rating?: string;
  tip: string;
  aanbevolenTijd?: string;
  type: FoodtruckStopType;
}

export interface FoodtruckSectie {
  id: string;
  titel: string;
  tijdvak: string;
  intro?: string;
  stops: FoodtruckStop[];
}

export const foodtruckSecties: FoodtruckSectie[] = [
  {
    id: "start",
    titel: "Start bij Te Amo Beach",
    tijdvak: "vanaf 15:00",
    intro: "Hier zitten twee van de beste opties praktisch bij elkaar.",
    stops: [
      {
        id: "kite-city",
        naam: "Kite City Bonaire",
        emoji: "🐟",
        tijden: "11:00–16:00",
        locatie: "Te Amo Beach",
        kaartQuery: "Kite City Bonaire Te Amo Beach",
        rating: "4,8 · 253 reviews",
        tip: "Niet overslaan — sluit om 16:00. Verse vis is de specialiteit: samen een tuna-, wahoo- of visgerecht bestellen en delen.",
        aanbevolenTijd: "15:00",
        type: "kern",
      },
      {
        id: "stoked",
        naam: "Stoked Foodtruck",
        emoji: "🚌",
        tijden: "12:00–20:00",
        locatie: "Omgeving Te Amo Beach",
        kaartQuery: "Stoked Foodtruck Bonaire",
        rating: "4,7 · 372 reviews",
        tip: "De bekende rode dubbeldekker. Blijft veel langer open — eerst Kite City doen, dan beslissen of Stoked er meteen bij kan of bewaard wordt als reserve.",
        aanbevolenTijd: "15:35 (optioneel)",
        type: "optioneel",
      },
    ],
  },
  {
    id: "zuid",
    titel: "Zuidelijke uitstap: Bachelor's Beach",
    tijdvak: "±15:45",
    intro: "De enige echt lastige keuze van de route.",
    stops: [
      {
        id: "king-kong",
        naam: "King Kong Bonaire",
        emoji: "🍔",
        tijden: "11:30–16:00",
        locatie: "Bachelor's Beach",
        kaartQuery: "King Kong Bonaire Bachelor's Beach",
        rating: "4,8 · 236 reviews",
        tip: "Uitstekend beoordeeld, maar tijdkritisch — houd 16:00 aan als harde grens. Alleen doen als jullie echt zin hebben in een goede burger of hotdog.",
        aanbevolenTijd: "15:30",
        type: "tijdkritisch",
      },
    ],
  },
  {
    id: "kralendijk-op-weg",
    titel: "Richting Kralendijk",
    tijdvak: "16:15–17:00",
    intro: "De tijdsdruk wordt nu veel kleiner.",
    stops: [
      {
        id: "pita-madre",
        naam: "Pita Madre",
        emoji: "🫓",
        tijden: "11:00–18:30",
        locatie: "Kaya Gob. N. Debrot",
        kaartQuery: "Pita Madre Kaya Gob. N. Debrot Bonaire",
        rating: "4,9 · 108 reviews",
        tip: "Een complete andere keuken tussendoor: pita in plaats van vis of burger. Ruim open tot 18:30, dus geen haast. Eén pita delen is genoeg.",
        aanbevolenTijd: "±16:30",
        type: "kern",
      },
    ],
  },
  {
    id: "pauze",
    titel: "Pauze",
    tijdvak: "±17:00–18:45",
    intro:
      "Geen eten meer. Even naar de accommodatie, zwemmen, een drankje, Kralendijk in, of de zonsondergang bekijken — anders wordt het een eetwedstrijd in plaats van een leuke tour.",
    stops: [],
  },
  {
    id: "avond",
    titel: "Avondronde in Kralendijk",
    tijdvak: "vanaf 19:00",
    intro: "Nu zitten er meerdere leuke opties dicht bij elkaar.",
    stops: [
      {
        id: "fat-dog",
        naam: "The Fat Dog — Mexican Foodtruck",
        emoji: "🌮",
        tijden: "19:00–00:30",
        locatie: "Kaya Industria 17, Kralendijk",
        kaartQuery: "Kaya Industria 17 Kralendijk Bonaire",
        rating: "4,8 · 98 reviews",
        tip: "Mexican streetfood, een welkome afwisseling. Verschillende taco's bestellen en delen.",
        aanbevolenTijd: "19:00–19:15",
        type: "kern",
      },
      {
        id: "del-chef",
        naam: "Del Chef",
        emoji: "🌙",
        tijden: "19:00–02:30",
        locatie: "Julio A. Abraham, Kralendijk",
        kaartQuery: "Julio A Abraham Kralendijk Bonaire",
        rating: "4,9 · 193 reviews",
        tip: "Late-night joker: open tot 02:30, dus totaal geen tijdsdruk. Ideale afsluiter van de avond.",
        type: "laat",
      },
      {
        id: "dominican-urban",
        naam: "Dominican Urban Food Truck",
        emoji: "🇩🇴",
        tijden: "19:00–00:30",
        locatie: "Carwash Bonaire, Kaya Gilberto F. Croes",
        kaartQuery: "Carwash Bonaire Kaya Gilberto F. Croes",
        rating: "4,7 · 16 reviews",
        tip: "Voor wie Dominicaans/Caribisch wil toevoegen aan de tour.",
        type: "optioneel",
      },
      {
        id: "vip-grill",
        naam: "VIP Grill Bonaire",
        emoji: "🔥",
        tijden: "18:00–00:00",
        locatie: "5P2M+VR3, Kralendijk",
        kaartQuery: "5P2M+VR3 Kralendijk Bonaire",
        rating: "4,5 · 89 reviews",
        tip: "Reserve-optie voor wie zin heeft in BBQ/grill.",
        type: "reserve",
      },
    ],
  },
];

export const foodtruckIdealeRoute = [
  "15:00 🐟 Kite City — kernstop",
  "15:30 🍔 King Kong — optioneel, tijdkritisch",
  "16:00 🚌 Stoked — optioneel",
  "16:30/16:45 🫓 Pita Madre — sterke keuze",
  "17:15–18:45 🌅 Pauze",
  "19:00 🌮 Fat Dog — kernstop",
  "20:00 🇩🇴 Dominican Urban — optioneel",
  "later 🔥 VIP Grill — optioneel",
  "laat 🌙 Del Chef — ideale afsluiter, open tot 02:30",
];

export const foodtruckCompacteRoute =
  "Kite City → King Kong óf Stoked → Pita Madre → lange pauze → Fat Dog → Del Chef. Achtereenvolgens verse vis → burger → pita → Mexicaans → late-night streetfood.";

export const foodtruckTip =
  "Bestel bij iedere truck één signature dish per twee of drie personen en deel alles. Zo proef je met de hele groep bij veel meer trucks dan wanneer iedereen los een hele maaltijd bestelt.";

export const foodtruckAfvallers = [
  { naam: "El Food Truck Jasmin", reden: "staat momenteel als permanent gesloten" },
  { naam: "Cactus Blue", reden: "staat tijdelijk gesloten" },
  { naam: "Holy Smoke", reden: "alleen open op donderdag, zaterdag en zondag — niet op vrijdag" },
];

export const foodtruckDisclaimer =
  "Controleer vrijdagmiddag welke foodtrucks echt open zijn — openingstijden van foodtrucks wisselen weleens.";
