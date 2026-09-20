"use client";

import { useEffect, useRef, useState } from "react";
import { useLocalStorage } from "@/lib/useLocalStorage";

const AANTAL_CELLEN = 9;
const BURGER_EMOJI = "🧍";
const BOEF_POOL = ["🥷", "🦹", "🎭", "🐺", "👻", "🃏"];
const MAX_FOUTEN = 3;
const TIJD_START_MS = 3000;
const TIJD_MIN_MS = 1200;
const TIJD_STAP_MS = 150;
const FEEDBACK_PAUZE_MS = 550;

export function MisdaadGame() {
  const [status, setStatus] = useState<"idle" | "spelen" | "afgelopen">("idle");
  const [score, setScore] = useState(0);
  const [ronde, setRonde] = useState(1);
  const [fouten, setFouten] = useState(0);
  const [cellen, setCellen] = useState<string[]>(Array(AANTAL_CELLEN).fill(BURGER_EMOJI));
  const [boefIndex, setBoefIndex] = useState(0);
  const [feedback, setFeedback] = useState<"goed" | "fout" | null>(null);
  const [tijdslimiet, setTijdslimiet] = useState(TIJD_START_MS);
  const [roundKey, setRoundKey] = useState(0);
  const { waarde: hoogsteScore, bijwerken: setHoogsteScore } = useLocalStorage(
    "bonaire-misdaad-highscore",
    0
  );

  const scoreRef = useRef(0);
  const rondeRef = useRef(1);
  const foutenRef = useRef(0);
  const boefIndexRef = useRef(0);
  const rondeIdRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const feedbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const el = barRef.current;
    if (!el || status !== "spelen") return;
    el.style.transition = "none";
    el.style.width = "100%";
    void el.offsetWidth;
    el.style.transition = `width ${tijdslimiet}ms linear`;
    el.style.width = "0%";
  }, [roundKey, tijdslimiet, status]);

  function nieuweRonde() {
    rondeIdRef.current += 1;
    const mijnId = rondeIdRef.current;
    const idx = Math.floor(Math.random() * AANTAL_CELLEN);
    const emoji = BOEF_POOL[Math.floor(Math.random() * BOEF_POOL.length)];
    const nieuweCellen = Array.from({ length: AANTAL_CELLEN }, (_, i) => (i === idx ? emoji : BURGER_EMOJI));

    boefIndexRef.current = idx;
    setBoefIndex(idx);
    setCellen(nieuweCellen);
    setFeedback(null);

    const duur = Math.max(TIJD_MIN_MS, TIJD_START_MS - (rondeRef.current - 1) * TIJD_STAP_MS);
    setTijdslimiet(duur);
    setRoundKey((k) => k + 1);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (rondeIdRef.current !== mijnId) return;
      verwerkResultaat(false);
    }, duur);
  }

  function start() {
    scoreRef.current = 0;
    rondeRef.current = 1;
    foutenRef.current = 0;
    setScore(0);
    setRonde(1);
    setFouten(0);
    setStatus("spelen");
    nieuweRonde();
  }

  function verwerkResultaat(juist: boolean) {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (juist) {
      scoreRef.current += 1;
      rondeRef.current += 1;
      setScore(scoreRef.current);
      setRonde(rondeRef.current);
      setHoogsteScore((h) => Math.max(h, scoreRef.current));
      setFeedback("goed");
    } else {
      foutenRef.current += 1;
      setFouten(foutenRef.current);
      setFeedback("fout");
    }

    feedbackTimeoutRef.current = setTimeout(() => {
      if (foutenRef.current >= MAX_FOUTEN) {
        setStatus("afgelopen");
      } else {
        nieuweRonde();
      }
    }, FEEDBACK_PAUZE_MS);
  }

  function tikCel(i: number) {
    if (status !== "spelen" || feedback !== null) return;
    verwerkResultaat(i === boefIndexRef.current);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-diepblauw-800">Score: {score}</span>
        {status === "spelen" ? (
          <span className="text-diepblauw-700/60">
            Ronde {ronde} ·{" "}
            {Array.from({ length: MAX_FOUTEN }, (_, i) => (i < MAX_FOUTEN - fouten ? "❤️" : "🤍")).join("")}
          </span>
        ) : (
          <span className="text-diepblauw-700/60">Hoogste: {hoogsteScore}</span>
        )}
      </div>

      <div className="relative overflow-hidden rounded-xl2 bg-diepblauw-900 p-4 text-white shadow-card">
        {status === "spelen" && (
          <div className="space-y-3">
            <p className="text-center text-sm font-medium text-white/80">
              🚨 Tik zo snel mogelijk op de boef die zich verstopt tussen de burgers!
            </p>

            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <div ref={barRef} className="h-full bg-koraal-400" />
            </div>

            <div className="grid grid-cols-3 gap-2">
              {cellen.map((emoji, i) => {
                const isBoef = i === boefIndex;
                const toonUitkomst = feedback !== null && isBoef;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => tikCel(i)}
                    disabled={feedback !== null}
                    className={`focus-ring flex aspect-square items-center justify-center rounded-xl text-3xl transition ${
                      toonUitkomst
                        ? feedback === "goed"
                          ? "bg-turquoise-500/80"
                          : "bg-koraal-500/80"
                        : "bg-white/10 hover:bg-white/20"
                    }`}
                  >
                    <span aria-hidden>{emoji}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {status !== "spelen" && (
          <div className="flex min-h-[22rem] flex-col items-center justify-center gap-3 p-4 text-center">
            {status === "idle" && (
              <p className="font-display text-lg font-semibold">
                🕵️ Spot de boef tussen de burgers voor de tijd om is!
              </p>
            )}
            {status === "afgelopen" && (
              <p className="font-display text-lg font-semibold">
                🚔 Zaak gesloten na {ronde - 1} gevangen boef{ronde - 1 === 1 ? "" : "en"}. Score: {score}
              </p>
            )}
            <button
              type="button"
              onClick={start}
              className="focus-ring rounded-full bg-koraal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-card hover:bg-koraal-600"
            >
              {status === "idle" ? "Start" : "Opnieuw"}
            </button>
          </div>
        )}
      </div>

      <p className="text-center text-xs text-diepblauw-700/50">
        Eén verdachte emoji verstopt zich tussen de burgers — tik hem aan voor de tijd om is. Drie keer mis en de zaak is gesloten.
      </p>
    </div>
  );
}
