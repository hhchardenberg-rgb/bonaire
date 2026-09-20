"use client";

import { useState } from "react";
import { BackLink } from "@/components/BackLink";
import { PageHeader } from "@/components/PageHeader";
import { groepsleden } from "@/data/taken";

export default function KiezerPagina() {
  const [gekozen, setGekozen] = useState<string | null>(null);
  const [aanHetKiezen, setAanHetKiezen] = useState(false);

  function kies() {
    setAanHetKiezen(true);
    setGekozen(null);
    let tellingen = 0;
    const interval = setInterval(() => {
      setGekozen(groepsleden[Math.floor(Math.random() * groepsleden.length)]);
      tellingen += 1;
      if (tellingen > 12) {
        clearInterval(interval);
        setAanHetKiezen(false);
      }
    }, 90);
  }

  return (
    <div className="space-y-6">
      <BackLink />
      <PageHeader titel="Wie kiest vandaag?" ondertitel="Laat het lot beslissen" emoji="🎲" />

      <div className="flex flex-col items-center gap-5 rounded-xl2 bg-white p-8 shadow-card">
        <div
          className={`flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-turquoise-400 to-koraal-400 text-center font-display text-lg font-bold text-white shadow-floating ${
            aanHetKiezen ? "animate-pulse" : "animate-pop-in"
          }`}
        >
          {gekozen ?? "?"}
        </div>
        <button
          type="button"
          onClick={kies}
          className="focus-ring rounded-full bg-koraal-500 px-6 py-3 font-semibold text-white shadow-card transition hover:bg-koraal-600 active:scale-95"
        >
          {gekozen ? "Nog een keer" : "Kies!"}
        </button>
      </div>
    </div>
  );
}
