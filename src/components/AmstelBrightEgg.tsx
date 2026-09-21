"use client";

import { useRef, useState } from "react";
import type { CSSProperties } from "react";

const AANTAL_FLESJES = 18;

function Flesje({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 40 100" className={className} style={style} aria-hidden>
      <rect x="16" y="2" width="8" height="8" rx="1.5" fill="#3a2a12" />
      <path d="M15 10 h10 v10 l3 6 v4 h-16 v-4 l3 -6 z" fill="#f4d35e" />
      <path
        d="M9 30 q0 -4 4 -4 h14 q4 0 4 4 l3 8 q3 6 3 14 v34 q0 8 -8 8 h-18 q-8 0 -8 -8 v-34 q0 -8 3 -14 z"
        fill="#f7e17d"
        stroke="#d9a91f"
        strokeWidth="1"
      />
      <rect x="6" y="58" width="28" height="22" fill="#f0803a" />
      <rect x="6" y="58" width="28" height="4" fill="#ffffff" opacity="0.5" />
    </svg>
  );
}

interface Regendruppel {
  left: number;
  duur: number;
  vertraging: number;
  breedte: number;
}

function maakRegen(): Regendruppel[] {
  return Array.from({ length: AANTAL_FLESJES }, () => ({
    left: Math.random() * 96,
    duur: 3 + Math.random() * 2.5,
    vertraging: Math.random() * 3,
    breedte: 22 + Math.random() * 18,
  }));
}

export function AmstelBrightEgg() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [regent, setRegent] = useState(false);
  const [druppels, setDruppels] = useState<Regendruppel[]>(() => maakRegen());

  function stop() {
    setRegent(false);
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }

  function start() {
    setDruppels(maakRegen());
    setRegent(true);
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {
        // Autoplay-restricties: negeren, de gebruiker heeft net zelf getikt dus dit hoort te lukken.
      });
    }
  }

  function tikken() {
    if (regent) stop();
    else start();
  }

  return (
    <div className="flex justify-center pt-2">
      <button
        type="button"
        onClick={tikken}
        aria-label={regent ? "Zet de flesjesregen uit" : "Geheim: tik voor een flesjesregen"}
        aria-pressed={regent}
        className="focus-ring flex h-12 w-12 items-center justify-center rounded-full bg-white/70 p-1.5 shadow-sm transition hover:bg-white"
      >
        <Flesje className="h-full w-auto" />
      </button>

      {regent && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {druppels.map((d, i) => (
            <Flesje
              key={i}
              className="animate-flesjes-regen absolute top-0 drop-shadow-lg"
              style={{
                left: `${d.left}vw`,
                width: `${d.breedte}px`,
                height: "auto",
                animationDuration: `${d.duur}s`,
                animationDelay: `${d.vertraging}s`,
              }}
            />
          ))}
          <button
            type="button"
            onClick={stop}
            className="focus-ring fixed right-4 top-4 z-[60] rounded-full bg-white px-4 py-2 text-sm font-semibold text-diepblauw-800 shadow-floating"
          >
            ✕ Zet uit
          </button>
        </div>
      )}

      <audio ref={audioRef} src="/easter-egg/amstel-tune.mp3" onEnded={stop} preload="none" />
    </div>
  );
}
