"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocalStorage } from "@/lib/useLocalStorage";

type Soort = "kruimel" | "kat" | "bal" | "bezem";

interface Item {
  id: number;
  lane: number;
  y: number;
  soort: Soort;
}

const COLS = 5;
const CEL = 64;
const HOOGTE = 480;
const TICK_MS = 30;
const VAL_SNELHEID = 3.2;
const PIGEON_Y = HOOGTE - 70;
const RAAK_AFSTAND = 26;

const OBSTAKELS: Soort[] = ["kat", "bal", "bezem"];
const EMOJI: Record<Soort, string> = {
  kruimel: "🍞",
  kat: "🐈",
  bal: "⚽",
  bezem: "🧹",
};

let volgendId = 0;

function nieuwItem(): Item {
  const isObstakel = Math.random() < 0.28;
  const soort: Soort = isObstakel
    ? OBSTAKELS[Math.floor(Math.random() * OBSTAKELS.length)]
    : "kruimel";
  return { id: volgendId++, lane: Math.floor(Math.random() * COLS), y: -20, soort };
}

export function DuivenGame() {
  const [status, setStatus] = useState<"idle" | "spelen" | "game-over">("idle");
  const [score, setScore] = useState(0);
  const { waarde: hoogsteScore, bijwerken: setHoogsteScore } = useLocalStorage(
    "bonaire-duiven-highscore",
    0
  );

  const laneRef = useRef(Math.floor(COLS / 2));
  const itemsRef = useRef<Item[]>([]);
  const tikTellerRef = useRef(0);
  const snelheidRef = useRef(VAL_SNELHEID);
  const scoreRef = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  const reset = useCallback(() => {
    laneRef.current = Math.floor(COLS / 2);
    itemsRef.current = [];
    tikTellerRef.current = 0;
    snelheidRef.current = VAL_SNELHEID;
    scoreRef.current = 0;
    setScore(0);
    setStatus("spelen");
  }, []);

  const teken = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const lucht = ctx.createLinearGradient(0, 0, 0, canvas.height);
    lucht.addColorStop(0, "#8ecbe8");
    lucht.addColorStop(1, "#d9f0e0");
    ctx.fillStyle = lucht;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = "36px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("☀️", canvas.width - 36, 36);

    const grondY = canvas.height - 40;
    ctx.fillStyle = "#c9b79c";
    ctx.fillRect(0, grondY, canvas.width, canvas.height - grondY);
    ctx.strokeStyle = "rgba(0,0,0,0.08)";
    for (let x = 0; x <= canvas.width; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, grondY);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    ctx.strokeStyle = "rgba(255,255,255,0.35)";
    for (let i = 1; i < COLS; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CEL, 0);
      ctx.lineTo(i * CEL, grondY);
      ctx.stroke();
    }

    ctx.font = "28px system-ui, sans-serif";
    for (const item of itemsRef.current) {
      ctx.fillText(EMOJI[item.soort], item.lane * CEL + CEL / 2, item.y);
    }

    ctx.font = "34px system-ui, sans-serif";
    ctx.fillText("🐦", laneRef.current * CEL + CEL / 2, PIGEON_Y);
  }, []);

  useEffect(() => {
    teken();
  }, [teken, status]);

  useEffect(() => {
    if (status !== "spelen") return;

    const interval = setInterval(() => {
      tikTellerRef.current += 1;

      const spawnInterval = Math.max(18, 34 - Math.floor(scoreRef.current / 5));
      if (tikTellerRef.current % spawnInterval === 0) {
        itemsRef.current.push(nieuwItem());
      }

      snelheidRef.current = VAL_SNELHEID + Math.min(scoreRef.current, 30) * 0.05;

      const overgebleven: Item[] = [];
      let geraakt = false;
      let gescoord = 0;

      for (const item of itemsRef.current) {
        const nieuweY = item.y + snelheidRef.current;
        const opHoogtePigeon = Math.abs(nieuweY - PIGEON_Y) < RAAK_AFSTAND;
        const zelfdeLaan = item.lane === laneRef.current;

        if (opHoogtePigeon && zelfdeLaan) {
          if (item.soort === "kruimel") {
            gescoord += 1;
            continue;
          }
          geraakt = true;
          continue;
        }

        if (nieuweY > HOOGTE + 20) continue;
        overgebleven.push({ ...item, y: nieuweY });
      }
      itemsRef.current = overgebleven;

      if (gescoord > 0) {
        setScore((s) => s + gescoord);
      }

      if (geraakt) {
        setStatus("game-over");
        return;
      }

      teken();
    }, TICK_MS);

    return () => clearInterval(interval);
  }, [status, teken]);

  useEffect(() => {
    if (status === "game-over") {
      setHoogsteScore((h) => Math.max(h, scoreRef.current));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  function magNaar(dLane: number) {
    laneRef.current = Math.min(COLS - 1, Math.max(0, laneRef.current + dLane));
  }

  useEffect(() => {
    function opToets(e: KeyboardEvent) {
      if (e.key === "ArrowLeft" || e.key === "a") {
        e.preventDefault();
        magNaar(-1);
      } else if (e.key === "ArrowRight" || e.key === "d") {
        e.preventDefault();
        magNaar(1);
      }
    }
    window.addEventListener("keydown", opToets);
    return () => window.removeEventListener("keydown", opToets);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const MIN_SWIPE = 18;
    let startX = 0;
    let gesleept = false;

    function opStart(e: TouchEvent) {
      startX = e.touches[0].clientX;
      gesleept = false;
    }

    function opMove(e: TouchEvent) {
      e.preventDefault();
      const t = e.touches[0];
      const dx = t.clientX - startX;
      if (!gesleept && Math.abs(dx) > MIN_SWIPE) {
        gesleept = true;
        magNaar(dx > 0 ? 1 : -1);
        startX = t.clientX;
      }
    }

    canvas.addEventListener("touchstart", opStart, { passive: true });
    canvas.addEventListener("touchmove", opMove, { passive: false });
    return () => {
      canvas.removeEventListener("touchstart", opStart);
      canvas.removeEventListener("touchmove", opMove);
    };
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-diepblauw-800">Score: {score}</span>
        <span className="text-diepblauw-700/60">Hoogste: {hoogsteScore}</span>
      </div>

      <div className="relative overflow-hidden rounded-xl2 shadow-card">
        <canvas
          ref={canvasRef}
          width={COLS * CEL}
          height={HOOGTE}
          className="block w-full select-none"
          style={{ aspectRatio: `${COLS * CEL} / ${HOOGTE}`, touchAction: "none" }}
        />
        {status !== "spelen" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-diepblauw-900/80 p-4 text-center text-white">
            {status === "idle" && (
              <p className="font-display text-lg font-semibold">
                🍞 Vang de broodkruimels, ontwijk de kat, bal en bezem!
              </p>
            )}
            {status === "game-over" && (
              <p className="font-display text-lg font-semibold">💥 Geraakt! Score: {score}</p>
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
        Veeg links/rechts om de duif te sturen (of gebruik de pijltjestoetsen).
      </p>
    </div>
  );
}
