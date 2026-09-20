import { PageHeader } from "@/components/PageHeader";
import { WeerEnTip } from "@/components/WeerEnTip";
import { VandaagProgramma } from "@/components/VandaagProgramma";
import { trip } from "@/data/trip";
import { getDagprogramma } from "@/data/programma";
import { formatDatumLang, bepaalReisFase, vandaagIso, dagenTussen } from "@/lib/date";

export const metadata = { title: "Vandaag" };

export default function VandaagPagina() {
  const vandaag = vandaagIso();
  const fase = bepaalReisFase(vandaag, trip.startDatum, trip.eindDatum);

  const weergaveDatum = fase === "voor" ? trip.startDatum : fase === "na" ? trip.eindDatum : vandaag;
  const dagprogramma = getDagprogramma(weergaveDatum);
  const activiteiten = dagprogramma?.activiteiten ?? [];
  const belangrijkeTijden = activiteiten.filter((a) => a.tijd && a.tijd !== "hele dag");

  return (
    <div className="space-y-6">
      <PageHeader
        titel={dagprogramma?.titel ?? "Vandaag"}
        ondertitel={formatDatumLang(weergaveDatum)}
        emoji="☀️"
      />

      {fase === "voor" && (
        <p className="rounded-xl2 bg-zon-100 p-3 text-sm text-zon-900">
          Nog {dagenTussen(vandaag, trip.startDatum)} dagen tot vertrek. Hier vast een voorproefje
          van dag 1 van de trip.
        </p>
      )}
      {fase === "na" && (
        <p className="rounded-xl2 bg-diepblauw-100 p-3 text-sm text-diepblauw-800">
          De trip zit erop! Hier nog even een terugblik op de laatste dag. Bekijk de fotomuur voor
          herinneringen.
        </p>
      )}

      <WeerEnTip datum={weergaveDatum} />

      {belangrijkeTijden.length > 0 && (
        <div>
          <h2 className="mb-2 font-display text-sm font-semibold text-diepblauw-700">
            Belangrijke tijden
          </h2>
          <ul className="flex flex-wrap gap-2">
            {belangrijkeTijden.map((a) => (
              <li
                key={a.id}
                className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-diepblauw-800 shadow-sm"
              >
                {a.tijd} · {a.titel}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h2 className="mb-2 font-display text-sm font-semibold text-diepblauw-700">
          Programma van vandaag
        </h2>
        <VandaagProgramma dag={weergaveDatum} activiteiten={activiteiten} />
      </div>
    </div>
  );
}
