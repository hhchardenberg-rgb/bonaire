# Privacy- en beveiligingschecklist

Status van de belangrijkste privacy- en beveiligingsmaatregelen in dit
project. Vink af / controleer dit voordat je de link deelt met de groep.

## Niet vindbaar in zoekmachines

- [x] `public/robots.txt` blokkeert alle crawlers (`Disallow: /`).
- [x] Elke pagina stuurt `X-Robots-Tag: noindex, nofollow, noarchive,
      nosnippet, noimageindex` via `next.config.mjs` headers.
- [x] `<meta name="robots">` met dezelfde waarden staat in de metadata van
      elke pagina (`src/app/layout.tsx`).
- [x] Er is geen `sitemap.xml`.
- [x] Geen `<link rel="canonical">` naar een publieke domeinnaam.
- [ ] **Zelf checken:** als je een custom domein gebruikt, zorg dat er geen
      publieke links naar de site verwijzen (geen social media, geen open
      Slack/Discord-kanalen).

## Toegangsbeveiliging

- [x] Eén gedeelde toegangscode (`ACCESS_CODE`), ingesteld via environment
      variables — staat niet hardcoded in de broncode.
- [x] `src/middleware.ts` controleert op **elke** pagina (behalve
      `/login` en de login-API) of een geldig, ondertekend cookie aanwezig
      is. Rechtstreeks een diepe link openen zonder cookie stuurt door naar
      `/login`.
- [x] Het toegangscookie is `HttpOnly`, `Secure` en `SameSite=Lax` — niet
      leesbaar via JavaScript, alleen verzonden over HTTPS.
- [x] Het cookie bevat geen leesbare toegangscode maar een HMAC-SHA256-hash,
      ondertekend met `AUTH_SECRET`.
- [x] Geen gevoelige informatie in URL's — de login-flow geeft alleen een
      relatief pad (`?van=/pad`) door, geen reisdata of tokens.
- [ ] **Zelf checken:** stel in productie een eigen, unieke `ACCESS_CODE` en
      `AUTH_SECRET` in (niet de voorbeeldwaarden uit `.env.example`).
- [ ] **Zelf checken:** deel de link en toegangscode alleen via een vertrouwd
      privékanaal (bijv. een bestaande groepsapp), niet publiekelijk.

## Geen tracking, advertenties of onnodige externe scripts

- [x] Geen analytics-, advertentie- of trackingscripts opgenomen.
- [x] Geen ingebedde kaart-widget (bijv. Google Maps iframe); in plaats
      daarvan open je locaties via een link in de eigen kaart-app van de
      telefoon.
- [x] Lettertypen (Fredoka, Inter) worden via `next/font/google`
      **zelf gehost** in de build — geen runtime-verzoek naar Google's
      servers door bezoekers.
- [x] Geen third-party foto-CDN's; illustraties zijn inline SVG.
- [x] `Referrer-Policy: no-referrer` voorkomt dat externe links (bijv.
      kaart-app) de eigen URL van het boekje doorgeven.
- [x] `Permissions-Policy` schakelt camera en microfoon uit; locatie is
      alleen beschikbaar voor de site zelf (`self`), niet voor derden.

## Privacy van reisgegevens

- [x] Alle reisinhoud staat in lokale databestanden (`src/data/`), niet in
      een externe/derde-partij database.
- [x] Paklijst, favorieten, bingo, quiz-score, stemmen en herinneringen
      worden opgeslagen in `localStorage` van het eigen apparaat — niet
      gedeeld met een server of derde partij.
- [x] Waar informatie (nog) niet geverifieerd is, staat expliciet "nog
      controleren" in plaats van verzonnen gegevens.
- [ ] **Zelf checken:** vul geen extreem gevoelige gegevens in (zoals volledige
      bankgegevens) — dit is een gedeeld boekje, geen wachtwoordkluis.

## Overige beveiligingsheaders

- [x] `X-Frame-Options: DENY` — voorkomt clickjacking via iframes.
- [x] `X-Content-Type-Options: nosniff`.
- [x] Cookies zijn niet leesbaar of aanpasbaar vanaf een ander domein
      (`SameSite=Lax`).

## Bekende restrisico's (transparant benoemd)

- Dit project gebruikt Next.js 14.2.x (laatste patchversie in de 14-lijn met
  o.a. de fix voor de bekende middleware-autorisatie-bypass). Een deel van de
  nieuwere denial-of-service- en cache-gerelateerde adviezen in de
  Next.js-changelog is alleen gepatcht in Next.js 15/16. Voor een klein,
  privé vriendengroepsboekje (geen publieke, hoogvolume site) is de impact
  hiervan laag, maar overweeg een upgrade naar Next.js 15+ zodra je tijd hebt
  om de migratiegids te volgen.
- `next/image`-optimalisatie staat uit (`images.unoptimized: true`), wat de
  meeste image-optimizer-gerelateerde kwetsbaarheden sowieso buiten werking
  stelt.
- De PWA-iconen zijn placeholder-SVG's; dit heeft geen beveiligingsimpact
  maar is wel iets om te vervangen voor een professionelere uitstraling.
- Er is geen rate limiting op de login-API. Voor een kleine vriendengroep met
  een lange, unieke toegangscode is dit een acceptabel risico; overweeg een
  eenvoudige rate limiter (bijv. via je hostingprovider) als je dat prettiger
  vindt.
