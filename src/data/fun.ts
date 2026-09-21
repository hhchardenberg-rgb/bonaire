export interface QuizVraag {
  id: string;
  vraag: string;
  opties: string[];
  antwoordIndex: number;
}

export const quizVragen: QuizVraag[] = [
  {
    id: "q1",
    vraag: "Wat is de officiële munt op Bonaire?",
    opties: ["Euro", "Antilliaanse gulden", "Amerikaanse dollar", "Arubaanse florin"],
    antwoordIndex: 2,
  },
  {
    id: "q2",
    vraag: "Welk dier zie je bij de zoutpannen in het zuiden?",
    opties: ["Pinguïns", "Flamingo's", "Pelikanen", "Papegaaien"],
    antwoordIndex: 1,
  },
  {
    id: "q3",
    vraag: "Hoe heet het onbewoonde eilandje voor de kust van Kralendijk?",
    opties: ["Klein Curaçao", "Klein Bonaire", "Isla Verde", "Playa Chiquito"],
    antwoordIndex: 1,
  },
  {
    id: "q4",
    vraag: "Welke taal wordt naast Nederlands en Engels veel gesproken op Bonaire?",
    opties: ["Papiaments", "Spaans", "Frans creools", "Portugees"],
    antwoordIndex: 0,
  },
  {
    id: "q5",
    vraag: "Wat moet je vooral niet aanraken tijdens het snorkelen?",
    opties: ["Zeewier", "Zand", "Koraal", "Kwallen (logisch, maar ook koraal!)"],
    antwoordIndex: 2,
  },
  {
    id: "q6",
    vraag: "Hoeveel uur tijdsverschil heeft Bonaire met Nederland in de zomer?",
    opties: ["4 uur", "5 uur", "6 uur", "8 uur"],
    antwoordIndex: 2,
  },
  {
    id: "q7",
    vraag: "Wat is de hoofdstad van Bonaire?",
    opties: ["Kralendijk", "Willemstad", "Oranjestad", "Philipsburg"],
    antwoordIndex: 0,
  },
  {
    id: "q8",
    vraag: "Hoe heet de hoogste berg van Bonaire?",
    opties: ["Brandaris", "Christoffelberg", "Sint Willibrordusberg", "Tafelberg"],
    antwoordIndex: 0,
  },
  {
    id: "q9",
    vraag: "Bonaire is een bijzondere gemeente van welk land?",
    opties: ["Nederland", "Frankrijk", "Venezuela", "Verenigde Staten"],
    antwoordIndex: 0,
  },
  {
    id: "q10",
    vraag: "Voor welke markt werd het biertje Amstel Bright oorspronkelijk speciaal gebrouwen, op Curaçao?",
    opties: ["De Caribische markt", "De Aziatische markt", "De Amerikaanse markt", "De Afrikaanse markt"],
    antwoordIndex: 0,
  },
];

export const bingoItems: string[] = [
  "Een flamingo gespot",
  "Zonsondergang gefotografeerd",
  "Koraal gezien tijdens het snorkelen",
  "Een lokale hapje geproefd",
  "Iemand uitgelachen om zonnebrand",
  "Een cocktail met een parapluutje besteld",
  "Een ezel gezien langs de weg",
  "Iemand in slaap gevallen op het strand",
  "Een groepsfoto met zelfontspanner",
  "Barefoot gelopen op scherp koraalzand",
  "Een spelletje gespeeld op de veranda",
  "Iemand die de weg kwijt was met de huurauto",
  "Een vis herkend uit de duikgids",
  "Regen gehad (kort!)",
  "Een lokale markt bezocht",
  "Iedereen tegelijk in het water",
  "Iemand doet een Fortnite-dansje bij zonsondergang",
  "Pokémon GO geopend 'voor het geval er iets bijzonders bij het rif zit'",
  "Iemand zingt een Disney-lied mee tijdens het koken",
  "Iemand roept 'Victory Royale!' na het winnen van een spelletje",
];

// Verborgen verrassingen — alleen te vinden door stiekem op het logo te tikken.
export const verborgenVerrassingen: string[] = [
  "🎮 Fortnite-tip: de Storm sluit hier nooit, maar de supermarkt wel — om 19:00.",
  "⚡ Pokémon GO-trainers: weinig PokéStops op dit eiland, wel oneindig veel real-life zonsondergang-XP.",
  "🏰 Disney-regel: wie 'Hakuna Matata' zingt tijdens het afwassen, hoeft daarna niet af te drogen.",
  "🕺 Het Fortnite-dansje doen na het verliezen van een spelletje telt als bonuspunt op het scorebord.",
  "🐭 Mickey-oortjes vergeten? Twee handdoeken en een goed humeur werken ook prima.",
  "🔴🔵 'Gotta catch 'em all' geldt hier ook gewoon voor zonsondergangfoto's.",
  "🧊 Let It Go is verplichte muziek zodra iemand de airco te koud heeft gezet.",
  "🌟 Je hebt zojuist de verborgen verrassing gevonden. Niemand die het weet — behalve jij nu.",
];

export const dagelijkseQuotes: string[] = [
  "Bonaire dushi — geniet van elk moment.",
  "Langzaam wandelen, snel genieten.",
  "De beste plannen zijn geen plannen.",
  "Zonnebrand is geen optie, het is een ritueel.",
  "Onder water is iedereen even stil.",
  "Vandaag geen wekker, wel een zonsopgang.",
  "Wat de zee geeft, geeft rust.",
  "Samen op reis is dubbel genieten.",
  "Een goede sundowner lost (bijna) alles op.",
  "Blote voeten, volle harten.",
];

export const bucketlistVoorbeelden: string[] = [
  "Nachtduik of nachtsnorkel doen",
  "Een lokale specialiteit proeven",
  "De hele Washington Slagbaai-route rijden",
  "Een foto met een flamingo op de achtergrond",
  "Een keer heel vroeg opstaan voor zonsopgang",
];

export const scorebordCategorieen = [
  { id: "snorkelplekken", naam: "Snorkelplekken", emoji: "🤿" },
  { id: "cocktails", naam: "Cocktails geproefd", emoji: "🍹" },
  { id: "zonsondergangen", naam: "Zonsondergangen gezien", emoji: "🌅" },
  { id: "jermaine-urgent", naam: "Jermaine zegt urgent", emoji: "⏰" },
  { id: "ezel-gezien", naam: "Ezel gezien", emoji: "🫏" },
  { id: "remco-roken", naam: "Remco loopt weg om te roken", emoji: "🚬" },
  { id: "over-werk", naam: "Iemand begint over werk", emoji: "💼" },
  { id: "bucket-amstel", naam: "Bucket Amstel Bright besteld", emoji: "🍺" },
];
