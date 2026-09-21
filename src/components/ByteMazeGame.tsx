"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { byteMazeLevels } from "@/data/byteMazeLevels";
import { useLocalStorage } from "@/lib/useLocalStorage";

type Rooster = string[][];
type Richting = { dx: number; dy: number };
type Positie = { x: number; y: number };
type Scherm = "start" | "spelen" | "gepauzeerd" | "level-klaar" | "game-over";

const CEL = 28;
const START_LEVENS = 3;
const KOFFIE_DUUR_MS = 4000;
const FIREWALL_DUUR_MS = 4500;
const MACHT_DUUR_MS = 5000;
const PUNTEN = { datapunt: 1, item: 5, goud: 25, virus: 20, levelBonus: 50 };
const MIN_TICK_MS = 90;
const TICK_STAP_EXTRA_LEVEL = 15;
const ITEM_EMOJI: Record<string, string> = { D: "💾", U: "🔌", G: "🔌", K: "☕", S: "🛡️", B: "🐛" };

const RICHTINGEN: Record<string, Richting> = {
  boven: { dx: 0, dy: -1 },
  onder: { dx: 0, dy: 1 },
  links: { dx: -1, dy: 0 },
  rechts: { dx: 1, dy: 0 },
};

function levelData(level: number) {
  const index = Math.min(level - 1, byteMazeLevels.length - 1);
  const basis = byteMazeLevels[index];
  const extraLevels = Math.max(0, level - byteMazeLevels.length);
  const tickMs = Math.max(MIN_TICK_MS, basis.tickMs - extraLevels * TICK_STAP_EXTRA_LEVEL);
  return { ...basis, tickMs };
}

function maakRooster(maze: string[]): Rooster {
  return maze.map((rij) => rij.split(""));
}

function vindSymbool(maze: string[], symbool: string): Positie {
  for (let y = 0; y < maze.length; y++) {
    const x = maze[y].indexOf(symbool);
    if (x !== -1) return { x, y };
  }
  return { x: 1, y: 1 };
}

function isMuur(rooster: Rooster, cols: number, rows: number, x: number, y: number): boolean {
  if (y < 0 || y >= rows || x < 0 || x >= cols) return true;
  return rooster[y][x] === "#";
}

function kortstePad(
  rooster: Rooster,
  cols: number,
  rows: number,
  van: Positie,
  naar: Positie
): Positie | null {
  const sleutel = (p: Positie) => `${p.x},${p.y}`;
  const bezocht = new Set<string>([sleutel(van)]);
  const queue: { pos: Positie; eerste: Positie | null }[] = [{ pos: van, eerste: null }];
  while (queue.length > 0) {
    const { pos, eerste } = queue.shift()!;
    if (pos.x === naar.x && pos.y === naar.y) return eerste ?? pos;
    for (const richting of Object.values(RICHTINGEN)) {
      const volgende = { x: pos.x + richting.dx, y: pos.y + richting.dy };
      if (isMuur(rooster, cols, rows, volgende.x, volgende.y)) continue;
      const key = sleutel(volgende);
      if (bezocht.has(key)) continue;
      bezocht.add(key);
      queue.push({ pos: volgende, eerste: eerste ?? volgende });
    }
  }
  return null;
}

function vluchtStap(
  rooster: Rooster,
  cols: number,
  rows: number,
  van: Positie,
  weg: Positie
): Positie | null {
  const buren = Object.values(RICHTINGEN)
    .map((r) => ({ x: van.x + r.dx, y: van.y + r.dy }))
    .filter((p) => !isMuur(rooster, cols, rows, p.x, p.y));
  if (buren.length === 0) return null;
  let beste: Positie[] = [];
  let besteAfstand = -1;
  for (const b of buren) {
    const afstand = Math.abs(b.x - weg.x) + Math.abs(b.y - weg.y);
    if (afstand > besteAfstand) {
      besteAfstand = afstand;
      beste = [b];
    } else if (afstand === besteAfstand) {
      beste.push(b);
    }
  }
  return beste[Math.floor(Math.random() * beste.length)];
}

function telVerzamelbaar(rooster: Rooster): number {
  let aantal = 0;
  for (const rij of rooster) for (const cel of rij) if (".DUG".includes(cel)) aantal += 1;
  return aantal;
}

export function ByteMazeGame() {
  const [scherm, setScherm] = useState<Scherm>("start");
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [levens, setLevens] = useState(START_LEVENS);
  const [statusTicks, setStatusTicks] = useState({ koffie: 0, firewall: 0, macht: 0 });
  const [schudActief, setSchudActief] = useState(false);
  const [levelBonusGetoond, setLevelBonusGetoond] = useState(0);
  const { waarde: hoogsteScore, bijwerken: setHoogsteScore } = useLocalStorage(
    "bonaire-bytemaze-highscore",
    0
  );

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const roosterRef = useRef<Rooster>([[]]);
  const colsRef = useRef(0);
  const rowsRef = useRef(0);
  const spelerRef = useRef<Positie>({ x: 1, y: 1 });
  const spelerStartRef = useRef<Positie>({ x: 1, y: 1 });
  const virussenRef = useRef<Positie[]>([]);
  const virusStartsRef = useRef<Positie[]>([]);
  const huidigeRichtingRef = useRef<Richting>({ dx: 0, dy: 0 });
  const gewenstRichtingRef = useRef<Richting>({ dx: 0, dy: 0 });
  const tikTellerRef = useRef(0);
  const virusIntervalRef = useRef(2);
  const tickMsRef = useRef(220);
  const teVerzamelenRef = useRef(0);

  const koffieRef = useRef(0);
  const firewallRef = useRef(0);
  const machtRef = useRef(0);

  const scoreRef = useRef(0);
  const levensRef = useRef(START_LEVENS);
  const levelRef = useRef(1);
  const schermRef = useRef<Scherm>("start");

  useEffect(() => {
    schermRef.current = scherm;
  }, [scherm]);

  const laadLevel = useCallback((nieuwLevel: number, behoudScore: boolean) => {
    const data = levelData(nieuwLevel);
    roosterRef.current = maakRooster(data.maze);
    colsRef.current = data.maze[0].length;
    rowsRef.current = data.maze.length;

    const pStart = vindSymbool(data.maze, "P");
    spelerRef.current = { ...pStart };
    spelerStartRef.current = { ...pStart };
    roosterRef.current[pStart.y][pStart.x] = " ";

    const virussen: Positie[] = [];
    for (const label of ["1", "2", "3", "4"].slice(0, data.virusCount)) {
      const pos = vindSymbool(data.maze, label);
      virussen.push(pos);
      roosterRef.current[pos.y][pos.x] = " ";
    }
    virussenRef.current = virussen;
    virusStartsRef.current = virussen.map((v) => ({ ...v }));

    huidigeRichtingRef.current = { dx: 0, dy: 0 };
    gewenstRichtingRef.current = { dx: 0, dy: 0 };
    tickMsRef.current = data.tickMs;
    virusIntervalRef.current = data.virusMoveInterval;
    teVerzamelenRef.current = telVerzamelbaar(roosterRef.current);
    koffieRef.current = 0;
    firewallRef.current = 0;
    machtRef.current = 0;
    setStatusTicks({ koffie: 0, firewall: 0, macht: 0 });
    if (!behoudScore) {
      scoreRef.current = 0;
      setScore(0);
    }
  }, []);

  const teken = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const cols = colsRef.current;
    const rows = rowsRef.current;
    if (!canvas || !ctx || !cols || !rows) return;
    const rooster = roosterRef.current;

    ctx.fillStyle = "#080b1f";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cel = rooster[y][x];
        const px = x * CEL;
        const py = y * CEL;
        if (cel === "#") {
          ctx.fillStyle = "#141b3d";
          ctx.fillRect(px + 1, py + 1, CEL - 2, CEL - 2);
          ctx.strokeStyle = "rgba(0, 220, 255, 0.35)";
          ctx.lineWidth = 1;
          ctx.strokeRect(px + 1.5, py + 1.5, CEL - 3, CEL - 3);
        } else {
          ctx.fillStyle = "#0d1230";
          ctx.fillRect(px, py, CEL, CEL);
          if (cel === ".") {
            ctx.save();
            ctx.fillStyle = "#39ff8f";
            ctx.shadowColor = "#39ff8f";
            ctx.shadowBlur = 6;
            ctx.beginPath();
            ctx.arc(px + CEL / 2, py + CEL / 2, 2.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          } else if (ITEM_EMOJI[cel]) {
            ctx.save();
            if (cel === "G") {
              ctx.beginPath();
              ctx.arc(px + CEL / 2, py + CEL / 2, CEL * 0.42, 0, Math.PI * 2);
              ctx.fillStyle = "rgba(255, 210, 60, 0.55)";
              ctx.fill();
            }
            if (cel === "B") {
              ctx.beginPath();
              ctx.arc(px + CEL / 2, py + CEL / 2, CEL * 0.42, 0, Math.PI * 2);
              ctx.fillStyle = "rgba(255, 60, 90, 0.35)";
              ctx.fill();
            }
            ctx.font = `${CEL * 0.62}px system-ui, sans-serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(ITEM_EMOJI[cel], px + CEL / 2, py + CEL / 2 + 1);
            ctx.restore();
          }
        }
      }
    }

    const speler = spelerRef.current;
    ctx.save();
    ctx.translate(speler.x * CEL + CEL / 2, speler.y * CEL + CEL / 2);
    if (firewallRef.current > 0) {
      ctx.beginPath();
      ctx.arc(0, 0, CEL * 0.56, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(56, 189, 248, 0.4)";
      ctx.fill();
    }
    if (koffieRef.current > 0) {
      ctx.beginPath();
      ctx.arc(0, 0, CEL * 0.5, 0, Math.PI * 2);
      ctx.strokeStyle = "#ffcc47";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    if (huidigeRichtingRef.current.dx < 0) ctx.scale(-1, 1);
    ctx.font = `${CEL * 0.72}px system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("🤖", 0, 1);
    ctx.restore();

    const kwetsbaar = machtRef.current > 0;
    ctx.font = `${CEL * 0.68}px system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (const v of virussenRef.current) {
      ctx.save();
      if (kwetsbaar) {
        const bijnaOm = machtRef.current <= 6;
        ctx.globalAlpha = bijnaOm && tikTellerRef.current % 2 === 0 ? 0.5 : 0.85;
        ctx.filter = "grayscale(70%) brightness(1.5) hue-rotate(160deg)";
      }
      ctx.fillText("🦠", v.x * CEL + CEL / 2, v.y * CEL + CEL / 2 + 1);
      ctx.restore();
    }
  }, []);

  const verliesLeven = useCallback(() => {
    levensRef.current -= 1;
    setLevens(levensRef.current);
    setSchudActief(true);
    setTimeout(() => setSchudActief(false), 400);
    if (levensRef.current <= 0) {
      setHoogsteScore((h) => Math.max(h, scoreRef.current));
      setScherm("game-over");
      return;
    }
    spelerRef.current = { ...spelerStartRef.current };
    virussenRef.current = virusStartsRef.current.map((v) => ({ ...v }));
    huidigeRichtingRef.current = { dx: 0, dy: 0 };
    gewenstRichtingRef.current = { dx: 0, dy: 0 };
    koffieRef.current = 0;
    firewallRef.current = 0;
    machtRef.current = 0;
    setStatusTicks({ koffie: 0, firewall: 0, macht: 0 });
  }, [setHoogsteScore]);

  const start = useCallback(() => {
    levelRef.current = 1;
    levensRef.current = START_LEVENS;
    setLevel(1);
    setLevens(START_LEVENS);
    laadLevel(1, false);
    setScherm("spelen");
  }, [laadLevel]);

  const volgendLevel = useCallback(() => {
    levelRef.current += 1;
    setLevel(levelRef.current);
    laadLevel(levelRef.current, true);
    setScherm("spelen");
  }, [laadLevel]);

  useEffect(() => {
    if (scherm === "level-klaar") {
      const bonus = PUNTEN.levelBonus * levelRef.current;
      scoreRef.current += bonus;
      setScore(scoreRef.current);
      setLevelBonusGetoond(bonus);
      const t = setTimeout(volgendLevel, 2200);
      return () => clearTimeout(t);
    }
  }, [scherm, volgendLevel]);

  useEffect(() => {
    teken();
  }, [teken, scherm]);

  useEffect(() => {
    if (scherm !== "spelen") return;

    const interval = setInterval(() => {
      const rooster = roosterRef.current;
      const cols = colsRef.current;
      const rows = rowsRef.current;

      function stapSpeler(): boolean {
        const speler = spelerRef.current;
        const gewenst = gewenstRichtingRef.current;
        if (gewenst.dx !== 0 || gewenst.dy !== 0) {
          if (!isMuur(rooster, cols, rows, speler.x + gewenst.dx, speler.y + gewenst.dy)) {
            huidigeRichtingRef.current = gewenst;
          }
        }
        const richting = huidigeRichtingRef.current;
        const volgende = { x: speler.x + richting.dx, y: speler.y + richting.dy };
        if (isMuur(rooster, cols, rows, volgende.x, volgende.y)) return false;
        spelerRef.current = volgende;
        const cel = rooster[volgende.y][volgende.x];
        if (cel === "." || cel === "D" || cel === "U" || cel === "G") {
          rooster[volgende.y][volgende.x] = " ";
          const punten = cel === "." ? PUNTEN.datapunt : cel === "G" ? PUNTEN.goud : PUNTEN.item;
          scoreRef.current += punten;
          setScore(scoreRef.current);
          teVerzamelenRef.current -= 1;
        } else if (cel === "K") {
          rooster[volgende.y][volgende.x] = " ";
          koffieRef.current = Math.round(KOFFIE_DUUR_MS / tickMsRef.current);
        } else if (cel === "S") {
          rooster[volgende.y][volgende.x] = " ";
          firewallRef.current = Math.round(FIREWALL_DUUR_MS / tickMsRef.current);
        } else if (cel === "B") {
          rooster[volgende.y][volgende.x] = " ";
          machtRef.current = Math.round(MACHT_DUUR_MS / tickMsRef.current);
        }
        return true;
      }

      stapSpeler();
      if (koffieRef.current > 0) stapSpeler();

      tikTellerRef.current += 1;
      if (tikTellerRef.current % virusIntervalRef.current === 0) {
        const kwetsbaar = machtRef.current > 0;
        virussenRef.current = virussenRef.current.map(
          (v) =>
            (kwetsbaar
              ? vluchtStap(rooster, cols, rows, v, spelerRef.current)
              : kortstePad(rooster, cols, rows, v, spelerRef.current)) ?? v
        );
      }

      if (koffieRef.current > 0) koffieRef.current -= 1;
      if (firewallRef.current > 0) firewallRef.current -= 1;
      if (machtRef.current > 0) machtRef.current -= 1;
      setStatusTicks({ koffie: koffieRef.current, firewall: firewallRef.current, macht: machtRef.current });

      const geraaktIndex = virussenRef.current.findIndex(
        (v) => v.x === spelerRef.current.x && v.y === spelerRef.current.y
      );
      if (geraaktIndex !== -1) {
        if (machtRef.current > 0) {
          const nieuw = [...virussenRef.current];
          nieuw[geraaktIndex] = { ...virusStartsRef.current[geraaktIndex] };
          virussenRef.current = nieuw;
          scoreRef.current += PUNTEN.virus;
          setScore(scoreRef.current);
        } else if (firewallRef.current <= 0) {
          verliesLeven();
          teken();
          return;
        }
      }

      if (teVerzamelenRef.current <= 0) {
        setScherm("level-klaar");
        teken();
        return;
      }

      teken();
    }, tickMsRef.current);

    return () => clearInterval(interval);
  }, [scherm, level, teken, verliesLeven]);

  function stuur(richting: Richting) {
    if (schermRef.current !== "spelen") return;
    gewenstRichtingRef.current = richting;
  }

  function togglePauze() {
    setScherm((s) => (s === "spelen" ? "gepauzeerd" : s === "gepauzeerd" ? "spelen" : s));
  }

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
        stuur(richting);
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
        stuur(
          Math.abs(dx) > Math.abs(dy)
            ? dx > 0
              ? RICHTINGEN.rechts
              : RICHTINGEN.links
            : dy > 0
              ? RICHTINGEN.onder
              : RICHTINGEN.boven
        );
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

  const cols = colsRef.current || levelData(level).maze[0].length;
  const rows = rowsRef.current || levelData(level).maze.length;

  return (
    <div className="space-y-3">
      {scherm === "start" && (
        <div className="animate-pop-in space-y-5 rounded-xl2 bg-[#0a0e27] p-6 text-center text-white shadow-card">
          <div>
            <span className="text-4xl" aria-hidden>
              💻
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold text-[#39ff8f]">Bart&apos;s Byte Maze</h2>
            <p className="mt-2 text-sm text-white/80">Verzamel alle data en ontwijk de virussen!</p>
          </div>
          <button
            type="button"
            onClick={start}
            className="focus-ring rounded-full bg-koraal-500 px-6 py-2.5 text-sm font-semibold text-white shadow-card hover:bg-koraal-600"
          >
            Start spel
          </button>
          {hoogsteScore > 0 && <p className="text-xs text-white/50">Hoogste score: {hoogsteScore}</p>}
        </div>
      )}

      {scherm !== "start" && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-sm text-diepblauw-800">
            <span key={score} className="animate-pop-in font-semibold">
              Score: {score}
            </span>
            <span>Level {level}</span>
            <span aria-label={`${levens} levens over`}>
              {Array.from({ length: START_LEVENS }, (_, i) => (i < levens ? "🤖" : "💀")).join(" ")}
            </span>
            {scherm === "spelen" && (
              <button
                type="button"
                onClick={togglePauze}
                aria-label="Pauzeer"
                className="focus-ring rounded-full bg-zand-100 px-3 py-1 text-xs font-semibold text-diepblauw-700 hover:bg-zand-200"
              >
                ⏸️ Pauze
              </button>
            )}
          </div>

          {(statusTicks.koffie > 0 || statusTicks.firewall > 0 || statusTicks.macht > 0) && (
            <div className="flex gap-2 text-xs font-semibold">
              {statusTicks.koffie > 0 && (
                <span className="rounded-full bg-zon-100 px-2.5 py-1 text-zon-800">
                  ☕ {Math.ceil((statusTicks.koffie * tickMsRef.current) / 1000)}s
                </span>
              )}
              {statusTicks.firewall > 0 && (
                <span className="rounded-full bg-turquoise-100 px-2.5 py-1 text-turquoise-800">
                  🛡️ {Math.ceil((statusTicks.firewall * tickMsRef.current) / 1000)}s
                </span>
              )}
              {statusTicks.macht > 0 && (
                <span className="rounded-full bg-koraal-100 px-2.5 py-1 text-koraal-800">
                  ⚡ {Math.ceil((statusTicks.macht * tickMsRef.current) / 1000)}s
                </span>
              )}
            </div>
          )}

          <div
            className={`relative overflow-hidden rounded-xl2 shadow-card ${schudActief ? "animate-schud" : ""}`}
          >
            <canvas
              ref={canvasRef}
              width={cols * CEL}
              height={rows * CEL}
              className="block w-full select-none"
              style={{ aspectRatio: `${cols} / ${rows}`, touchAction: "none" }}
            />

            {scherm === "gepauzeerd" && (
              <div className="animate-pop-in absolute inset-0 flex flex-col items-center justify-center gap-3 bg-diepblauw-900/85 p-4 text-center text-white">
                <p className="font-display text-lg font-semibold">⏸️ Gepauzeerd</p>
                <button
                  type="button"
                  onClick={togglePauze}
                  className="focus-ring rounded-full bg-koraal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-card hover:bg-koraal-600"
                >
                  Doorgaan
                </button>
                <button
                  type="button"
                  onClick={() => setScherm("start")}
                  className="focus-ring text-xs font-medium text-white/70 underline"
                >
                  Terug naar menu
                </button>
              </div>
            )}

            {scherm === "level-klaar" && (
              <div className="animate-pop-in absolute inset-0 flex flex-col items-center justify-center gap-2 bg-diepblauw-900/85 p-4 text-center text-white">
                <p className="text-4xl" aria-hidden>
                  🎉
                </p>
                <p className="font-display text-lg font-semibold">Level {levelRef.current - 1} voltooid!</p>
                <p className="text-sm text-[#39ff8f]">+{levelBonusGetoond} bonuspunten</p>
                <button
                  type="button"
                  onClick={volgendLevel}
                  className="focus-ring mt-1 rounded-full bg-koraal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-card hover:bg-koraal-600"
                >
                  Volgende level
                </button>
              </div>
            )}

            {scherm === "game-over" && (
              <div className="animate-pop-in absolute inset-0 flex flex-col items-center justify-center gap-2 bg-diepblauw-900/85 p-4 text-center text-white">
                <p className="text-3xl" aria-hidden>
                  💀
                </p>
                <p className="font-display text-lg font-semibold">Game over!</p>
                <p className="text-sm text-white/80">Eindscore: {score}</p>
                <p className="text-sm text-white/80">Hoogste score: {hoogsteScore}</p>
                <div className="mt-1 flex gap-2">
                  <button
                    type="button"
                    onClick={start}
                    className="focus-ring rounded-full bg-koraal-500 px-4 py-2.5 text-sm font-semibold text-white shadow-card hover:bg-koraal-600"
                  >
                    Opnieuw spelen
                  </button>
                  <button
                    type="button"
                    onClick={() => setScherm("start")}
                    className="focus-ring rounded-full bg-white/15 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/25"
                  >
                    Terug naar menu
                  </button>
                </div>
              </div>
            )}
          </div>

          {scherm === "spelen" && (
            <>
              <p className="text-center text-xs text-diepblauw-700/50">
                Veeg op het speelveld om te sturen (of gebruik de pijltjestoetsen / WASD).
              </p>
              <div className="mx-auto grid max-w-[180px] grid-cols-3 gap-2">
                <div />
                <button
                  type="button"
                  onClick={() => stuur(RICHTINGEN.boven)}
                  aria-label="Omhoog"
                  className="focus-ring flex h-11 items-center justify-center rounded-xl bg-white text-lg shadow-card active:scale-95"
                >
                  ⬆️
                </button>
                <div />
                <button
                  type="button"
                  onClick={() => stuur(RICHTINGEN.links)}
                  aria-label="Links"
                  className="focus-ring flex h-11 items-center justify-center rounded-xl bg-white text-lg shadow-card active:scale-95"
                >
                  ⬅️
                </button>
                <div />
                <button
                  type="button"
                  onClick={() => stuur(RICHTINGEN.rechts)}
                  aria-label="Rechts"
                  className="focus-ring flex h-11 items-center justify-center rounded-xl bg-white text-lg shadow-card active:scale-95"
                >
                  ➡️
                </button>
                <div />
                <button
                  type="button"
                  onClick={() => stuur(RICHTINGEN.onder)}
                  aria-label="Omlaag"
                  className="focus-ring flex h-11 items-center justify-center rounded-xl bg-white text-lg shadow-card active:scale-95"
                >
                  ⬇️
                </button>
                <div />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
