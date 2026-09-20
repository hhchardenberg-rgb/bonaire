import { PageHeader } from "@/components/PageHeader";
import { ActivityCard } from "@/components/ActivityCard";
import { programma } from "@/data/programma";
import { formatDatumLang } from "@/lib/date";

export const metadata = { title: "Programma" };

export default function ProgrammaPagina() {
  return (
    <div className="space-y-6">
      <PageHeader
        titel="Programma"
        ondertitel="De hele reisplanning, dag voor dag"
        emoji="🗓️"
      />

      <ol className="space-y-7">
        {programma.map((dag, index) => (
          <li key={dag.dag}>
            <div className="mb-2.5 flex items-baseline gap-2">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-turquoise-500 text-xs font-bold text-white">
                {index + 1}
              </span>
              <div>
                <h2 className="font-display text-base font-semibold text-diepblauw-800">
                  {dag.titel ?? "Programma"}
                </h2>
                <p className="text-xs text-diepblauw-700/60">{formatDatumLang(dag.dag)}</p>
              </div>
            </div>
            <ul className="space-y-3 border-l-2 border-dashed border-turquoise-200 pl-4">
              {dag.activiteiten.map((activiteit) => (
                <ActivityCard key={activiteit.id} activiteit={activiteit} />
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
