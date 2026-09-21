import { PageHeader } from "@/components/PageHeader";
import { MapLinkButton } from "@/components/MapLinkButton";
import { locaties, locatieTypeLabels } from "@/data/locaties";
import type { LocatieType } from "@/types";

export const metadata = { title: "Kaart" };

const volgorde: LocatieType[] = [
  "accommodatie",
  "luchthaven",
  "strand",
  "activiteit",
  "boodschappen",
  "medisch",
  "bezienswaardigheid",
];

export default function KaartPagina() {
  return (
    <div className="space-y-6">
      <PageHeader
        titel="Kaart"
        ondertitel="Belangrijke plekken, open ze direct in je kaart-app"
        emoji="📍"
      />

      <p className="rounded-xl2 bg-turquoise-50 p-3 text-sm text-diepblauw-800">
        Geen ingebedde kaart hier — dat scheelt tracking en laadtijd. Tik op een plek om
        &rsquo;m te openen in de kaart-app van je telefoon.
      </p>

      <div className="space-y-6">
        {volgorde.map((type) => {
          const items = locaties.filter((l) => l.type === type);
          if (items.length === 0) return null;
          const info = locatieTypeLabels[type];
          return (
            <div key={type}>
              <h2 className="mb-2 flex items-center gap-1.5 font-display text-sm font-semibold text-diepblauw-700">
                <span aria-hidden>{info.emoji}</span> {info.label}
              </h2>
              <ul className="space-y-2">
                {items.map((locatie) => (
                  <li
                    key={locatie.id}
                    className="flex items-center justify-between gap-3 rounded-xl2 bg-white p-3 shadow-card"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium text-diepblauw-800">{locatie.naam}</p>
                      {locatie.omschrijving && (
                        <p className="truncate text-xs text-diepblauw-700/60">{locatie.omschrijving}</p>
                      )}
                    </div>
                    <MapLinkButton url={locatie.kaartUrl} label="Open" />
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
