"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocalStorage } from "@/lib/useLocalStorage";

type Scherm = "start" | "spelen" | "golf-klaar" | "game-over";

const W = 300;
const H = 440;
const TICK_MS = 30;

const PLAYER_W = 26;
const PLAYER_H = 18;
const PLAYER_Y = H - 34;
const PLAYER_SPEED = 5;

const BULLET_SPEED = 9;
const ENEMY_BULLET_SPEED = 2.6;
const FIRE_COOLDOWN_TICKS = Math.round(380 / TICK_MS);
const INVUL_TICKS = Math.round(1300 / TICK_MS);
const START_LEVENS = 3;
const MAX_VIJAND_KOGELS = 2;

const ROWS = 4;
const COLS = 6;
const ENEMY_W = 22;
const ENEMY_H = 20;
const COL_SPACING = 44;
const ROW_SPACING = 32;
const START_X = 22;
const START_Y = 36;
const STEP_DOWN = 12;
const BASE_ENEMY_SPEED = 0.7;
const MAX_ENEMY_SPEED = 2.6;
const INVASIE_Y = PLAYER_Y - 24;

const RIJ_EMOJI = ["👾", "🦠", "🦠", "🐛"];
const RIJ_PUNTEN = [30, 20, 20, 10];

interface Vijand {
  row: number;
  col: number;
  alive: boolean;
}

interface Kogel {
  x: number;
  y: number;
}

function maakVijanden(): Vijand[] {
  const vijanden: Vijand[] = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      vijanden.push({ row, col, alive: true });
    }
  }
  return vijanden;
}

const STERREN = Array.from({ length: 40 }, () => ({
  x: Math.random() * W,
  y: Math.random() * H,
  r: Math.random() * 1.2 + 0.3,
}));

export function FirewallInvadersGame() {
  const [scherm, setScherm] = useState<Scherm>("start");
  const [score, setScore] = useState(0);
  const [golf, setGolf] = useState(1);
  const [levens, setLevens] = useState(START_LEVENS);
  const [golfBonusGetoond, setGolfBonusGetoond] = useState(0);
  const { waarde: hoogsteScore, bijwerken: setHoogsteScore } = useLocalStorage(
    "bonaire-firewall-highscore",
    0
  );

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const schermRef = useRef<Scherm>("start");
  const scoreRef = useRef(0);
  const golfRef = useRef(1);
  const levensRef = useRef(START_LEVENS);

  const playerXRef = useRef((W - PLAYER_W) / 2);
  const linksActiefRef = useRef(false);
  const rechtsActiefRef = useRef(false);
  const kogelsRef = useRef<Kogel[]>([]);
  const vijandKogelsRef = useRef<Kogel[]>([]);
  const vijandenRef = useRef<Vijand[]>(maakVijanden());
  const formatieRef = useRef({ x: 0, y: 0 });
  const richtingRef = useRef(1);
  const vuurCooldownRef = useRef(0);
  const invulRef = useRef(0);
  const tikTellerRef = useRef(0);

  useEffect(() => {
    schermRef.current = scherm;
  }, [scherm]);

  const nieuweGolf = useCallback((nieuwGolf: number, resetSpel: boolean) => {
    vijandenRef.current = maakVijanden();
    formatieRef.current = { x: 0, y: 0 };
    richtingRef.current = 1;
    kogelsRef.current = [];
    vijandKogelsRef.current = [];
    vuurCooldownRef.current = 0;
    invulRef.current = 0;
    playerXRef.current = (W - PLAYER_W) / 2;
    golfRef.current = nieuwGolf;
    setGolf(nieuwGolf);
    if (resetSpel) {
      scoreRef.current = 0;
      levensRef.current = START_LEVENS;
      setScore(0);
      setLevens(START_LEVENS);
    }
  }, []);

  const start = useCallback(() => {
    nieuweGolf(1, true);
    setScherm("spelen");
  }, [nieuweGolf]);

  const volgendeGolf = useCallback(() => {
    nieuweGolf(golfRef.current + 1, false);
    setScherm("spelen");
  }, [nieuweGolf]);

  useEffect(() => {
    if (scherm === "golf-klaar") {
      const bonus = 50 * golfRef.current;
      scoreRef.current += bonus;
      setScore(scoreRef.current);
      setGolfBonusGetoond(bonus);
      const t = setTimeout(volgendeGolf, 2000);
      return () => clearTimeout(t);
    }
  }, [scherm, volgendeGolf]);

  const teken = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.fillStyle = "#080b1f";
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = "rgba(120, 200, 255, 0.5)";
    for (const ster of STERREN) {
      ctx.beginPath();
      ctx.arc(ster.x, ster.y, ster.r, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.strokeStyle = "rgba(255, 90, 90, 0.25)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, INVASIE_Y);
    ctx.lineTo(W, INVASIE_Y);
    ctx.stroke();

    ctx.font = `${ENEMY_H}px system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (const v of vijandenRef.current) {
      if (!v.alive) continue;
      const px = START_X + v.col * COL_SPACING + formatieRef.current.x;
      const py = START_Y + v.row * ROW_SPACING + formatieRef.current.y;
      ctx.fillText(RIJ_EMOJI[v.row], px + ENEMY_W / 2, py + ENEMY_H / 2);
    }

    ctx.save();
    ctx.fillStyle = "#39ff8f";
    ctx.shadowColor = "#39ff8f";
    ctx.shadowBlur = 6;
    for (const k of kogelsRef.current) {
      ctx.fillRect(k.x - 2, k.y - 7, 4, 10);
    }
    ctx.restore();

    ctx.save();
    ctx.fillStyle = "#ff5a5a";
    ctx.shadowColor = "#ff5a5a";
    ctx.shadowBlur = 6;
    for (const k of vijandKogelsRef.current) {
      ctx.beginPath();
      ctx.arc(k.x, k.y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    const knippert = invulRef.current > 0 && tikTellerRef.current % 4 < 2;
    if (!knippert) {
      ctx.font = `${PLAYER_H + 4}px system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("🛡️", playerXRef.current + PLAYER_W / 2, PLAYER_Y + PLAYER_H / 2);
    }
  }, []);

  useEffect(() => {
    teken();
  }, [teken, scherm]);

  useEffect(() => {
    if (scherm !== "spelen") return;

    const interval = setInterval(() => {
      tikTellerRef.current += 1;

      if (linksActiefRef.current) playerXRef.current -= PLAYER_SPEED;
      if (rechtsActiefRef.current) playerXRef.current += PLAYER_SPEED;
      playerXRef.current = Math.max(4, Math.min(W - PLAYER_W - 4, playerXRef.current));

      kogelsRef.current = kogelsRef.current
        .map((k) => ({ ...k, y: k.y - BULLET_SPEED }))
        .filter((k) => k.y > -10);

      vijandKogelsRef.current = vijandKogelsRef.current
        .map((k) => ({ ...k, y: k.y + ENEMY_BULLET_SPEED }))
        .filter((k) => k.y < H + 10);

      const alive = vijandenRef.current.filter((v) => v.alive);
      const aliveCount = alive.length;

      if (aliveCount > 0) {
        const speed = Math.min(
          MAX_ENEMY_SPEED,
          BASE_ENEMY_SPEED + (golfRef.current - 1) * 0.3 + (ROWS * COLS - aliveCount) * 0.05
        );
        let minX = Infinity;
        let maxX = -Infinity;
        for (const v of alive) {
          const px = START_X + v.col * COL_SPACING + formatieRef.current.x;
          minX = Math.min(minX, px);
          maxX = Math.max(maxX, px + ENEMY_W);
        }
        if ((richtingRef.current > 0 && maxX >= W - 4) || (richtingRef.current < 0 && minX <= 4)) {
          formatieRef.current.y += STEP_DOWN;
          richtingRef.current *= -1;
        } else {
          formatieRef.current.x += richtingRef.current * speed;
        }

        const fireChance = Math.min(0.01, 0.0025 * golfRef.current);
        if (vijandKogelsRef.current.length < MAX_VIJAND_KOGELS) {
          for (let col = 0; col < COLS; col++) {
            if (vijandKogelsRef.current.length >= MAX_VIJAND_KOGELS) break;
            const kolomVijanden = alive.filter((v) => v.col === col);
            if (kolomVijanden.length === 0) continue;
            const schutter = kolomVijanden.reduce((laagste, v) => (v.row > laagste.row ? v : laagste));
            if (Math.random() < fireChance) {
              const px = START_X + schutter.col * COL_SPACING + formatieRef.current.x + ENEMY_W / 2;
              const py = START_Y + schutter.row * ROW_SPACING + formatieRef.current.y + ENEMY_H;
              vijandKogelsRef.current.push({ x: px, y: py });
            }
          }
        }
      }

      if (vuurCooldownRef.current > 0) vuurCooldownRef.current -= 1;
      if (vuurCooldownRef.current <= 0) {
        kogelsRef.current.push({ x: playerXRef.current + PLAYER_W / 2, y: PLAYER_Y });
        vuurCooldownRef.current = FIRE_COOLDOWN_TICKS;
      }

      const overgeblevenKogels: Kogel[] = [];
      for (const kogel of kogelsRef.current) {
        let geraakt = false;
        for (const v of vijandenRef.current) {
          if (!v.alive) continue;
          const px = START_X + v.col * COL_SPACING + formatieRef.current.x;
          const py = START_Y + v.row * ROW_SPACING + formatieRef.current.y;
          if (kogel.x >= px && kogel.x <= px + ENEMY_W && kogel.y >= py && kogel.y <= py + ENEMY_H) {
            v.alive = false;
            scoreRef.current += RIJ_PUNTEN[v.row];
            setScore(scoreRef.current);
            geraakt = true;
            break;
          }
        }
        if (!geraakt) overgeblevenKogels.push(kogel);
      }
      kogelsRef.current = overgeblevenKogels;

      if (invulRef.current > 0) invulRef.current -= 1;

      if (invulRef.current <= 0) {
        const overgeblevenVijandKogels: Kogel[] = [];
        let geraaktDoorKogel = false;
        for (const k of vijandKogelsRef.current) {
          if (
            !geraaktDoorKogel &&
            k.x >= playerXRef.current &&
            k.x <= playerXRef.current + PLAYER_W &&
            k.y >= PLAYER_Y &&
            k.y <= PLAYER_Y + PLAYER_H
          ) {
            geraaktDoorKogel = true;
            continue;
          }
          overgeblevenVijandKogels.push(k);
        }
        vijandKogelsRef.current = overgeblevenVijandKogels;

        if (geraaktDoorKogel) {
          levensRef.current -= 1;
          setLevens(levensRef.current);
          invulRef.current = INVUL_TICKS;
          if (levensRef.current <= 0) {
            setHoogsteScore((h) => Math.max(h, scoreRef.current));
            setScherm("game-over");
            teken();
            return;
          }
        }
      }

      const invasieBereikt = vijandenRef.current.some((v) => {
        if (!v.alive) return false;
        const py = START_Y + v.row * ROW_SPACING + formatieRef.current.y;
        return py + ENEMY_H >= INVASIE_Y;
      });
      if (invasieBereikt) {
        setHoogsteScore((h) => Math.max(h, scoreRef.current));
        setScherm("game-over");
        teken();
        return;
      }

      if (vijandenRef.current.every((v) => !v.alive)) {
        setScherm("golf-klaar");
        teken();
        return;
      }

      teken();
    }, TICK_MS);

    return () => clearInterval(interval);
  }, [scherm, teken, setHoogsteScore]);

  useEffect(() => {
    function opToetsDown(e: KeyboardEvent) {
      if (["ArrowLeft", "a", "A"].includes(e.key)) linksActiefRef.current = true;
      if (["ArrowRight", "d", "D"].includes(e.key)) rechtsActiefRef.current = true;
    }
    function opToetsUp(e: KeyboardEvent) {
      if (["ArrowLeft", "a", "A"].includes(e.key)) linksActiefRef.current = false;
      if (["ArrowRight", "d", "D"].includes(e.key)) rechtsActiefRef.current = false;
    }
    window.addEventListener("keydown", opToetsDown);
    window.addEventListener("keyup", opToetsUp);
    return () => {
      window.removeEventListener("keydown", opToetsDown);
      window.removeEventListener("keyup", opToetsUp);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function naarCanvasX(clientX: number): number {
      const rect = canvas!.getBoundingClientRect();
      const schaal = W / rect.width;
      return (clientX - rect.left) * schaal;
    }

    function opStart(e: TouchEvent) {
      const t = e.touches[0];
      playerXRef.current = Math.max(4, Math.min(W - PLAYER_W - 4, naarCanvasX(t.clientX) - PLAYER_W / 2));
    }

    function opMove(e: TouchEvent) {
      e.preventDefault();
      const t = e.touches[0];
      playerXRef.current = Math.max(4, Math.min(W - PLAYER_W - 4, naarCanvasX(t.clientX) - PLAYER_W / 2));
    }

    canvas.addEventListener("touchstart", opStart, { passive: true });
    canvas.addEventListener("touchmove", opMove, { passive: false });
    return () => {
      canvas.removeEventListener("touchstart", opStart);
      canvas.removeEventListener("touchmove", opMove);
    };
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-sm text-diepblauw-800">
        <span key={score} className="animate-pop-in font-semibold">
          Score: {score}
        </span>
        <span>Golf {golf}</span>
        <span aria-label={`${levens} levens over`}>
          {Array.from({ length: START_LEVENS }, (_, i) => (i < levens ? "🛡️" : "💥")).join(" ")}
        </span>
      </div>

      <div className="relative overflow-hidden rounded-xl2 shadow-card">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          className="block w-full select-none"
          style={{ aspectRatio: `${W} / ${H}`, touchAction: "none" }}
        />

        {scherm === "start" && (
          <div className="animate-pop-in absolute inset-0 flex flex-col items-center justify-center gap-3 bg-diepblauw-900/85 p-4 text-center text-white">
            <p className="text-3xl" aria-hidden>
              👾
            </p>
            <p className="font-display text-lg font-semibold text-[#39ff8f]">Bart&apos;s Firewall Invaders</p>
            <p className="text-sm text-white/80">
              Schuif je firewall heen en weer en houd de bugs en virussen tegen voor ze je
              netwerk bereiken!
            </p>
            <button
              type="button"
              onClick={start}
              className="focus-ring mt-1 rounded-full bg-koraal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-card hover:bg-koraal-600"
            >
              Start spel
            </button>
            {hoogsteScore > 0 && <p className="text-xs text-white/50">Hoogste score: {hoogsteScore}</p>}
          </div>
        )}

        {scherm === "golf-klaar" && (
          <div className="animate-pop-in absolute inset-0 flex flex-col items-center justify-center gap-2 bg-diepblauw-900/85 p-4 text-center text-white">
            <p className="text-4xl" aria-hidden>
              🎉
            </p>
            <p className="font-display text-lg font-semibold">Golf {golf} opgeruimd!</p>
            <p className="text-sm text-[#39ff8f]">+{golfBonusGetoond} bonuspunten</p>
          </div>
        )}

        {scherm === "game-over" && (
          <div className="animate-pop-in absolute inset-0 flex flex-col items-center justify-center gap-2 bg-diepblauw-900/85 p-4 text-center text-white">
            <p className="text-3xl" aria-hidden>
              💥
            </p>
            <p className="font-display text-lg font-semibold">Netwerk gehackt! Game over.</p>
            <p className="text-sm text-white/80">Eindscore: {score}</p>
            <p className="text-sm text-white/80">Hoogste score: {hoogsteScore}</p>
            <button
              type="button"
              onClick={start}
              className="focus-ring mt-1 rounded-full bg-koraal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-card hover:bg-koraal-600"
            >
              Opnieuw spelen
            </button>
          </div>
        )}
      </div>

      {scherm === "spelen" && (
        <>
          <p className="text-center text-xs text-diepblauw-700/50">
            Sleep op het speelveld om de firewall te sturen (of gebruik de pijltjestoetsen /
            WASD). Er wordt automatisch gevuurd.
          </p>
          <div className="mx-auto flex max-w-[220px] gap-3">
            <button
              type="button"
              onPointerDown={() => (linksActiefRef.current = true)}
              onPointerUp={() => (linksActiefRef.current = false)}
              onPointerLeave={() => (linksActiefRef.current = false)}
              aria-label="Links"
              className="focus-ring flex h-11 flex-1 items-center justify-center rounded-xl bg-white text-lg shadow-card active:scale-95"
            >
              ⬅️
            </button>
            <button
              type="button"
              onPointerDown={() => (rechtsActiefRef.current = true)}
              onPointerUp={() => (rechtsActiefRef.current = false)}
              onPointerLeave={() => (rechtsActiefRef.current = false)}
              aria-label="Rechts"
              className="focus-ring flex h-11 flex-1 items-center justify-center rounded-xl bg-white text-lg shadow-card active:scale-95"
            >
              ➡️
            </button>
          </div>
        </>
      )}
    </div>
  );
}
