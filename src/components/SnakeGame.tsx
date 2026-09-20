"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocalStorage } from "@/lib/useLocalStorage";

type Punt = { x: number; y: number };
type Richting = { dx: number; dy: number };

const COLS = 15;
const ROWS = 15;
const CEL = 28;
const TICK_MS = 160;

const BOVEN: Richting = { dx: 0, dy: -1 };
const ONDER: Richting = { dx: 0, dy: 1 };
const LINKS: Richting = { dx: -1, dy: 0 };
const RECHTS: Richting = { dx: 1, dy: 0 };

const SCHATTEN = ["👑", "💎", "🔮", "🍎", "⭐"];

function startSlang(): Punt[] {
  const midY = Math.floor(ROWS / 2);
  const midX = Math.floor(COLS / 2);
  return [
    { x: midX, y: midY },
    { x: midX - 1, y: midY },
    { x: midX - 2, y: midY },
  ];
}

function nieuwSchat(slang: Punt[]): Punt {
  let plek: Punt;
  do {
    plek = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
  } while (slang.some((s) => s.x === plek.x && s.y === plek.y));
  return plek;
}

export function SnakeGame() {
  const [status, setStatus] = useState<"idle" | "spelen" | "game-over" | "gewonnen">("idle");
  const [score, setScore] = useState(0);
  const { waarde: hoogsteScore, bijwerken: setHoogsteScore } = useLocalStorage(
    "bonaire-snake-highscore",
    0
  );

  const slangRef = useRef<Punt[]>(startSlang());
  const richtingRef = useRef<Richting>(RECHTS);
  const volgendeRichtingRef = useRef<Richting>(RECHTS);
  const schatRef = useRef<Punt>(nieuwSchat(startSlang()));
  const schatEmojiRef = useRef(SCHATTEN[0]);
  const sterrenRef = useRef<Punt[]>(
    Array.from({ length: 40 }, () => ({
      x: Math.random() * COLS * CEL,
      y: Math.random() * ROWS * CEL * 0.7,
    }))
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const reset = useCallback(() => {
    slangRef.current = startSlang();
    richtingRef.current = RECHTS;
    volgendeRichtingRef.current = RECHTS;
    schatRef.current = nieuwSchat(slangRef.current);
    schatEmojiRef.current = SCHATTEN[Math.floor(Math.random() * SCHATTEN.length)];
    setScore(0);
    setStatus("spelen");
  }, []);

  const teken = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const lucht = ctx.createLinearGradient(0, 0, 0, canvas.height);
    lucht.addColorStop(0, "#2a1a4a");
    lucht.addColorStop(1, "#4a2a6a");
    ctx.fillStyle = lucht;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgba(255,255,255,0.8)";
    sterrenRef.current.forEach((s) => {
      ctx.beginPath();
      ctx.arc(s.x, s.y, 1.4, 0, Math.PI * 2);
      ctx.fill();
    });

    // Kasteelsilhouet onderaan, in sprookjesstijl.
    ctx.fillStyle = "#1c1033";
    const grondY = canvas.height - CEL * 1.4;
    ctx.fillRect(0, grondY, canvas.width, canvas.height - grondY);
    const torens = [0.15, 0.4, 0.62, 0.85];
    torens.forEach((f, i) => {
      const tx = canvas.width * f;
      const th = i === 1 ? CEL * 2.6 : CEL * 1.9;
      ctx.fillRect(tx - CEL * 0.35, grondY - th, CEL * 0.7, th);
      ctx.beginPath();
      ctx.moveTo(tx - CEL * 0.45, grondY - th);
      ctx.lineTo(tx, grondY - th - CEL * 0.6);
      ctx.lineTo(tx + CEL * 0.45, grondY - th);
      ctx.closePath();
      ctx.fill();
    });

    // Schat
    ctx.font = `${CEL * 0.8}px system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const schat = schatRef.current;
    ctx.fillText(schatEmojiRef.current, schat.x * CEL + CEL / 2, schat.y * CEL + CEL / 2 + 1);

    // Slang: kop als toverstaf, lijf als glinsterende sterretjes.
    const slang = slangRef.current;
    slang.forEach((segment, i) => {
      const px = segment.x * CEL + CEL / 2;
      const py = segment.y * CEL + CEL / 2;
      ctx.font = `${i === 0 ? CEL * 0.85 : CEL * 0.65}px system-ui, sans-serif`;
      ctx.fillText(i === 0 ? "🪄" : "✨", px, py + 1);
    });
  }, []);

  useEffect(() => {
    teken();
  }, [teken, status]);

  useEffect(() => {
    if (status !== "spelen") return;

    const interval = setInterval(() => {
      richtingRef.current = volgendeRichtingRef.current;
      const slang = slangRef.current;
      const richting = richtingRef.current;
      const kop = slang[0];
      const nieuweKop = { x: kop.x + richting.dx, y: kop.y + richting.dy };

      const buitenRaster =
        nieuweKop.x < 0 || nieuweKop.x >= COLS || nieuweKop.y < 0 || nieuweKop.y >= ROWS;
      const raaktZichzelf = slang.some((s) => s.x === nieuweKop.x && s.y === nieuweKop.y);

      if (buitenRaster || raaktZichzelf) {
        setStatus("game-over");
        return;
      }

      const nieuweSlang = [nieuweKop, ...slang];
      const schat = schatRef.current;
      if (nieuweKop.x === schat.x && nieuweKop.y === schat.y) {
        setScore((s) => s + 1);
        if (nieuweSlang.length >= COLS * ROWS) {
          slangRef.current = nieuweSlang;
          setStatus("gewonnen");
          return;
        }
        schatRef.current = nieuwSchat(nieuweSlang);
        schatEmojiRef.current = SCHATTEN[Math.floor(Math.random() * SCHATTEN.length)];
      } else {
        nieuweSlang.pop();
      }
      slangRef.current = nieuweSlang;

      teken();
    }, TICK_MS);

    return () => clearInterval(interval);
  }, [status, teken]);

  useEffect(() => {
    if (status === "gewonnen" || status === "game-over") {
      setHoogsteScore((h) => Math.max(h, score));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  function magNaar(nieuw: Richting) {
    const huidig = richtingRef.current;
    // Voorkom direct omkeren (dan zou de slang in zichzelf bijten).
    if (nieuw.dx === -huidig.dx && nieuw.dy === -huidig.dy) return;
    volgendeRichtingRef.current = nieuw;
  }

  useEffect(() => {
    function opToets(e: KeyboardEvent) {
      const mapping: Record<string, Richting> = {
        ArrowUp: BOVEN,
        ArrowDown: ONDER,
        ArrowLeft: LINKS,
        ArrowRight: RECHTS,
        w: BOVEN,
        s: ONDER,
        a: LINKS,
        d: RECHTS,
      };
      const richting = mapping[e.key];
      if (richting) {
        e.preventDefault();
        magNaar(richting);
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
    let startY = 0;
    let gesleept = false;

    function opStart(e: TouchEvent) {
      const t = e.touches[0];
      startX = t.clientX;
      startY = t.clientY;
      gesleept = false;
    }

    function opMove(e: TouchEvent) {
      e.preventDefault();
      const t = e.touches[0];
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;
      if (!gesleept && Math.hypot(dx, dy) > MIN_SWIPE) {
        gesleept = true;
        magNaar(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? RECHTS : LINKS) : dy > 0 ? ONDER : BOVEN);
        startX = t.clientX;
        startY = t.clientY;
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
          height={ROWS * CEL}
          className="block w-full select-none"
          style={{ aspectRatio: `${COLS} / ${ROWS}`, touchAction: "none" }}
        />
        {status !== "spelen" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#1c1033]/85 p-4 text-center text-white">
            {status === "idle" && (
              <p className="font-display text-lg font-semibold">
                ✨ Verzamel de schatten met je toverstaf, raak jezelf niet aan!
              </p>
            )}
            {status === "gewonnen" && (
              <p className="font-display text-lg font-semibold">👑 Betoverend! Je hebt het bord gevuld — score: {score}</p>
            )}
            {status === "game-over" && (
              <p className="font-display text-lg font-semibold">💫 Oeps, de betovering is verbroken! Score: {score}</p>
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
        Veeg op het speelveld om de toverstaf te sturen (of gebruik de pijltjestoetsen).
      </p>
    </div>
  );
}
