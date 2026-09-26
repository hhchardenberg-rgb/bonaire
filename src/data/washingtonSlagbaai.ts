// Feiten geverifieerd via STINAPA Bonaire en overige reisbronnen.
export interface RouteStop {
  naam: string;
  emoji: string;
  omschrijving: string;
}

export const korteRouteStops: RouteStop[] = [
  {
    naam: "Start bij het bezoekerscentrum",
    emoji: "🏛️",
    omschrijving:
      "Betaal hier de Nature Fee, pak de gratis parkkaart mee en vraag de rangers naar de actuele staat van de route.",
  },
  {
    naam: "Interieur van het park",
    emoji: "🌵",
    omschrijving:
      "De korte (groene) route snijdt dwars door het heuvelachtige binnenland: onverharde paden tussen de cactussen door, met steile stukjes en mooie uitzichten.",
  },
  {
    naam: "Playa Funchi",
    emoji: "🤿",
    omschrijving:
      "Een klein kiezelstrandje waar de korte en lange route samenkomen. Populair bij snorkelaars door het heldere water en de rijke onderwaterwereld.",
  },
  {
    naam: "Boka Slagbaai",
    emoji: "🏖️",
    omschrijving:
      "De volgende stop: een fijn kiezelstrand met wc's en picknicktafels — een van de weinige plekken in het park mét voorzieningen. Prima plek voor lunch en een verfrissende duik.",
  },
];

export const korteRouteTips = [
  {
    titel: "4x4 of pick-up verplicht",
    tekst:
      "De wegen in het park zijn onverhard. STINAPA raadt voertuigen met minstens 30 cm bodemvrijheid aan (jeep, Jimny, pick-up, SUV) — met een gewone huurauto kom je er niet doorheen.",
  },
  {
    titel: "Minstens 2 liter water per persoon",
    tekst: "Neem ook lunch of stevige snacks mee — onderweg is nauwelijks iets te koop.",
  },
  {
    titel: "Zonbescherming en muggenspray",
    tekst: "Zonnebrand, zonnebril en een pet of hoed, plus ruim voldoende insectenspray.",
  },
  {
    titel: "ID en betaalpas mee",
    tekst:
      "De Nature Fee ($40 p.p., kinderen onder 12 gratis) kan alleen met pin of creditcard en geldt voor toegang tot het park én het Bonaire National Marine Park.",
  },
  {
    titel: "Op tijd vertrekken",
    tekst: "Het park is open van dinsdag t/m zondag, 08:00–17:00 uur, met laatste toegang om 14:30 uur.",
  },
];

export const korteRouteWeetjes = [
  "Washington Slagbaai National Park opende op 9 mei 1969 en was het allereerste natuurreservaat van de voormalige Nederlandse Antillen.",
  "Het park beslaat zo'n 5.643 hectare — bijna een vijfde van heel Bonaire — en wordt beheerd door de non-profitstichting STINAPA.",
  "Tot de 20e eeuw stonden hier twee plantages, Washington en Slagbaai, die zout, houtskool, aloë-extract en divi-divipeulen produceerden — en jaarlijks tot 3.000 geiten exporteerden naar Curaçao en Europa.",
  "Het park is een veilige plek voor onder meer flamingo's en de endemische Lora (de Bonaireaanse geelvleugelamazone), naast meer dan 200 andere vogelsoorten.",
  "De Brandaris, het hoogste punt van Bonaire (241 meter), ligt middenin het park.",
];
