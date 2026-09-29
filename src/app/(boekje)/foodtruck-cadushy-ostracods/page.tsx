import Link from "next/link";
import { BackLink } from "@/components/BackLink";
import { PageHeader } from "@/components/PageHeader";
import { OstracodDiagram } from "@/components/OstracodDiagram";
import { CadushyRouteKaart } from "@/components/CadushyRouteKaart";
import { mapsUrl } from "@/lib/maps";
import {
  cadushyTourSchema,
  cadushyStops,
  cadushyOstracodPlanning,
  cadushyRoute,
  cadushyMapsRouteUrl,
  cadushyVoorbereiding,
  cadushyDeelTip,
  cadushyIndicatiefNotitie,
} from "@/data/cadushyTour";

export const metadata = { title: "Foodtruck tour, Cadushy & Ostracods" };

export default function CadushyTourPagina() {
  return (
    <div className="space-y-6">
      <BackLink href="/" label="Home" />
      <PageHeader
        titel="🌮 Foodtruck tour, Cadushy & Ostracods"
        ondertitel="Vertrek 14:30 vanaf Punt Vierkant — 19:00 in het water"
        emoji="🗓️"
      />

      <p className="rounded-xl2 bg-koraal-50 p-3 text-center text-sm font-medium text-koraal-700">
        ⏱️ {cadushyIndicatiefNotitie}
      </p>

      <p className="rounded-xl2 bg-turquoise-50 p-4 text-sm leading-relaxed text-diepblauw-800">
        Een middag waarop je verschillende kanten van Bonaire combineert: mediterrane streetfood,
        Venezolaanse arepa&apos;s, een bezoek aan de distilleerderij in Rincon, vis bij een van de
        bekendste foodtrucks van het eiland en als hoogtepunt de bioluminescente ostracods. Na het
        water sluit je af met Dominicaans streetfood.
      </p>

      <div className="rounded-xl2 bg-diepblauw-800 p-4 text-white shadow-card">
        <h2 className="mb-2 font-display text-sm font-semibold">🗺️ Route in het kort</h2>
        <ol className="space-y-1 text-sm text-white/90">
          {cadushyTourSchema.map((item, i) => (
            <li key={i}>
              <span className="font-mono text-turquoise-200">{item.tijd}</span>{" "}
              {item.emoji && <span aria-hidden>{item.emoji}</span>} {item.titel}
            </li>
          ))}
        </ol>
        <a
          href={cadushyMapsRouteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring mt-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-diepblauw-800 shadow-card transition hover:-translate-y-0.5"
        >
          📍 Open hele route in Google Maps
        </a>
      </div>

      {cadushyStops.slice(0, 4).map((stop, i) => (
        <div key={stop.id} className="rounded-xl2 bg-white p-4 shadow-card">
          <div className="flex items-start gap-3">
            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-turquoise-100 text-xs font-bold text-turquoise-800">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-diepblauw-800">
                <span className="mr-1" aria-hidden>
                  {stop.emoji}
                </span>
                {stop.naam}
              </p>
              <p className="mt-0.5 text-xs text-diepblauw-700/60">📍 {stop.locatie}</p>
              <p className="text-xs text-diepblauw-700/60">
                {stop.telefoon && <>📞 {stop.telefoon}</>}
                {stop.rating && <> · ⭐ {stop.rating}</>}
              </p>
              {stop.openingstijden && (
                <p className="text-xs text-diepblauw-700/60">🕒 {stop.openingstijden}</p>
              )}
              <p className="mt-1 text-xs font-semibold text-turquoise-700">{stop.moment}</p>
              <div className="mt-2 space-y-1.5 text-sm text-diepblauw-800">
                {stop.tekst.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
              {stop.aanrader && (
                <p className="mt-2 rounded-xl bg-zand-50 p-2.5 text-sm text-diepblauw-800">
                  <span className="font-semibold">Aanrader: </span>
                  {stop.aanrader}
                </p>
              )}
              <a
                href={mapsUrl(stop.kaartQuery)}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring mt-2 inline-block text-xs font-semibold text-turquoise-700 underline"
              >
                Navigeer ernaartoe →
              </a>
            </div>
          </div>
        </div>
      ))}

      <div className="rounded-xl2 p-4 shadow-card" style={{ background: "linear-gradient(160deg, #0f3d63 0%, #0a2847 100%)" }}>
        <div className="flex items-start gap-3">
          <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-bold text-white">
            5
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-white">✨ Ostracods — 19:00 in het water</p>
            <p className="mt-2 text-sm text-white/90">
              Dit is het hoogtepunt van de avond en de planning is hier bewust ruim omheen
              gebouwd. Zorg dat je niet pas om 19:00 bij de kust arriveert — je wilt dan
              daadwerkelijk in het water liggen.
            </p>
          </div>
        </div>

        <div className="mt-3 rounded-xl bg-white/10 p-3 backdrop-blur-sm">
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-white/70">
            Praktische planning
          </p>
          <ul className="space-y-0.5 text-sm text-white/90">
            {cadushyOstracodPlanning.map((item, i) => (
              <li key={i}>
                <span className="font-mono text-turquoise-200">{item.tijd}</span> —{" "}
                {item.emoji && <span aria-hidden>{item.emoji}</span>} {item.titel}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-3 text-sm text-white/90">
          Voor duikers: volg voor de exacte locatie, instaptijd en procedure de briefing van de
          lokale duikschool/gids. Bij zelfstandig snorkelen is het verstandig de gekozen plek
          vooraf bij een lokale duikoperator te verifiëren. Neem masker, snorkel/vinnen, geschikte
          verlichting en eventueel wetsuit/rashguard mee, en gebruik verlichting tijdens het
          schouwspel zelf zo terughoudend mogelijk.
        </p>

        <div className="mt-3">
          <OstracodDiagram />
        </div>

        <Link
          href="/ostracod-night"
          className="focus-ring mt-3 inline-block text-sm font-semibold text-turquoise-200 underline"
        >
          Volledige uitleg, pakkijst en kijktips bekijken →
        </Link>
      </div>

      {cadushyStops.slice(4).map((stop) => (
        <div key={stop.id} className="rounded-xl2 bg-white p-4 shadow-card">
          <div className="flex items-start gap-3">
            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-turquoise-100 text-xs font-bold text-turquoise-800">
              6
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-diepblauw-800">
                <span className="mr-1" aria-hidden>
                  {stop.emoji}
                </span>
                {stop.naam}
              </p>
              <p className="mt-0.5 text-xs text-diepblauw-700/60">📍 {stop.locatie}</p>
              <p className="text-xs text-diepblauw-700/60">
                {stop.telefoon && <>📞 {stop.telefoon}</>}
                {stop.rating && <> · ⭐ {stop.rating}</>}
              </p>
              {stop.openingstijden && (
                <p className="text-xs text-diepblauw-700/60">🕒 {stop.openingstijden}</p>
              )}
              <p className="mt-1 text-xs font-semibold text-turquoise-700">{stop.moment}</p>
              <div className="mt-2 space-y-1.5 text-sm text-diepblauw-800">
                {stop.tekst.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
              <a
                href={mapsUrl(stop.kaartQuery)}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring mt-2 inline-block text-xs font-semibold text-turquoise-700 underline"
              >
                Navigeer ernaartoe →
              </a>
            </div>
          </div>
        </div>
      ))}

      <div>
        <h2 className="mb-2 font-display text-sm font-semibold text-diepblauw-700">
          Route van de dag
        </h2>
        <div className="rounded-xl2 bg-white p-4 text-sm text-diepblauw-800 shadow-card">
          {cadushyRoute.map((stap, i) => (
            <p key={i}>
              {i > 0 && <span className="text-diepblauw-300">↓ </span>}
              {stap}
            </p>
          ))}
          <p className="mt-3 text-xs text-diepblauw-700/60">
            Het eerste deel is bewust een lus: vanuit Punt Vierkant via Kralendijk steeds verder
            noordwaarts naar Rincon, en daarna weer terug naar het zuiden voor Stoked en de
            ostracods. Na het water rijd je terug richting Kralendijk voor Dominican Urban.
          </p>
          <a
            href={cadushyMapsRouteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring mt-3 inline-flex items-center gap-1.5 rounded-full bg-turquoise-50 px-3.5 py-2 text-xs font-semibold text-turquoise-800"
          >
            📍 Open hele route in Google Maps
          </a>
        </div>

        <div className="mt-3">
          <CadushyRouteKaart />
        </div>
      </div>

      <div className="rounded-xl2 bg-zon-100 p-4 text-sm text-zon-900">
        <h2 className="mb-1 font-display text-sm font-semibold">🎒 Wat je vooraf klaarlegt</h2>
        <p>{cadushyVoorbereiding}</p>
      </div>

      <p className="rounded-xl2 bg-white p-4 text-sm leading-relaxed text-diepblauw-800 shadow-card">
        {cadushyDeelTip}
      </p>
    </div>
  );
}
