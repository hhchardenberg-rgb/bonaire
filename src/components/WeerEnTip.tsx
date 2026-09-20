import { algemeneDagtips, dagtips, typischWeer } from "@/data/dagtips";

export function WeerEnTip({ datum }: { datum?: string }) {
  const tip = (datum && dagtips[datum]) || algemeneDagtips[new Date().getDate() % algemeneDagtips.length];

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-xl2 bg-gradient-to-br from-turquoise-400 to-diepblauw-500 p-4 text-white shadow-card">
        <p className="text-xs font-semibold uppercase tracking-wide text-white/80">Typisch Bonaire-weer</p>
        <p className="mt-1 text-lg font-semibold">{typischWeer.omschrijving}</p>
        <p className="mt-1 text-sm text-white/90">{typischWeer.temperatuurOverdag}</p>
        <p className="mt-2 text-xs text-white/80">{typischWeer.windAdvies}</p>
        <p className="mt-3 text-[11px] italic text-white/70">
          Gemiddeld beeld — check vlak voor vertrek zelf een actuele weersverwachting.
        </p>
      </div>
      <div className="rounded-xl2 bg-zon-100 p-4 shadow-card">
        <p className="text-xs font-semibold uppercase tracking-wide text-zon-800">Dagtip</p>
        <p className="mt-1 text-sm font-medium text-zon-900">{tip}</p>
      </div>
    </div>
  );
}
