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
  "2026-09-22": "Neem het rustig op de eerste dag — laat je lichaam wennen aan de warmte en drink veel water.",
  "2026-09-23": "Smeer vaker in dan je denkt nodig te hebben: de zon staat hier feller dan in Nederland.",
  "2026-09-24": "Ga snorkelen in de ochtend — dan is het water het rustigst en het licht het mooist.",
  "2026-09-25": "Neem genoeg water en een volle tank mee naar het natuurpark, onderweg zijn geen winkels.",
  "2026-09-26": "Een vrije dag is een kans om iets nieuws uit de gids uit te proberen.",
  "2026-09-27": "Duiken op een nuchtere maag? Neem wel iets lichts, zoals fruit, voor de energie.",
  "2026-09-28": "Ga voor zonsondergang naar de zoutpannen voor het mooiste licht op de flamingo's.",
  "2026-09-29": "Laatste hele dag met de hele groep — een mooi moment voor een gezamenlijke foto.",
  "2026-09-30": "Charella & Bart: check ruim op tijd in voor de terugvlucht en geniet nog van het uitzicht vanuit het vliegtuig.",
  "2026-10-01": "Nog een paar rustige dagen over — mooi moment om nog iets leuks uit de gids te checken.",
  "2026-10-02": "Ella: check ruim op tijd in voor de terugvlucht naar Amsterdam.",
  "2026-10-03": "Laatste dag: check het huis nog eens goed na voor het uitchecken, en geniet van de laatste uurtjes.",
};

export const algemeneDagtips: string[] = [
  "Rifvriendelijke zonnebrand beschermt het koraal — en dus onze eigen snorkelplekken.",
  "Loop niet op koraal, ook niet als het er dood uitziet.",
  "Neem een herbruikbare waterfles mee, kraanwater is prima drinkbaar.",
  "Plan minstens één moment zonder programma in — dat wordt vaak het leukste.",
];
