# Bonaire 2026 — Vakantieboekje

Een privé, mobile-first vakantieboekje voor de vriendengroep die naar Bonaire
gaat. Gebouwd met Next.js (App Router), TypeScript en Tailwind CSS. Geen
tracking, geen advertenties, geen zoekmachine-indexering.

## Inhoud

- **Welkomstpagina** met aftelklok en snelkoppelingen
- **Vandaag** — dagoverzicht met programma, tijden, taken en dagtip
- **Programma** — hele reisplanning per dag, uitklapbare details
- **Gids** — categorieën met stranden, eten, snorkelen, etc.
- **Kaart** — belangrijke locaties die direct openen in de kaart-app
- **Meer** — praktische info, paklijst, taakverdeling, nood & hulp, fun-features
- Fun-features: wie-kiest-vandaag, stemmen, bingo, quiz, bucketlist, scorebord,
  fotomuur/quote, favorieten
- PWA: optioneel toe te voegen aan het beginscherm

## 1. Installeren

Vereist: Node.js 18.18+ (getest met Node 22) en npm.

```bash
npm install
cp .env.example .env.local
```

Vul in `.env.local` een eigen toegangscode en geheime sleutel in:

```bash
ACCESS_CODE=een-geheime-code-voor-de-groep
AUTH_SECRET=een-lange-willekeurige-string
```

Start de ontwikkelserver:

```bash
npm run dev
```

Open <http://localhost:3000> — je krijgt eerst het inlogscherm te zien met de
gedeelde toegangscode.

## 2. Inhoud aanpassen

Alle reisinhoud staat in leesbare TypeScript-bestanden onder `src/data/`, dus
je hoeft niets in de UI-code aan te passen:

| Bestand | Inhoud |
| --- | --- |
| `src/data/trip.ts` | Titel, reisdata, welkomsttekst, accommodatie |
| `src/data/programma.ts` | Dagprogramma en activiteiten |
| `src/data/gids.ts` | Categorieën en aanbevelingen (stranden, eten, etc.) |
| `src/data/locaties.ts` | Locaties die op de kaartpagina staan |
| `src/data/praktisch.ts` | Praktische informatie-secties |
| `src/data/paklijst.ts` | Categorieën en items van de paklijst |
| `src/data/taken.ts` | Groepsleden (gebruikt door "Wie kiest vandaag?") |
| `src/data/nood.ts` | Noodnummers, contacten en verlies-instructies |
| `src/data/fun.ts` | Quizvragen, bingo-items, quotes, bucketlist-voorbeelden, easter eggs |
| `src/data/dagtips.ts` | Dagtips en het (statische) weerbeeld |

Prijzen, openingstijden en andere onzekere gegevens worden nooit verzonnen:
waar iets niet geverifieerd is, laten we het veld gewoon weg of gebruiken we
een neutrale formulering (bijv. "zie boekingsbevestiging"). Vul dit soort
velden pas aan zodra je de echte, gecontroleerde informatie hebt.

Kaartlinks worden automatisch gebouwd via `mapsUrl("zoekterm")` uit
`src/lib/maps.ts` — dit opent een Google Maps-zoekopdracht die op de telefoon
in de eigen kaart-app opent, zonder ingebedde kaart-widget (geen tracking).

## 3. Toegangscode / beveiliging

De site staat achter één gedeelde toegangscode (geen individuele accounts).
Bij een juiste code wordt een ondertekend cookie gezet dat door
`src/middleware.ts` gecontroleerd wordt op elke pagina. Zie
[PRIVACY-SECURITY.md](./PRIVACY-SECURITY.md) voor de volledige checklist.

Wijzig de code op elk moment door `ACCESS_CODE` in de environment variables
aan te passen (lokaal in `.env.local`, in productie via de instellingen van
je hostingprovider) en de site opnieuw te (her)starten/deployen.

## 4. Deployen

Deze app is een standaard Next.js-project en kan overal draaien waar Next.js
gehost kan worden (bijvoorbeeld Vercel, of een eigen Node-server).

### Vercel (aanbevolen, eenvoudigst)

1. Maak een **privé** Git-repository (of upload het project rechtstreeks).
2. Importeer het project in Vercel.
3. Zet de environment variables `ACCESS_CODE` en `AUTH_SECRET` in de
   projectinstellingen.
4. Deploy. Vercel geeft een URL — deel deze URL alleen via een privékanaal
   (bijvoorbeeld een groepsapp), nooit publiek.

### Eigen server

```bash
npm run build
npm run start
```

Zet in beide gevallen `ACCESS_CODE` en `AUTH_SECRET` als environment
variables — zonder deze vallen ze terug op onveilige standaardwaarden die
niet geschikt zijn voor productie.

## 5. PWA (optioneel toevoegen aan beginscherm)

De site heeft een `manifest.webmanifest` en een minimale service worker
(`public/sw.js`) die eerder bezochte pagina's cachet voor beperkte offline
toegang. Gebruikers kunnen op hun telefoon via "Toevoegen aan beginscherm"
(Zet op beginscherm) een snelkoppeling maken — dit is geen store-app, alleen
een snelkoppeling naar de browserversie.

De iconen in `public/icons/` zijn eenvoudige SVG-placeholders. Vervang ze
gerust door eigen PNG/SVG-iconen (192×192 en 512×512) voor een mooiere
weergave op alle apparaten.

## 6. Projectstructuur

```
src/
  app/
    login/                een openbare inlogpagina (buiten de toegangscheck)
    api/auth/              route handlers voor inloggen/uitloggen
    (boekje)/              alle pagina's ACHTER de toegangscode
      page.tsx             welkomstpagina
      vandaag/
      programma/
      gids/ + gids/[categorie]/
      kaart/
      meer/ (praktisch, paklijst, wie-doet-wat, fun/*)
      nood/
  components/              herbruikbare UI-componenten
  data/                    alle aanpasbare reisinhoud
  lib/                     hulpfuncties (auth, datums, kaartlinks, opslag)
  middleware.ts            controleert het toegangscookie op elke pagina
```

## 7. Overige documentatie

- [PRIVACY-SECURITY.md](./PRIVACY-SECURITY.md) — privacy- en
  beveiligingschecklist
- [TESTPLAN.md](./TESTPLAN.md) — testlijst voor mobiel, tablet en desktop

## 8. Nog in te vullen

De meeste praktische gegevens staan er al in (vluchten, accommodatie,
noodnummers). Wat nog open staat:

- Wifi-wachtwoord van de accommodatie (`src/data/trip.ts` en
  `src/data/praktisch.ts`)
- Reserveringsnummers voor huurauto en activiteiten (`src/data/praktisch.ts`,
  `src/data/programma.ts`)
- Openingstijden en prijzen van gidsonderdelen die nog geen waarde hebben
  (`src/data/gids.ts`) — vul dit pas aan als je het zeker weet
- Polisnummer reisverzekering
- Eventueel een link naar een gedeeld fotoalbum in `src/data/trip.ts`
