"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocalStorage } from "@/lib/useLocalStorage";

type Hokje = "leeg" | "konijn" | "vos";

const AANTAL_HOKJES = 9;
const ROND_SECONDEN = 30;
const MAX_TEGELIJK = 2;
const LEVENSDUUR_MIN = 800;
const LEVENSDUUR_MAX = 1200;
const SPAWN_MIN = 450;
const SPAWN_MAX = 750;
const VOS_KANS = 0.25;

export function KonijnenGame() {
  const [status, setStatus] = useState<"idle" | "spelen" | "afgelopen">("idle");
  const [score, setScore] = useState(0);
  const [hokjes, setHokjes] = useState<Hokje[]>(Array(AANTAL_HOKJES).fill("leeg"));
  const [resterendeTijd, setResterendeTijd] = useState(ROND_SECONDEN);
  const { waarde: hoogsteScore, bijwerken: setHoogsteScore } = useLocalStorage(
    "bonaire-konijnen-highscore",
    0
  );

  const hokjesRef = useRef<Hokje[]>(Array(AANTAL_HOKJES).fill("leeg"));
  const totdatRef = useRef<number[]>(Array(AANTAL_HOKJES).fill(0));
  const volgendeSpawnRef = useRef(0);
  const startTijdRef = useRef(0);
  const scoreRef = useRef(0);
  const statusRef = useRef(status);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  const reset = useCallback(() => {
    hokjesRef.current = Array(AANTAL_HOKJES).fill("leeg");
    totdatRef.current = Array(AANTAL_HOKJES).fill(0);
    volgendeSpawnRef.current = Date.now() + 300;
    startTijdRef.current = Date.now();
    scoreRef.current = 0;
    setHokjes(Array(AANTAL_HOKJES).fill("leeg"));
    setScore(0);
    setResterendeTijd(ROND_SECONDEN);
    setStatus("spelen");
  }, []);

  useEffect(() => {
    if (status !== "spelen") return;

    const interval = setInterval(() => {
      const nu = Date.now();
      let gewijzigd = false;

      for (let i = 0; i < AANTAL_HOKJES; i++) {
        if (totdatRef.current[i] !== 0 && nu >= totdatRef.current[i]) {
          hokjesRef.current[i] = "leeg";
          totdatRef.current[i] = 0;
          gewijzigd = true;
        }
      }

      if (nu >= volgendeSpawnRef.current) {
        const actief = hokjesRef.current.filter((h) => h !== "leeg").length;
        const legeIndices = hokjesRef.current
          .map((h, i) => (h === "leeg" ? i : -1))
          .filter((i) => i !== -1);
        if (actief < MAX_TEGELIJK && legeIndices.length > 0) {
          const idx = legeIndices[Math.floor(Math.random() * legeIndices.length)];
          const soort: Hokje = Math.random() < VOS_KANS ? "vos" : "konijn";
          hokjesRef.current[idx] = soort;
          totdatRef.current[idx] =
            nu + LEVENSDUUR_MIN + Math.random() * (LEVENSDUUR_MAX - LEVENSDUUR_MIN);
          gewijzigd = true;
        }
        volgendeSpawnRef.current = nu + SPAWN_MIN + Math.random() * (SPAWN_MAX - SPAWN_MIN);
      }

      if (gewijzigd) {
        setHokjes([...hokjesRef.current]);
      }

      const verstreken = Math.floor((nu - startTijdRef.current) / 1000);
      const over = Math.max(0, ROND_SECONDEN - verstreken);
      setResterendeTijd(over);
      if (over <= 0) {
        setStatus("afgelopen");
      }
    }, 100);

    return () => clearInterval(interval);
  }, [status]);

  useEffect(() => {
    if (status === "afgelopen") {
      setHoogsteScore((h) => Math.max(h, scoreRef.current));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const tik = useCallback((i: number) => {
    if (statusRef.current !== "spelen") return;
    const soort = hokjesRef.current[i];
    if (soort === "leeg") return;
    hokjesRef.current[i] = "leeg";
    totdatRef.current[i] = 0;
    setHokjes([...hokjesRef.current]);
    if (soort === "konijn") {
      setScore((s) => s + 1);
    } else {
      setScore((s) => Math.max(0, s - 1));
    }
  }, []);

  useEffect(() => {
    function opToets(e: KeyboardEvent) {
      const n = Number(e.key);
      if (n >= 1 && n <= AANTAL_HOKJES) {
        e.preventDefault();
        tik(n - 1);
      }
    }
    window.addEventListener("keydown", opToets);
    return () => window.removeEventListener("keydown", opToets);
  }, [tik]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-diepblauw-800">Score: {score}</span>
        {status === "spelen" ? (
          <span className="text-diepblauw-700/60">Tijd: {resterendeTijd}s</span>
        ) : (
          <span className="text-diepblauw-700/60">Hoogste: {hoogsteScore}</span>
        )}
      </div>

      <div className="relative overflow-hidden rounded-xl2 shadow-card">
        <div className="grid grid-cols-3 gap-2 bg-[#8b5e34] p-3">
          {hokjes.map((hokje, i) => (
            <button
              key={i}
              type="button"
              onClick={() => tik(i)}
              disabled={status !== "spelen"}
              aria-label={
                hokje === "konijn" ? "Konijn — tik snel!" : hokje === "vos" ? "Vos — niet tikken!" : "Leeg hol"
              }
              className="focus-ring flex aspect-square items-center justify-center rounded-full bg-[#3d2a1a] text-3xl shadow-inner transition active:scale-95"
            >
              {hokje === "konijn" && <span aria-hidden>🐰</span>}
              {hokje === "vos" && <span aria-hidden>🦊</span>}
            </button>
          ))}
        </div>

        {status !== "spelen" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-diepblauw-900/80 p-4 text-center text-white">
            {status === "idle" && (
              <p className="font-display text-lg font-semibold">
                🐰 Tik de konijnen weg voordat ze verdwijnen — mis de vos!
              </p>
            )}
            {status === "afgelopen" && (
              <p className="font-display text-lg font-semibold">⏰ Tijd om! Score: {score}</p>
            )}
            <button
              type="button"
              onClick={reset}
              className="focus-ring rounded-full bg-koraal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-card hover:bg-koraal-600"
            >
              {status === "idle" ? "Start" : "Opnieuw"}
            </button>
          </div>
        )}
      </div>

      <p className="text-center text-xs text-diepblauw-700/50">
        Tik op een konijn zodra het verschijnt (of gebruik de cijfertoetsen 1-9). Dertig seconden de tijd!
      </p>
    </div>
  );
}
