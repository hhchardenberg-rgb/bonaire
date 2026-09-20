"use client";

import { useEffect, useState } from "react";

function berekenRest(doelIso: string) {
  const doel = new Date(`${doelIso}T00:00:00`).getTime();
  const nu = Date.now();
  const verschil = Math.max(0, doel - nu);
  const dagen = Math.floor(verschil / (1000 * 60 * 60 * 24));
  const uren = Math.floor((verschil / (1000 * 60 * 60)) % 24);
  const minuten = Math.floor((verschil / (1000 * 60)) % 60);
  const seconden = Math.floor((verschil / 1000) % 60);
  return { dagen, uren, minuten, seconden, klaar: verschil === 0 };
}

export function Countdown({ doelIso, label }: { doelIso: string; label: string }) {
  const [rest, setRest] = useState(() => berekenRest(doelIso));

  useEffect(() => {
    const interval = setInterval(() => setRest(berekenRest(doelIso)), 1000);
    return () => clearInterval(interval);
  }, [doelIso]);

  if (rest.klaar) {
    return (
      <p className="text-center text-lg font-semibold text-koraal-600">
        We zijn onderweg — of al aangekomen! 🌴
      </p>
    );
  }

  const blokken = [
    { waarde: rest.dagen, label: "dagen" },
    { waarde: rest.uren, label: "uur" },
    { waarde: rest.minuten, label: "min" },
    { waarde: rest.seconden, label: "sec" },
  ];

  return (
    <div>
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
