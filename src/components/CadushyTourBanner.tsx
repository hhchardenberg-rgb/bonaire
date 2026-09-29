"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cadushyTourDatum } from "@/data/cadushyTour";

function vandaagLokaalIso(): string {
  const nu = new Date();
  const jaar = nu.getFullYear();
  const maand = String(nu.getMonth() + 1).padStart(2, "0");
  const dag = String(nu.getDate()).padStart(2, "0");
  return `${jaar}-${maand}-${dag}`;
}

export function CadushyTourBanner() {
  // Client-only datumcheck, zelfde hydration-veilige patroon als Countdown:
  // eerste render identiek op server en client, pas na mounten weten we de
  // echte datum van de bezoeker.
  const [vandaag, setVandaag] = useState<string | null>(null);

  useEffect(() => {
    setVandaag(vandaagLokaalIso());
  }, []);

  if (vandaag !== cadushyTourDatum) return null;

  return (
    <Link
      href="/foodtruck-cadushy-ostracods"
      className="focus-ring animate-pop-in block overflow-hidden rounded-xl2 shadow-floating transition hover:-translate-y-0.5"
    >
      <div className="bg-gradient-to-br from-koraal-500 via-koraal-500 to-zon-500 p-4 text-white">
        <p className="text-xs font-bold uppercase tracking-wide text-white/80">Vandaag</p>
        <p className="mt-0.5 flex items-center gap-2 font-display text-lg font-bold">
          <span aria-hidden>🌮🌵✨</span>
          Foodtruck tour, Cadushy & Ostracods
        </p>
        <p className="mt-1.5 text-sm text-white/90">
          Vertrek 14:30 bij Punt Vierkant · 19:00 in het water bij de ostracods
        </p>
        <p className="mt-1 text-xs text-white/70">Bekijk het volledige schema →</p>
      </div>
    </Link>
  );
}
