export interface WeerInfo {
  omschrijving: string;
  temperatuurOverdag: string;
  windAdvies: string;
}

// Bonaire heeft een zeer stabiel klimaat (passaatwind, weinig regen). Omdat we
// geen live weer-API met tracking/derde partijen willen inladen, staat hier
// een realistisch gemiddelde. Check vlak voor vertrek zelf een actuele bron.
export const typischWeer: WeerInfo = {
  omschrijving: "Zonnig met passaatwind, kans op een korte bui",
  temperatuurOverdag: "±29-32°C",
  windAdvies: "Vrij stevige oostenwind — fijn tegen de warmte, houd lichte spullen vast op het strand",
};

export const dagtips: Record<string, string> = {
  "2027-03-13": "Neem het rustig op de eerste dag — laat je lichaam wennen aan de warmte en drink veel water.",
  "2027-03-14": "Smeer vaker in dan je denkt nodig te hebben: de zon staat hier feller dan in Nederland.",
  "2027-03-15": "Ga snorkelen in de ochtend — dan is het water het rustigst en het licht het mooist.",
  "2027-03-16": "Neem genoeg water en een volle tank mee naar het natuurpark, onderweg zijn geen winkels.",
  "2027-03-17": "Een vrije dag is een kans om een van de 'nog controleren'-plekken uit de gids te checken.",
  "2027-03-18": "Duiken op een nuchtere maag? Neem wel iets lichts, zoals fruit, voor de energie.",
  "2027-03-19": "Ga voor zonsondergang naar de zoutpannen voor het mooiste licht op de flamingo's.",
  "2027-03-20": "Begin op tijd met inpakken — de laatste ochtend is altijd drukker dan gepland.",
  "2027-03-21": "Check ruim op tijd in voor de terugvlucht en geniet nog van het uitzicht vanuit het vliegtuig.",
};

export const algemeneDagtips: string[] = [
  "Rifvriendelijke zonnebrand beschermt het koraal — en dus onze eigen snorkelplekken.",
  "Loop niet op koraal, ook niet als het er dood uitziet.",
  "Neem een herbruikbare waterfles mee, kraanwater is prima drinkbaar.",
  "Plan minstens één moment zonder programma in — dat wordt vaak het leukste.",
];
