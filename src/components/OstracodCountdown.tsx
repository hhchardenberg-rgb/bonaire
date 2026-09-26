"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

function berekenRest(doelIso: string) {
  const doel = new Date(doelIso).getTime();
  const nu = Date.now();
  const verschil = Math.max(0, doel - nu);
  const dagen = Math.floor(verschil / (1000 * 60 * 60 * 24));
  const uren = Math.floor((verschil / (1000 * 60 * 60)) % 24);
  const minuten = Math.floor((verschil / (1000 * 60)) % 60);
  const seconden = Math.floor((verschil / 1000) % 60);
  return { dagen, uren, minuten, seconden, klaar: verschil === 0 };
}

const SPARKLES = [
  { left: "8%", top: "20%", delay: "0s" },
  { left: "22%", top: "60%", delay: "0.5s" },
  { left: "78%", top: "24%", delay: "1s" },
  { left: "90%", top: "62%", delay: "0.3s" },
  { left: "48%", top: "12%", delay: "0.8s" },
];

export function OstracodCountdown({ doelIso }: { doelIso: string }) {
  // Zelfde hydration-veilige patroon als Countdown: pas na het mounten
  // (client-only) berekenen, anders verschilt server- en clienttijd.
  const [rest, setRest] = useState<ReturnType<typeof berekenRest> | null>(null);

  useEffect(() => {
    setRest(berekenRest(doelIso));
    const interval = setInterval(() => setRest(berekenRest(doelIso)), 1000);
    return () => clearInterval(interval);
  }, [doelIso]);

  const blokken = rest
    ? [
        { waarde: rest.dagen, label: "dagen" },
        { waarde: rest.uren, label: "uur" },
        { waarde: rest.minuten, label: "min" },
        { waarde: rest.seconden, label: "sec" },
      ]
    : ["dagen", "uur", "min", "sec"].map((l) => ({ waarde: "–" as const, label: l }));

  return (
    <Link
      href="/ostracod-night"
      className="focus-ring block overflow-hidden rounded-xl2 shadow-card transition hover:-translate-y-0.5"
    >
      <div
        className="relative px-4 pb-4 pt-3"
        style={{
          background: "linear-gradient(160deg, #0f3d63 0%, #0a2847 55%, #071b30 100%)",
        }}
      >
        {SPARKLES.map((s, i) => (
          <span
            key={i}
            className="absolute animate-pulse text-sm"
            style={{ left: s.left, top: s.top, animationDelay: s.delay }}
            aria-hidden
          >
            ✨
          </span>
        ))}

        <p className="relative mb-2 text-center text-xs font-medium uppercase tracking-wide text-white/70">
          🌙 Nog tot Ostracod Night ✨
        </p>

        {rest?.klaar ? (
          <p className="relative text-center text-sm font-semibold text-turquoise-200">
            Het is zover — tijd om de lichtjes te gaan zoeken! ✨
          </p>
        ) : (
          <div className="relative grid grid-cols-4 gap-2" role="timer" aria-live="off">
            {blokken.map((blok) => (
              <div
                key={blok.label}
                className="rounded-xl bg-white/10 px-1 py-2.5 text-center backdrop-blur-sm"
              >
                <div className="font-display text-xl font-bold tabular-nums text-white">
                  {blok.waarde}
                </div>
                <div className="text-[10px] text-white/60">{blok.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
