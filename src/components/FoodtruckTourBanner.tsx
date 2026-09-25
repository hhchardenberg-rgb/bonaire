"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { foodtruckTourDatum } from "@/data/foodtruckRoute";

function vandaagLokaalIso(): string {
  const nu = new Date();
  const jaar = nu.getFullYear();
  const maand = String(nu.getMonth() + 1).padStart(2, "0");
  const dag = String(nu.getDate()).padStart(2, "0");
  return `${jaar}-${maand}-${dag}`;
}

export function FoodtruckTourBanner() {
  // Start als `null`: de datumcheck hangt af van de lokale klok van de
  // bezoeker, die op server en client kan verschillen. Pas na het mounten
  // (client-only) checken voorkomt een hydration-mismatch — zelfde patroon
  // als de Countdown-component.
  const [vandaag, setVandaag] = useState<string | null>(null);

  useEffect(() => {
    setVandaag(vandaagLokaalIso());
  }, []);

  if (vandaag !== foodtruckTourDatum) return null;

  return (
    <Link
      href="/foodtruck-tour"
      className="focus-ring animate-pop-in flex items-center gap-3 rounded-xl2 bg-gradient-to-r from-koraal-500 to-zon-500 p-3.5 text-white shadow-floating transition hover:-translate-y-0.5"
    >
      <span className="text-2xl" aria-hidden>
        🌮
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-display text-sm font-bold">Vandaag: Foodtruckfestival!</p>
        <p className="text-xs text-white/90">Bekijk de route langs de lekkerste trucks →</p>
      </div>
    </Link>
  );
}
