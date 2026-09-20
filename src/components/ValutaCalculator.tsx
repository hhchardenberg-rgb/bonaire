"use client";

import { useState } from "react";

// Vast ingesteld op het gemiddelde van de afgelopen maand (rond half
// augustus – half september 2026), geen live koppeling met een externe
// koers-API. Wil je de koers bijwerken? Pas dan alleen dit getal aan.
const WISSELKOERS_USD_NAAR_EUR = 0.863;

function formatBedrag(n: number): string {
  if (!Number.isFinite(n)) return "";
  return n.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function ValutaCalculator() {
  const [dollar, setDollar] = useState("100");
  const [euro, setEuro] = useState(formatBedrag(100 * WISSELKOERS_USD_NAAR_EUR));

  function opDollarChange(waarde: string) {
    setDollar(waarde);
    const bedrag = parseFloat(waarde.replace(",", "."));
    setEuro(Number.isFinite(bedrag) ? formatBedrag(bedrag * WISSELKOERS_USD_NAAR_EUR) : "");
  }

  function opEuroChange(waarde: string) {
    setEuro(waarde);
    const bedrag = parseFloat(waarde.replace(",", "."));
    setDollar(Number.isFinite(bedrag) ? formatBedrag(bedrag / WISSELKOERS_USD_NAAR_EUR) : "");
  }

  return (
    <div className="rounded-xl2 bg-white p-4 shadow-card">
      <h2 className="font-display text-sm font-semibold text-diepblauw-800">Dollar ↔ euro omrekenen</h2>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-diepblauw-700/70">US dollar</span>
          <div className="flex items-center rounded-xl border-2 border-turquoise-100 px-3 py-2 focus-within:border-turquoise-400">
            <span className="mr-1 text-diepblauw-700/50">$</span>
            <input
              type="text"
              inputMode="decimal"
              value={dollar}
              onChange={(e) => opDollarChange(e.target.value)}
              className="w-full min-w-0 bg-transparent text-sm text-diepblauw-900 outline-none"
            />
          </div>
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-diepblauw-700/70">Euro</span>
          <div className="flex items-center rounded-xl border-2 border-turquoise-100 px-3 py-2 focus-within:border-turquoise-400">
            <span className="mr-1 text-diepblauw-700/50">€</span>
            <input
              type="text"
              inputMode="decimal"
              value={euro}
              onChange={(e) => opEuroChange(e.target.value)}
              className="w-full min-w-0 bg-transparent text-sm text-diepblauw-900 outline-none"
            />
          </div>
        </label>
      </div>

      <p className="mt-3 text-xs text-diepblauw-700/60">
        1 USD = €{formatBedrag(WISSELKOERS_USD_NAAR_EUR)} — vast ingesteld op het gemiddelde van
        de afgelopen maand. Voor de koers van vandaag zelf: check je eigen bank-app.
      </p>
    </div>
  );
}
