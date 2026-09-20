"use client";

import { useState } from "react";
import { BackLink } from "@/components/BackLink";
import { PageHeader } from "@/components/PageHeader";
import { easterEggs } from "@/data/fun";

export default function GeheimPagina() {
  const [index, setIndex] = useState(0);

  return (
    <div className="space-y-6">
      <BackLink />
      <PageHeader titel="Geheim paasei gevonden!" ondertitel="Niks hiervan heeft iets met Bonaire te maken" emoji="🥚" />

      <div className="animate-pop-in rounded-xl2 bg-gradient-to-br from-zon-200 via-koraal-200 to-turquoise-200 p-6 text-center shadow-floating">
        <p className="text-4xl" aria-hidden>
          🎉
        </p>
        <p className="mt-2 font-display text-lg font-semibold text-diepblauw-900">
          Goed gezocht — je hebt het verstopte logo-geheimpje ontdekt.
        </p>
      </div>

      <div className="rounded-xl2 bg-white p-5 shadow-card">
        <p className="text-sm leading-relaxed text-diepblauw-800">{easterEggs[index]}</p>
        <button
          type="button"
          onClick={() => setIndex((i) => (i + 1) % easterEggs.length)}
          className="focus-ring mt-4 rounded-full bg-diepblauw-700 px-4 py-2 text-sm font-semibold text-white hover:bg-diepblauw-800"
        >
          Nog eentje
        </button>
      </div>

      <p className="text-center text-xs text-diepblauw-700/50">
        Tik nog een keer 5x snel op het logo bovenin om hier terug te komen.
      </p>
    </div>
  );
}
