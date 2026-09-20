"use client";

import type { GidsItem } from "@/types";
import { MapLinkButton } from "./MapLinkButton";

export function GuideCard({
  item,
  favoriet,
  onToggleFavoriet,
}: {
  item: GidsItem;
  favoriet?: boolean;
  onToggleFavoriet?: () => void;
}) {
  return (
    <li className="list-none rounded-xl2 border border-turquoise-100 bg-white p-4 shadow-card">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display text-base font-semibold text-diepblauw-800">{item.naam}</h3>
        {onToggleFavoriet && (
          <button
            type="button"
            onClick={onToggleFavoriet}
            aria-pressed={favoriet}
            aria-label={favoriet ? "Verwijder uit favorieten" : "Voeg toe aan favorieten"}
            className="focus-ring -mt-1 -mr-1 rounded-full p-1.5 text-xl transition hover:scale-110"
          >
            {favoriet ? "⭐" : "☆"}
          </button>
        )}
      </div>
      <p className="mt-1 text-sm text-diepblauw-700/80">{item.omschrijving}</p>
      <p className="mt-1.5 text-xs text-diepblauw-700/60">{item.locatie}</p>

      <dl className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-diepblauw-700/70">
        {item.prijsindicatie && (
          <div>
            <dt className="inline font-semibold">Prijs: </dt>
            <dd className="inline">{item.prijsindicatie}</dd>
          </div>
        )}
        {item.openingstijden && (
          <div>
            <dt className="inline font-semibold">Open: </dt>
            <dd className="inline">{item.openingstijden}</dd>
          </div>
        )}
      </dl>

      {item.tags.length > 0 && (
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-zon-100 px-2 py-0.5 text-[11px] font-medium text-zon-800"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-3">
        <MapLinkButton url={item.kaartUrl} />
      </div>
    </li>
  );
}
