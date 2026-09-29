export const cadushyTourDatum = "2026-09-29";

export interface CadushySchemaItem {
  tijd: string;
  titel: string;
  emoji?: string;
}

export const cadushyTourSchema: CadushySchemaItem[] = [
  { tijd: "14:30", titel: "Vertrek Punt Vierkant" },
  { tijd: "±14:45", titel: "Pita Madre", emoji: "🫓" },
  { tijd: "±15:15", titel: "Yhanni's Arepas", emoji: "🫓" },
  { tijd: "±16:00", titel: "The Cadushy Distillery, Rincon", emoji: "🌵" },
  { tijd: "±17:15", titel: "Stoked Foodtruck", emoji: "🚌" },
  { tijd: "±17:50", titel: "Vertrek / klaarmaken ostracods" },
  { tijd: "18:40", titel: "Gereed bij de gekozen instapplek" },
  { tijd: "19:00", titel: "Ostracods — in het water", emoji: "✨" },
  { tijd: "±20:00", titel: "Uit het water / omkleden" },
  { tijd: "±20:30", titel: "Dominican Urban Food Truck", emoji: "🇩🇴" },
];

export interface CadushyStop {
  id: string;
  emoji: string;
  naam: string;
  locatie: string;
  telefoon?: string;
  rating?: string;
  openingstijden?: string;
  moment: string;
  tekst: string[];
  aanrader?: string;
  kaartQuery: string;
}

export const cadushyStops: CadushyStop[] = [
  {
    id: "pita-madre",
    emoji: "🫓",
    naam: "Pita Madre",
    locatie: "Kaya Gobernador N. Debrot, Kralendijk",
    telefoon: "+599 700 0819",
    rating: "4,9/5 — ruim 100 beoordelingen",
    moment: "Eerste stop — bestel vóór 15:00",
    tekst: [
      "Vanuit Punt Vierkant rijd je rechtstreeks noordwaarts naar Pita Madre. Reken op ongeveer een kwartier tot twintig minuten rijden.",
      "Pita Madre serveert rijk belegde pita's en loaded fries. Op het menu staan onder meer de Pita Madre Style met kipgyros, tzatziki en pittige saus, Chicken Satay met pindasaus en atjar, een Mexicaanse pita en een vegetarische variant met bietenhummus en geitenkaas.",
      "Blijf ongeveer 20 minuten — dit is een proeverij, geen volledige lunch.",
    ],
    aanrader:
      "Neem één of twee verschillende pita's en deel ze. De Pita Madre Style is een mooie klassieke keuze; Chicken Satay geeft er een Nederlands-Caribisch tintje aan.",
    kaartQuery: "Pita Madre Kaya Gobernador N. Debrot Kralendijk",
  },
  {
    id: "yhannis-arepas",
    emoji: "🫓",
    naam: "Yhanni's Arepas",
    locatie: "Budget Marine, Kaya Neerlandia, Kralendijk",
    telefoon: "+599 787 3731",
    rating: "4,8/5 — circa 250 beoordelingen",
    openingstijden: "12:00–19:00",
    moment: "Tweede stop",
    tekst: [
      "De tweede stop brengt je naar Venezuela. Yhanni's is gespecialiseerd in arepa's: gegrilde maïsbroodjes die worden opengesneden en royaal gevuld.",
      "Recente bezoekers noemen onder andere de arepa met chorizo en de pabellón met pulled beef als favorieten. De arepa's worden vers op bestelling gemaakt en staan bekend als behoorlijk goed gevuld.",
      "Plan hier ongeveer 20 minuten. Daarna begint de langere rit noordwaarts naar Rincon.",
    ],
    aanrader:
      "Neem twee verschillende arepa's voor de groep en snijd ze in stukken. Chorizo en pabellón vormen samen een mooie combinatie.",
    kaartQuery: "Budget Marine Kaya Neerlandia Kralendijk Bonaire",
  },
  {
    id: "cadushy-distillery",
    emoji: "🌵",
    naam: "The Cadushy Distillery",
    locatie: "Kaya C.D. Crestian 8 & 10, Rincon",
    telefoon: "+599 701 7011",
    openingstijden: "10:00–17:00",
    moment: "Gratis entree",
    tekst: [
      "Midden in Rincon ligt de enige distilleerderij van Bonaire. Cadushy maakt lokale likeuren en sterke dranken die zijn geïnspireerd op Bonaire en de andere Nederlands-Caribische eilanden.",
      "Tijdens een bezoek krijg je uitleg over het distillatieproces en de productie van onder meer Cadushy of Bonaire Liqueur en de Spirit of Bonaire-producten. Daarna kun je verschillende producten proeven. De distilleerderij ligt in een tuin rond het voormalige Cinelandia-complex.",
      "Reken op ongeveer 40 minuten. Omdat later op de avond wordt gesnorkeld, is dit vooral bedoeld als bezoek: houd eventuele alcoholproeverij zeer beperkt of sla die over als je het water in gaat of nog moet rijden.",
      "Vertrek rond 16:40–16:45 uur uit Rincon.",
    ],
    kaartQuery: "The Cadushy Distillery Rincon Bonaire",
  },
  {
    id: "stoked",
    emoji: "🚌",
    naam: "Stoked Foodtruck",
    locatie: "Te Amo Beach, Kralendijk",
    telefoon: "+599 785 4580",
    rating: "4,7/5 — ruim 350 beoordelingen",
    openingstijden: "12:00–20:00",
    moment: "Vierde stop",
    tekst: [
      "Na Rincon rijd je terug naar het zuiden. Stoked is moeilijk te missen: de foodtruck is gevestigd in een karakteristieke rode dubbeldekkerbus.",
      "Het menu is uitgebreid — burgers en wraps, maar voor deze tour zijn vooral de visgerechten interessant: Tuna Sashimi Wrap/Burger/Salad en Grilled Catch of the Day Wrap/Burger/Salad. Daarnaast onder meer chimichurri-, truffel-, spicy-mango- en crispy-chickenburgers en een falafelwrap.",
      "Probeer rond 17:45–17:50 uur weer te vertrekken.",
    ],
    aanrader:
      "Deel één Tuna Sashimi en één Catch of the Day. Zo blijft deze stop duidelijk anders dan Pita Madre en Yhanni's.",
    kaartQuery: "Stoked Foodtruck Te Amo Beach Bonaire",
  },
  {
    id: "dominican-urban",
    emoji: "🇩🇴",
    naam: "Dominican Urban Food Truck",
    locatie: "Carwash Bonaire, Kaya Gilberto F. Croes, Kralendijk",
    telefoon: "+599 770 0830",
    rating: "4,7/5",
    openingstijden: "19:00–23:30",
    moment: "Avondeten, na de ostracods",
    tekst: [
      "Dominican Urban serveert Dominicaans-Caribisch streetfood. De porties zijn volgens recente bezoekers royaal; verschillende recensenten melden dat één gerecht al behoorlijk vult.",
      "Na alle eerdere proeverijen hoef je hier niet overdreven veel te bestellen. Met een groep is het juist leuk om een paar verschillende gerechten te nemen en te delen.",
      "Reken op aankomst rond 20:15–20:30 uur, afhankelijk van hoe lang jullie in het water blijven.",
    ],
    kaartQuery: "Carwash Bonaire Kaya Gilberto F. Croes Kralendijk",
  },
];

export const cadushyOstracodPlanning: CadushySchemaItem[] = [
  { tijd: "±17:50", titel: "Vertrek bij Stoked" },
  { tijd: "±18:10", titel: "Terug bij accommodatie/duikmateriaal" },
  { tijd: "18:10–18:35", titel: "Omkleden en uitrusting controleren" },
  { tijd: "±18:40", titel: "Bij de gekozen instapplek" },
  { tijd: "18:45–18:55", titel: "Laatste voorbereiding" },
  { tijd: "19:00", titel: "In het water", emoji: "✨" },
];

export const cadushyRoute = [
  "Punt Vierkant",
  "Pita Madre — Kaya Gob. N. Debrot",
  "Yhanni's Arepas — Budget Marine, Kaya Neerlandia",
  "The Cadushy Distillery — Rincon",
  "Stoked Foodtruck — Te Amo Beach",
  "Ostracodlocatie — 19:00 in het water",
  "Dominican Urban — Kaya Gilberto F. Croes",
];

export const cadushyVoorbereiding =
  "Neem zwem-/duikspullen al mee in de auto, zodat je na Rincon en Stoked geen materiaal meer hoeft te verzamelen. Neem daarnaast handdoeken, droge kleding, water, verlichting voor de avond en eventueel een waterdichte tas mee.";

export const cadushyDeelTip =
  "Deze tour werkt het beste als je bij Pita Madre, Yhanni's en Stoked gerechten deelt. Dominican Urban is daarna het echte avondeten. Zo proef je vier totaal verschillende foodtruckkeukens zonder dat je vóór de ostracods propvol het water in moet.";

export const cadushyIndicatiefNotitie =
  "Vertrek (14:30) en het moment in het water (19:00) zijn de twee vaste ankerpunten. Alle tijden daartussen zijn indicatief — reistijd en drukte bij de foodtrucks kunnen meevallen of tegenvallen.";
