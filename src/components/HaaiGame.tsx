"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { haaiMaze, HAAI_COLS, HAAI_ROWS } from "@/data/haaiMaze";
import { useLocalStorage } from "@/lib/useLocalStorage";

type Rooster = string[][];
type Richting = { dx: number; dy: number };
type Positie = { x: number; y: number };

const CEL = 32;
const TICK_MS = 220;
const RICHTINGEN: Record<string, Richting> = {
  boven: { dx: 0, dy: -1 },
  onder: { dx: 0, dy: 1 },
  links: { dx: -1, dy: 0 },
  rechts: { dx: 1, dy: 0 },
};

function maakRooster(): Rooster {
  return haaiMaze.map((rij) => rij.split(""));
}

function vindSymbool(symbool: string): Positie {
  for (let y = 0; y < haaiMaze.length; y++) {
    const x = haaiMaze[y].indexOf(symbool);
    if (x !== -1) return { x, y };
  }
  return { x: 1, y: 1 };
}

function isMuur(rooster: Rooster, x: number, y: number): boolean {
  if (y < 0 || y >= HAAI_ROWS || x < 0 || x >= HAAI_COLS) return true;
  return rooster[y][x] === "#";
}

function kortstePad(rooster: Rooster, van: Positie, naar: Positie): Positie | null {
  const sleutel = (p: Positie) => `${p.x},${p.y}`;
  const bezocht = new Set<string>([sleutel(van)]);
  const queue: { pos: Positie; eerste: Positie | null }[] = [{ pos: van, eerste: null }];
  while (queue.length > 0) {
    const { pos, eerste } = queue.shift()!;
    if (pos.x === naar.x && pos.y === naar.y) return eerste ?? pos;
    for (const richting of Object.values(RICHTINGEN)) {
      const volgende = { x: pos.x + richting.dx, y: pos.y + richting.dy };
      if (isMuur(rooster, volgende.x, volgende.y)) continue;
      const key = sleutel(volgende);
      if (bezocht.has(key)) continue;
      bezocht.add(key);
      queue.push({ pos: volgende, eerste: eerste ?? volgende });
    }
  }
  return null;
}

function telEetbaar(rooster: Rooster): number {
  let aantal = 0;
  for (const rij of rooster) {
    for (const cel of rij) {
      if (cel === "." || cel === "o") aantal += 1;
    }
  }
  return aantal;
}

export function HaaiGame() {
  const [status, setStatus] = useState<"idle" | "spelen" | "gewonnen" | "game-over">("idle");
  const [score, setScore] = useState(0);
  const { waarde: hoogsteScore, bijwerken: setHoogsteScore } = useLocalStorage("bonaire-haai-highscore", 0);

  const roosterRef = useRef<Rooster>(maakRooster());
  const spelerRef = useRef<Positie>(vindSymbool("P"));
  const octopusRef = useRef<Positie>(vindSymbool("E"));
  const huidigeRichtingRef = useRef<Richting>({ dx: 0, dy: 0 });
  const gewenstRichtingRef = useRef<Richting>({ dx: 0, dy: 0 });
  const tikTellerRef = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const teEten = useRef(telEetbaar(roosterRef.current));

  const reset = useCallback(() => {
    roosterRef.current = maakRooster();
    spelerRef.current = vindSymbool("P");
    octopusRef.current = vindSymbool("E");
    roosterRef.current[spelerRef.current.y][spelerRef.current.x] = " ";
    roosterRef.current[octopusRef.current.y][octopusRef.current.x] = " ";
    huidigeRichtingRef.current = { dx: 0, dy: 0 };
    gewenstRichtingRef.current = { dx: 0, dy: 0 };
    teEten.current = telEetbaar(roosterRef.current);
    setScore(0);
    setStatus("spelen");
  }, []);

  const teken = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const rooster = roosterRef.current;

    ctx.fillStyle = "#0a3634";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < HAAI_ROWS; y++) {
      for (let x = 0; x < HAAI_COLS; x++) {
        const cel = rooster[y][x];
        const px = x * CEL;
        const py = y * CEL;
        if (cel === "#") {
          ctx.fillStyle = "#186f6c";
          ctx.fillRect(px + 1, py + 1, CEL - 2, CEL - 2);
        } else {
          ctx.fillStyle = "#12403f";
          ctx.fillRect(px, py, CEL, CEL);
          if (cel === "." || cel === "o") {
            ctx.font = `${cel === "o" ? 20 : 15}px system-ui, sans-serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(cel === "o" ? "🪼" : "🐠", px + CEL / 2, py + CEL / 2 + 1);
          }
        }
      }
    }

    ctx.font = "22px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const speler = spelerRef.current;
    ctx.save();
    ctx.translate(speler.x * CEL + CEL / 2, speler.y * CEL + CEL / 2);
    if (huidigeRichtingRef.current.dx < 0) ctx.scale(-1, 1);
    ctx.fillText("🦈", 0, 1);
    ctx.restore();

    const octo = octopusRef.current;
    ctx.fillText("🐙", octo.x * CEL + CEL / 2, octo.y * CEL + CEL / 2 + 1);
  }, []);

  useEffect(() => {
    teken();
  }, [teken, status]);

  useEffect(() => {
    if (status !== "spelen") return;

    const interval = setInterval(() => {
      const rooster = roosterRef.current;
      const speler = spelerRef.current;

      const gewenst = gewenstRichtingRef.current;
      if (gewenst.dx !== 0 || gewenst.dy !== 0) {
        if (!isMuur(rooster, speler.x + gewenst.dx, speler.y + gewenst.dy)) {
          huidigeRichtingRef.current = gewenst;
        }
      }

      const richting = huidigeRichtingRef.current;
      const volgende = { x: speler.x + richting.dx, y: speler.y + richting.dy };
      if (!isMuur(rooster, volgende.x, volgende.y)) {
        spelerRef.current = volgende;
        const cel = rooster[volgende.y][volgende.x];
        if (cel === "." || cel === "o") {
          rooster[volgende.y][volgende.x] = " ";
          setScore((s) => {
            const nieuw = s + (cel === "o" ? 5 : 1);
            return nieuw;
          });
          teEten.current -= 1;
        }
      }

      // De octopus beweegt op halve snelheid richting de haai.
      tikTellerRef.current += 1;
      if (tikTellerRef.current % 2 === 0) {
        const stap = kortstePad(rooster, octopusRef.current, spelerRef.current);
        if (stap) octopusRef.current = stap;
      }

      if (octopusRef.current.x === spelerRef.current.x && octopusRef.current.y === spelerRef.current.y) {
        setStatus("game-over");
      } else if (teEten.current <= 0) {
        setStatus("gewonnen");
      }

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

  useEffect(() => {
    function opToets(e: KeyboardEvent) {
      const mapping: Record<string, Richting> = {
        ArrowUp: RICHTINGEN.boven,
        ArrowDown: RICHTINGEN.onder,
        ArrowLeft: RICHTINGEN.links,
        ArrowRight: RICHTINGEN.rechts,
        w: RICHTINGEN.boven,
        s: RICHTINGEN.onder,
        a: RICHTINGEN.links,
        d: RICHTINGEN.rechts,
      };
      const richting = mapping[e.key];
      if (richting) {
        e.preventDefault();
        gewenstRichtingRef.current = richting;
      }
    }
    window.addEventListener("keydown", opToets);
    return () => window.removeEventListener("keydown", opToets);
  }, []);

  // Swipe-besturing: vinger op het speelveld leggen en in een richting bewegen.
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
      // Voorkomt dat de pagina meescrollt terwijl je op het speelveld veegt.
      e.preventDefault();
      const t = e.touches[0];
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;
      if (!gesleept && Math.hypot(dx, dy) > MIN_SWIPE) {
        gesleept = true;
        gewenstRichtingRef.current =
          Math.abs(dx) > Math.abs(dy)
            ? dx > 0
              ? RICHTINGEN.rechts
              : RICHTINGEN.links
            : dy > 0
              ? RICHTINGEN.onder
              : RICHTINGEN.boven;
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
          width={HAAI_COLS * CEL}
          height={HAAI_ROWS * CEL}
          className="block w-full select-none"
          style={{ aspectRatio: `${HAAI_COLS} / ${HAAI_ROWS}`, touchAction: "none" }}
        />
        {status !== "spelen" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-diepblauw-900/80 p-4 text-center text-white">
            {status === "idle" && (
              <p className="font-display text-lg font-semibold">Eet alle vissen en kwallen op — pas op voor de octopus!</p>
            )}
            {status === "gewonnen" && (
              <p className="font-display text-lg font-semibold">🎉 Gewonnen! Score: {score}</p>
            )}
            {status === "game-over" && (
              <p className="font-display text-lg font-semibold">🐙 Te pakken! Score: {score}</p>
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
        Veeg op het speelveld om de haai te sturen (of gebruik de pijltjestoetsen).
      </p>
    </div>
  );
}
