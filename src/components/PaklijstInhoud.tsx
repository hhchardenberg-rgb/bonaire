"use client";

import { useState } from "react";
import type { PaklijstCategorie } from "@/types";
import { CheckItem } from "./CheckItem";
import { ProgressBar } from "./ProgressBar";
import { useLocalStorage } from "@/lib/useLocalStorage";

const SLEUTEL = "bonaire-paklijst";

export function PaklijstInhoud({ categorieen }: { categorieen: PaklijstCategorie[] }) {
  const { waarde: afgevinkt, bijwerken, wissen } = useLocalStorage<Record<string, boolean>>(SLEUTEL, {});
  const [bevestigReset, setBevestigReset] = useState(false);

  const alleItems = categorieen.flatMap((c) => c.items);
  const aantalAfgevinkt = alleItems.filter((item) => afgevinkt[item.id]).length;

  return (
    <div className="space-y-6">
      <div className="rounded-xl2 bg-white p-4 shadow-card">
        <ProgressBar voltooid={aantalAfgevinkt} totaal={alleItems.length} />
      </div>

      {categorieen.map((categorie) => (
        <div key={categorie.id}>
          <h2 className="mb-1.5 flex items-center gap-1.5 font-display text-sm font-semibold text-diepblauw-700">
            <span aria-hidden>{categorie.emoji}</span> {categorie.naam}
          </h2>
          <ul className="rounded-xl2 bg-white p-1.5 shadow-card">
            {categorie.items.map((item) => (
              <CheckItem
                key={item.id}
                id={item.id}
                label={item.naam}
                checked={Boolean(afgevinkt[item.id])}
                onChange={(checked) => bijwerken((huidig) => ({ ...huidig, [item.id]: checked }))}
              />
            ))}
          </ul>
        </div>
      ))}

      <div className="pt-2">
        {bevestigReset ? (
          <div className="flex items-center gap-2">
            <p className="text-sm text-diepblauw-700">Hele paklijst resetten?</p>
            <button
              type="button"
              onClick={() => {
                wissen();
                setBevestigReset(false);
              }}
              className="focus-ring rounded-full bg-koraal-500 px-3 py-1.5 text-xs font-semibold text-white"
            >
              Ja, reset
            </button>
            <button
              type="button"
              onClick={() => setBevestigReset(false)}
              className="focus-ring rounded-full bg-zand-100 px-3 py-1.5 text-xs font-semibold text-diepblauw-700"
            >
              Annuleren
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setBevestigReset(true)}
            className="focus-ring text-sm font-medium text-diepblauw-700/60 underline hover:text-koraal-600"
          >
            Paklijst resetten
          </button>
        )}
      </div>
    </div>
  );
}
