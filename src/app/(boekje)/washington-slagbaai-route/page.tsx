import { BackLink } from "@/components/BackLink";
import { PageHeader } from "@/components/PageHeader";
import { korteRouteStops, korteRouteTips, korteRouteWeetjes } from "@/data/washingtonSlagbaai";

export const metadata = { title: "Washington Slagbaai — korte route" };

export default function WashingtonSlagbaaiRoutePagina() {
  return (
    <div className="space-y-6">
      <BackLink href="/programma" label="Programma" />
      <PageHeader
        titel="🌵 Washington Slagbaai"
        ondertitel="De korte (groene) route — ±24 km, reken op ±1,5 uur rijden zonder stops"
        emoji="🗺️"
      />

      <div>
        <h2 className="mb-3 font-display text-sm font-semibold text-diepblauw-700">De route</h2>
        <ol className="space-y-3">
          {korteRouteStops.map((stop, i) => (
            <li key={stop.naam} className="flex gap-3 rounded-xl2 bg-white p-4 shadow-card">
              <span
                className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-turquoise-100 text-xs font-bold text-turquoise-800"
                aria-hidden
              >
                {i + 1}
              </span>
              <div>
                <p className="font-semibold text-diepblauw-800">
                  <span className="mr-1" aria-hidden>
                    {stop.emoji}
                  </span>
                  {stop.naam}
                </p>
                <p className="mt-0.5 text-sm text-diepblauw-700/80">{stop.omschrijving}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div>
        <h2 className="mb-3 font-display text-sm font-semibold text-diepblauw-700">
          Wat mee te nemen
        </h2>
        <ul className="space-y-2.5">
          {korteRouteTips.map((tip) => (
            <li key={tip.titel} className="rounded-xl2 bg-zon-100 p-3.5 text-sm text-zon-900">
              <p className="font-semibold">{tip.titel}</p>
              <p className="mt-0.5">{tip.tekst}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="mb-3 font-display text-sm font-semibold text-diepblauw-700">
          Leuke weetjes over het park
        </h2>
        <ul className="space-y-2">
          {korteRouteWeetjes.map((weetje, i) => (
            <li
              key={i}
              className="rounded-xl2 bg-turquoise-50 p-3.5 text-sm leading-relaxed text-diepblauw-800"
            >
              💡 {weetje}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
