"use client";

import { useState } from "react";
import { BackLink } from "@/components/BackLink";
import { PageHeader } from "@/components/PageHeader";
import { quizVragen } from "@/data/fun";

export default function QuizPagina() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [antwoord, setAntwoord] = useState<number | null>(null);
  const [klaar, setKlaar] = useState(false);

  const vraag = quizVragen[index];

  function kiesAntwoord(i: number) {
    if (antwoord !== null) return;
    setAntwoord(i);
    if (i === vraag.antwoordIndex) setScore((s) => s + 1);
  }

  function volgende() {
    if (index + 1 >= quizVragen.length) {
      setKlaar(true);
      return;
    }
    setIndex((i) => i + 1);
    setAntwoord(null);
  }

  function opnieuw() {
    setIndex(0);
    setScore(0);
    setAntwoord(null);
    setKlaar(false);
  }

  return (
    <div className="space-y-6">
      <BackLink />
      <PageHeader titel="Bonaire-quiz" ondertitel="Test je eilandkennis" emoji="🧠" />

      {klaar ? (
        <div className="animate-pop-in space-y-4 rounded-xl2 bg-white p-6 text-center shadow-card">
          <p className="text-4xl" aria-hidden>
            🏝️
          </p>
          <p className="font-display text-xl font-bold text-diepblauw-800">
            {score} / {quizVragen.length} goed!
          </p>
          <button
            type="button"
            onClick={opnieuw}
            className="focus-ring rounded-full bg-koraal-500 px-5 py-2.5 font-semibold text-white shadow-card hover:bg-koraal-600"
          >
            Nog een keer
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-xs font-medium text-diepblauw-700/60">
            Vraag {index + 1} van {quizVragen.length} · Score: {score}
          </p>
          <div className="rounded-xl2 bg-white p-4 shadow-card">
            <p className="font-display text-base font-semibold text-diepblauw-800">{vraag.vraag}</p>
            <div className="mt-3 space-y-2">
              {vraag.opties.map((optie, i) => {
                const gekozen = antwoord === i;
                const isGoed = i === vraag.antwoordIndex;
                let stijl = "border-turquoise-100 hover:bg-turquoise-50";
                if (antwoord !== null) {
                  if (isGoed) stijl = "border-turquoise-400 bg-turquoise-100";
                  else if (gekozen) stijl = "border-koraal-300 bg-koraal-50";
                }
                return (
                  <button
                    key={optie}
                    type="button"
                    onClick={() => kiesAntwoord(i)}
                    className={`focus-ring w-full rounded-xl border-2 p-2.5 text-left text-sm text-diepblauw-800 transition ${stijl}`}
                  >
                    {optie}
                  </button>
                );
              })}
            </div>
          </div>
          {antwoord !== null && (
            <button
              type="button"
              onClick={volgende}
              className="focus-ring w-full rounded-xl bg-diepblauw-700 px-4 py-2.5 font-semibold text-white shadow-card hover:bg-diepblauw-800"
            >
              {index + 1 >= quizVragen.length ? "Bekijk score" : "Volgende vraag"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
