# Testlijst — mobiel, tablet en desktop

Handmatige checklist om te doorlopen vóór je de link deelt met de groep.

## Toegang en beveiliging

- [ ] Open een pagina-URL (bijv. `/vandaag`) in een incognitovenster zonder
      eerder ingelogd te zijn → je wordt doorgestuurd naar `/login`.
- [ ] Voer een verkeerde toegangscode in → duidelijke foutmelding, geen
      toegang.
- [ ] Voer de juiste toegangscode in → toegang tot de opgevraagde pagina.
- [ ] Sluit de browser en open de site opnieuw → je blijft ingelogd (cookie
      onthouden, tot 180 dagen).
- [ ] Klik op "Uitloggen" (onderaan Meer) → daarna vereist elke pagina weer
      de toegangscode.
- [ ] Controleer `/robots.txt` → bevat `Disallow: /`.
- [ ] Bekijk de paginabron → `<meta name="robots" content="noindex, ...">`
      is aanwezig.
- [ ] Zoek de sitenaam/URL niet op in een zoekmachine (kan enige tijd duren
      voordat afwezigheid bevestigd is, maar de directieven staan goed).

## Navigatie en bereikbaarheid

- [ ] De vaste bottom navigation (Vandaag, Programma, Gids, Kaart, Meer) is
      op elk schermformaat zichtbaar en werkt.
- [ ] Vanaf de welkomstpagina is elke hoofdsectie in maximaal twee tikken
      bereikbaar.
- [ ] De "Nood"-knop rechtsboven werkt vanaf elke pagina.
- [ ] Terug-links (bijv. "← Meer") werken correct.
- [ ] Direct een diepe link openen (bijv. `/gids/stranden`) werkt na inloggen.
- [ ] Een niet-bestaande gidscategorie (bijv. `/gids/onzin`) toont een
      nette "niet gevonden"-pagina in plaats van een crash.

## Responsive gedrag

- [ ] 375px breed (bijv. iPhone SE): geen horizontale scroll, tekst leesbaar,
      knoppen goed te raken.
- [ ] 390–430px breed (moderne iPhones/Android): layout oogt verzorgd.
- [ ] Tablet (768–1024px): content blijft leesbaar, geen overdreven witruimte
      of uitgerekte kaarten.
- [ ] Desktop (1280px+): content blijft gecentreerd op leesbare breedte, geen
      uitgerekte layout.
- [ ] Landscape-oriëntatie op telefoon: bottom navigation blijft bruikbaar.

## Functionaliteit per onderdeel

- [ ] **Welkomstpagina**: aftelklok loopt correct af naar 0 op de startdatum.
- [ ] **Vandaag**: toont het juiste dagprogramma op basis van de systeemdatum;
      vóór en na de reisdata verschijnt een duidelijke melding.
- [ ] **Vandaag**: activiteiten afvinken slaat op en blijft na herladen van
      de pagina staan.
- [ ] **Programma**: alle dagen en activiteiten tonen correct, "Meer
      details" klapt uit/in.
- [ ] **Gids**: alle categorieën tonen het juiste aantal plekken; kaartknop
      opent de juiste zoekopdracht.
- [ ] **Gids**: favorieten (ster) opslaan en terugzien op de Favorieten-pagina.
- [ ] **Kaart**: alle knoppen openen een geldige Google Maps-link in een
      nieuw tabblad/de kaart-app.
- [ ] **Praktisch**: telefoonnummers zijn klikbaar en starten een belpoging
      op mobiel.
- [ ] **Paklijst**: items afvinken persisteert; voortgangsbalk klopt; reset
      werkt (met bevestiging).
- [ ] **Wie doet wat**: taken en namen tonen correct.
- [ ] **Nood**: noodnummers klikbaar, uitklapinstructies werken.
- [ ] **Fun — Wie kiest vandaag**: kiest willekeurig een naam.
- [ ] **Fun — Stemmen**: stemmen tellen op, resetten werkt.
- [ ] **Fun — Bingo**: vakjes aan/uit klikbaar, volledige kaart toont
      felicitatie.
- [ ] **Fun — Quiz**: doorloopt alle vragen, toont eindscore, "opnieuw"
      werkt.
- [ ] **Fun — Bucketlist**: eigen item toevoegen en afvinken werkt.
- [ ] **Fun — Scorebord**: tellers op/neer werken, niet onder 0.
- [ ] **Fun — Fotomuur**: dagelijkse quote wisselt per dag; herinnering
      toevoegen/verwijderen werkt.
- [ ] **Offline**: na één keer bezoeken van een pagina, vliegtuigmodus aan →
      pagina blijft (deels) bereikbaar via de service worker-cache.

## Toegankelijkheid en toetsenbordbediening

- [ ] Alle interactieve elementen zijn bereikbaar via Tab-toets, in logische
      volgorde.
- [ ] Focusstatus is duidelijk zichtbaar (turquoise focusring).
- [ ] Knoppen en links hebben duidelijke, beschrijvende labels
      (`aria-label` waar nodig, bijv. bij favoriet-ster en checkboxen).
- [ ] Kleurcontrast van tekst op gekleurde achtergronden is voldoende
      leesbaar, ook in fel zonlicht (test op een telefoon buiten).
- [ ] Content is bruikbaar met `prefers-reduced-motion` ingeschakeld
      (animaties worden vrijwel uitgeschakeld).
- [ ] Screenreader (VoiceOver/TalkBack): paginatitels en koppen worden
      logisch voorgelezen.

## Performance en foutafhandeling

- [ ] Eerste laadtijd op mobiel 4G is acceptabel (geen zware externe assets).
- [ ] Een tijdelijke serverfout toont de nette foutpagina met
      "Opnieuw proberen" in plaats van een witte pagina.
- [ ] Een niet-bestaande route toont de aangepaste "niet gevonden"-pagina.
- [ ] Lege staten (bijv. nog geen favorieten/herinneringen) tonen een
      vriendelijke melding in plaats van een lege pagina.
- [ ] `npm run build` voltooit zonder fouten of waarschuwingen.
- [ ] `npm run lint` en `npm run typecheck` zijn schoon.
