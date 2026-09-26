"use client";

import { useEffect, useState } from "react";

function berekenRest(doelIso: string) {
  const doel = new Date(doelIso.includes("T") ? doelIso : `${doelIso}T00:00:00`).getTime();
  const nu = Date.now();
  const verschil = Math.max(0, doel - nu);
  const dagen = Math.floor(verschil / (1000 * 60 * 60 * 24));
  const uren = Math.floor((verschil / (1000 * 60 * 60)) % 24);
  const minuten = Math.floor((verschil / (1000 * 60)) % 60);
  const seconden = Math.floor((verschil / 1000) % 60);
  return { dagen, uren, minuten, seconden, klaar: verschil === 0 };
}

const LABELS = ["dagen", "uur", "min", "sec"];

export function Countdown({ doelIso, label }: { doelIso: string; label: string }) {
  // Start als `null`: de precieze telling hangt af van Date.now(), wat op de
  // server (buildtijd) en de client (laadtijd) net anders uitvalt. Door pas
  // na het mounten (client-only) te berekenen, blijft de eerste render op
  // server en client identiek en ontstaat er geen hydration-mismatch.
  const [rest, setRest] = useState<ReturnType<typeof berekenRest> | null>(null);

  useEffect(() => {
    setRest(berekenRest(doelIso));
    const interval = setInterval(() => setRest(berekenRest(doelIso)), 1000);
    return () => clearInterval(interval);
  }, [doelIso]);

  if (rest?.klaar) {
    return null;
  }

  const blokken = rest
    ? [
        { waarde: rest.dagen, label: "dagen" },
        { waarde: rest.uren, label: "uur" },
        { waarde: rest.minuten, label: "min" },
        { waarde: rest.seconden, label: "sec" },
      ]
    : LABELS.map((l) => ({ waarde: "–" as const, label: l }));

  return (
    <div className="rounded-xl2 bg-white p-4 shadow-card">
      <p className="mb-2 text-center text-xs font-medium uppercase tracking-wide text-diepblauw-700/60">
        {label}
      </p>
      <div className="grid grid-cols-4 gap-2" role="timer" aria-live="off">
        {blokken.map((blok) => (
          <div
            key={blok.label}
            className="rounded-xl2 bg-white/80 px-1 py-3 text-center shadow-card"
          >
            <div className="font-display text-2xl font-bold tabular-nums text-turquoise-700">
              {blok.waarde}
            </div>
            <div className="text-[11px] text-diepblauw-700/60">{blok.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
