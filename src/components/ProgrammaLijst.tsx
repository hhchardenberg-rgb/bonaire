"use client";

import { useEffect, useState } from "react";
import { ActivityCard } from "./ActivityCard";
import { formatDatumLang } from "@/lib/date";
import type { Dagprogramma } from "@/types";

function vandaagLokaalIso(): string {
  const nu = new Date();
  const jaar = nu.getFullYear();
  const maand = String(nu.getMonth() + 1).padStart(2, "0");
  const dag = String(nu.getDate()).padStart(2, "0");
  return `${jaar}-${maand}-${dag}`;
}

export function ProgrammaLijst({ programma }: { programma: Dagprogramma[] }) {
  // `vandaag` blijft `null` tot na het mounten (client-only), zodat de eerste
  // render op server en client identiek is en er geen hydration-mismatch
  // ontstaat — zelfde patroon als de Countdown-component. Zolang `vandaag`
  // nog niet bekend is, tonen we alle dagen gewoon uitgeklapt (zoals
  // voorheen); zodra bekend is welke dagen al gepasseerd zijn, klappen die
  // vanzelf in.
  const [vandaag, setVandaag] = useState<string | null>(null);
  const [overschreven, setOverschreven] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setVandaag(vandaagLokaalIso());
  }, []);

  function toggleDag(dagId: string, huidigOpen: boolean) {
    setOverschreven((o) => ({ ...o, [dagId]: !huidigOpen }));
  }

  return (
    <ol className="space-y-7">
      {programma.map((dag, index) => {
        const isVerleden = vandaag !== null && dag.dag < vandaag;
        const open = overschreven[dag.dag] ?? !isVerleden;

        return (
          <li key={dag.dag}>
            <button
              type="button"
              onClick={() => toggleDag(dag.dag, open)}
              className="focus-ring mb-2.5 flex w-full items-baseline gap-2 text-left"
              aria-expanded={open}
            >
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-turquoise-500 text-xs font-bold text-white">
                {index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="font-display text-base font-semibold text-diepblauw-800">
                  {dag.titel ?? "Programma"}
                </h2>
                <p className="text-xs text-diepblauw-700/60">
                  {formatDatumLang(dag.dag)}
                  {isVerleden && !open && (
                    <span className="ml-1.5 text-diepblauw-700/40">
                      · {dag.activiteiten.length}{" "}
                      {dag.activiteiten.length === 1 ? "activiteit" : "activiteiten"}
                    </span>
                  )}
                </p>
              </div>
              {isVerleden && (
                <span
                  className={`mt-1 flex-shrink-0 text-diepblauw-400 transition-transform ${open ? "rotate-180" : ""}`}
                  aria-hidden
                >
                  ▾
                </span>
              )}
            </button>

            {open && (
              <ul className="animate-fade-in space-y-3 border-l-2 border-dashed border-turquoise-200 pl-4">
                {dag.activiteiten.map((activiteit) => (
                  <ActivityCard key={activiteit.id} activiteit={activiteit} />
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ol>
  );
}
