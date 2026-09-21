import { PageHeader } from "@/components/PageHeader";
import { MapLinkButton } from "@/components/MapLinkButton";
import { noodcontacten, noodnummers, verliesInstructies } from "@/data/nood";
import { locaties } from "@/data/locaties";
import { trip } from "@/data/trip";

export const metadata = { title: "Nood & hulp" };

export default function NoodPagina() {
  const ziekenhuis = locaties.find((l) => l.id === "hospital");

  return (
    <div className="space-y-6">
      <PageHeader titel="Nood & hulp" emoji="🆘" />

      <section className="rounded-xl2 border-2 border-koraal-300 bg-koraal-50 p-4">
        <h2 className="font-display text-sm font-semibold text-koraal-800">Noodnummers</h2>
        <ul className="mt-2 space-y-1.5">
          {noodnummers.map((n) => (
            <li key={n.label} className="flex items-center justify-between text-sm text-koraal-900">
              <span>{n.label}</span>
              {n.telefoon ? (
                <a href={`tel:${n.telefoon}`} className="font-bold underline">
                  {n.telefoon}
                </a>
              ) : (
                <span className="text-koraal-700/70">nog niet bekend</span>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-2 font-display text-sm font-semibold text-diepblauw-700">Accommodatie</h2>
        <div className="rounded-xl2 bg-white p-4 shadow-card">
          <p className="font-medium text-diepblauw-800">{trip.accommodatie.naam}</p>
          <p className="text-sm text-diepblauw-700/70">{trip.accommodatie.adres}</p>
          <div className="mt-3">
            <MapLinkButton url={trip.accommodatie.kaartUrl} />
          </div>
        </div>
      </section>

      {ziekenhuis && (
        <section>
          <h2 className="mb-2 font-display text-sm font-semibold text-diepblauw-700">
            Dichtstbijzijnde medische hulp
          </h2>
          <div className="rounded-xl2 bg-white p-4 shadow-card">
            <p className="font-medium text-diepblauw-800">{ziekenhuis.naam}</p>
            {ziekenhuis.omschrijving && (
              <p className="text-sm text-diepblauw-700/70">{ziekenhuis.omschrijving}</p>
            )}
            <div className="mt-3">
              <MapLinkButton url={ziekenhuis.kaartUrl} />
            </div>
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-2 font-display text-sm font-semibold text-diepblauw-700">Contactgegevens groep</h2>
        <ul className="space-y-2">
          {noodcontacten.map((c) => (
            <li key={c.naam} className="flex items-center justify-between rounded-xl2 bg-white p-3 shadow-card">
              <div>
                <p className="font-medium text-diepblauw-800">{c.naam}</p>
                <p className="text-xs text-diepblauw-700/60">{c.rol}</p>
              </div>
              {c.telefoon ? (
                <a href={`tel:${c.telefoon}`} className="font-semibold text-turquoise-700 underline">
                  {c.telefoon}
                </a>
              ) : (
                <span className="text-xs text-diepblauw-700/50">nog niet bekend</span>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-2 font-display text-sm font-semibold text-diepblauw-700">
          Kwijt of gestolen?
        </h2>
        <div className="space-y-3">
          {verliesInstructies.map((instructie) => (
            <details key={instructie.titel} className="rounded-xl2 bg-white p-4 shadow-card">
              <summary className="focus-ring cursor-pointer font-medium text-diepblauw-800">
                {instructie.titel}
              </summary>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-diepblauw-700/80">
                {instructie.stappen.map((stap, i) => (
                  <li key={i}>{stap}</li>
                ))}
              </ol>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
