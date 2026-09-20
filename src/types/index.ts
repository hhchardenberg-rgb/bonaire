export type ActiviteitStatus = "gepland" | "bevestigd" | "afgerond";

export interface Activiteit {
  id: string;
  titel: string;
  datum: string; // YYYY-MM-DD
  tijd?: string; // HH:mm of "hele dag"
  eindtijd?: string;
  locatie?: string;
  omschrijving?: string;
  praktisch?: string;
  contact?: string;
  kaartUrl?: string;
  fotoEmoji?: string; // lichte visuele indicatie i.p.v. echte foto
  status: ActiviteitStatus;
}

export interface Dagprogramma {
  dag: string; // YYYY-MM-DD
  titel?: string; // bv. "Aankomstdag"
  activiteiten: Activiteit[];
}

export type GidsCategorieId =
  | "stranden"
  | "snorkelen-duiken"
  | "eten-drinken"
  | "wandelen-natuur"
  | "bezienswaardigheden"
  | "zonsondergang"
  | "winkels"
  | "rustige-plekken"
  | "slecht-weer";

export interface GidsCategorie {
  id: GidsCategorieId;
  naam: string;
  emoji: string;
  omschrijving: string;
}

export interface GidsItem {
  id: string;
  naam: string;
  categorie: GidsCategorieId;
  omschrijving: string;
  locatie: string;
  kaartUrl: string;
  prijsindicatie?: string; // "nog controleren" als niet geverifieerd
  openingstijden?: string; // "nog controleren" als niet geverifieerd
  tags: string[];
}

export type LocatieType =
  | "accommodatie"
  | "luchthaven"
  | "eten-drinken"
  | "strand"
  | "activiteit"
  | "boodschappen"
  | "medisch"
  | "bezienswaardigheid";

export interface Locatie {
  id: string;
  naam: string;
  type: LocatieType;
  omschrijving?: string;
  kaartUrl: string;
}

export interface PaklijstItem {
  id: string;
  naam: string;
}

export interface PaklijstCategorie {
  id: string;
  naam: string;
  emoji: string;
  items: PaklijstItem[];
}

export interface Taak {
  id: string;
  naam: string;
  toegewezenAan: string[];
  omschrijving?: string;
}

export interface Contactpersoon {
  naam: string;
  rol?: string;
  telefoon?: string;
}
