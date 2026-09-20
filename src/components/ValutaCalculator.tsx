"use client";

import { useEffect, useState } from "react";
import { useLocalStorage } from "@/lib/useLocalStorage";

interface Koers {
  waarde: number;
  datum: string;
}

function formatBedrag(n: number): string {
  if (!Number.isFinite(n)) return "";
  return n.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function ValutaCalculator() {
  const { waarde: koers, bijwerken: setKoers } = useLocalStorage<Koers | null>("bonaire-wisselkoers", null);
  const [status, setStatus] = useState<"laden" | "klaar" | "fout">("laden");
  const [dollar, setDollar] = useState("100");
  const [euro, setEuro] = useState("");

  useEffect(() => {
    let actief = true;
    fetch("https://api.frankfurter.app/latest?from=USD&to=EUR")
      .then((res) => {
        if (!res.ok) throw new Error("koers ophalen mislukt");
        return res.json();
      })
      .then((data: { date: string; rates: { EUR: number } }) => {
        if (!actief) return;
        setKoers({ waarde: data.rates.EUR, datum: data.date });
        setStatus("klaar");
      })
      .catch(() => {
        if (!actief) return;
        setStatus(koers ? "klaar" : "fout");
      });
    return () => {
      actief = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (koers && dollar !== "") {
      const bedrag = parseFloat(dollar.replace(",", "."));
      setEuro(Number.isFinite(bedrag) ? formatBedrag(bedrag * koers.waarde) : "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [koers]);

  function opDollarChange(waarde: string) {
    setDollar(waarde);
    if (!koers) return;
    const bedrag = parseFloat(waarde.replace(",", "."));
    setEuro(Number.isFinite(bedrag) ? formatBedrag(bedrag * koers.waarde) : "");
  }

  function opEuroChange(waarde: string) {
    setEuro(waarde);
    if (!koers) return;
    const bedrag = parseFloat(waarde.replace(",", "."));
    setDollar(Number.isFinite(bedrag) ? formatBedrag(bedrag / koers.waarde) : "");
  }

  return (
    <div className="rounded-xl2 bg-white p-4 shadow-card">
      <h2 className="font-display text-sm font-semibold text-diepblauw-800">Dollar ↔ euro omrekenen</h2>

      {status === "fout" ? (
        <p className="mt-2 text-sm text-diepblauw-700/70">
          Kon de actuele wisselkoers niet ophalen (bijv. geen internet). Probeer het later nog eens.
        </p>
      ) : (
        <>
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
            {status === "laden" && !koers && "Koers ophalen…"}
            {koers &&
              `1 USD = €${formatBedrag(koers.waarde)} — koers van ${new Date(
                `${koers.datum}T12:00:00`
              ).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" })}`}
          </p>
        </>
      )}
    </div>
  );
}
