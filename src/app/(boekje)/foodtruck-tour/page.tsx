import { BackLink } from "@/components/BackLink";
import { PageHeader } from "@/components/PageHeader";
import { mapsUrl } from "@/lib/maps";
import {
  foodtruckSecties,
  foodtruckIdealeRoute,
  foodtruckCompacteRoute,
  foodtruckTip,
  foodtruckAfvallers,
  foodtruckDisclaimer,
  foodtruckVoorbeeldBasis,
} from "@/data/foodtruckRoute";
import type { FoodtruckStopType } from "@/data/foodtruckRoute";

export const metadata = { title: "Foodtruckfestival" };

const TYPE_LABEL: Record<FoodtruckStopType, string> = {
  kern: "Kernstop",
  optioneel: "Optioneel",
  tijdkritisch: "Tijdkritisch",
  reserve: "Reserve",
  laat: "Late-night joker",
};

const TYPE_STYLE: Record<FoodtruckStopType, string> = {
  kern: "bg-turquoise-100 text-turquoise-800",
  optioneel: "bg-zand-100 text-zand-800",
  tijdkritisch: "bg-koraal-100 text-koraal-700",
  reserve: "bg-diepblauw-100 text-diepblauw-700",
  laat: "bg-zon-100 text-zon-800",
};

export default function FoodtruckTourPagina() {
  return (
    <div className="space-y-6">
      <BackLink href="/" label="Home" />
      <PageHeader
        titel="🌴 De foodtrucktour"
        ondertitel="Vanaf 15:00 — een route met keuzemomenten, geen rigide lijst"
        emoji="🌮"
      />

      <p className="rounded-xl2 bg-turquoise-50 p-4 text-sm leading-relaxed text-diepblauw-800">
        Geen vaste lijst, maar een route met keuzemomenten — zo beslissen jullie ter plekke hoeveel
        trek je hebt. Acht mogelijke stops, maar probeer niet overal een volledig gerecht te eten:{" "}
        {foodtruckTip}
      </p>

      {foodtruckSecties.map((sectie) => (
        <div key={sectie.id}>
          <div className="mb-2 flex items-baseline justify-between gap-2">
            <h2 className="font-display text-base font-semibold text-diepblauw-800">{sectie.titel}</h2>
            <span className="whitespace-nowrap text-xs font-medium text-diepblauw-700/60">
              {sectie.tijdvak}
            </span>
          </div>
          {sectie.intro && <p className="mb-3 text-sm text-diepblauw-700/70">{sectie.intro}</p>}

          {sectie.stops.length > 0 && (
            <ul className="space-y-3">
              {sectie.stops.map((stop) => (
                <li key={stop.id} className="rounded-xl2 bg-white p-4 shadow-card">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl" aria-hidden>
                      {stop.emoji}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-diepblauw-800">{stop.naam}</p>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${TYPE_STYLE[stop.type]}`}
                        >
                          {TYPE_LABEL[stop.type]}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-diepblauw-700/60">
                        ⏰ {stop.tijden}
                        {stop.aanbevolenTijd && <> · aanbevolen aankomst {stop.aanbevolenTijd}</>}
                      </p>
                      <p className="text-xs text-diepblauw-700/60">📍 {stop.locatie}</p>
                      {stop.rating && (
                        <p className="text-xs text-diepblauw-700/60">⭐ {stop.rating}</p>
                      )}
                      <p className="mt-2 text-sm text-diepblauw-800">{stop.tip}</p>
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
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}

      <div className="rounded-xl2 bg-diepblauw-800 p-4 text-white shadow-card">
        <h2 className="mb-2 font-display text-sm font-semibold">🗺️ De ideale route</h2>
        <ol className="space-y-1 text-sm text-white/90">
          {foodtruckIdealeRoute.map((stap, i) => (
            <li key={i}>{stap}</li>
          ))}
        </ol>
      </div>

      <div className="rounded-xl2 bg-zon-100 p-4 text-sm text-zon-900">
        <h2 className="mb-1 font-display text-sm font-semibold">⚡ Liever maar 5 stops?</h2>
        <p>{foodtruckCompacteRoute}</p>
      </div>

      <div className="rounded-xl2 bg-white p-4 text-sm text-diepblauw-800 shadow-card">
        <h2 className="mb-2 font-display text-sm font-semibold text-diepblauw-700">
          Bewust niet meegenomen
        </h2>
        <ul className="space-y-1">
          {foodtruckAfvallers.map((a) => (
            <li key={a.naam}>
              <span className="font-medium">{a.naam}</span> — {a.reden}
            </li>
          ))}
        </ul>
      </div>

      <p className="rounded-xl2 bg-koraal-50 p-3 text-center text-xs font-medium text-koraal-700">
        ⚠️ {foodtruckDisclaimer}
      </p>

      <p className="text-center text-xs text-diepblauw-700/50">{foodtruckVoorbeeldBasis}</p>
    </div>
  );
}
