"use client";

import { useState } from "react";
import type { Activiteit } from "@/types";
import { StatusBadge } from "./StatusBadge";
import { MapLinkButton } from "./MapLinkButton";

export function ActivityCard({
  activiteit,
  afgevinkt,
  onToggleAfgevinkt,
}: {
  activiteit: Activiteit;
  afgevinkt?: boolean;
  onToggleAfgevinkt?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const heeftDetails = Boolean(
    activiteit.omschrijving || activiteit.praktisch || activiteit.contact || activiteit.kaartUrl
  );

  return (
    <li className="animate-fade-in list-none rounded-xl2 border border-turquoise-100 bg-white p-4 shadow-card">
      <div className="flex items-start gap-3">
        {onToggleAfgevinkt && (
          <button
            type="button"
            onClick={onToggleAfgevinkt}
            aria-pressed={afgevinkt}
            aria-label={afgevinkt ? "Markeer als niet gedaan" : "Markeer als gedaan"}
            className="focus-ring mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 border-turquoise-300 text-sm transition data-[on=true]:border-turquoise-500 data-[on=true]:bg-turquoise-500 data-[on=true]:text-white"
            data-on={afgevinkt}
          >
            {afgevinkt ? "✓" : ""}
          </button>
        )}
        <span className="mt-0.5 text-2xl leading-none" aria-hidden>
          {activiteit.fotoEmoji ?? "📌"}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className={`font-display text-base font-semibold text-diepblauw-800 ${
                afgevinkt ? "text-diepblauw-400 line-through" : ""
              }`}
            >
              {activiteit.titel}
            </h3>
            <StatusBadge status={activiteit.status} />
          </div>
          <p className="mt-0.5 text-sm text-diepblauw-700/70">
            {activiteit.tijd && <span className="font-medium">{activiteit.tijd}</span>}
            {activiteit.tijd && activiteit.eindtijd && <span> – {activiteit.eindtijd}</span>}
            {activiteit.locatie && <span> · {activiteit.locatie}</span>}
          </p>

          {heeftDetails && (
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="focus-ring mt-2 text-sm font-medium text-turquoise-700 underline decoration-turquoise-300 underline-offset-2 hover:text-turquoise-800"
              aria-expanded={open}
            >
              {open ? "Minder details" : "Meer details"}
            </button>
          )}

          {open && (
            <div className="mt-2 space-y-1.5 rounded-xl bg-zand-50 p-3 text-sm text-diepblauw-800">
              {activiteit.omschrijving && <p>{activiteit.omschrijving}</p>}
              {activiteit.praktisch && (
                <p className="text-diepblauw-700/80">
                  <span className="font-semibold">Praktisch: </span>
                  {activiteit.praktisch}
                </p>
              )}
              {activiteit.contact && (
                <p className="text-diepblauw-700/80">
                  <span className="font-semibold">Contact: </span>
                  {activiteit.contact}
                </p>
              )}
              {activiteit.kaartUrl && (
                <div className="pt-1">
                  <MapLinkButton url={activiteit.kaartUrl} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
