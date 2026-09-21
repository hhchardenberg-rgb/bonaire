"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

const BEESTJES = [
  "/easter-egg/beestje-1.webp",
  "/easter-egg/beestje-2.webp",
  "/easter-egg/beestje-3.webp",
  "/easter-egg/beestje-4.webp",
  "/easter-egg/beestje-5.webp",
  "/easter-egg/beestje-6.webp",
  "/easter-egg/beestje-7.webp",
  "/easter-egg/beestje-8.webp",
  "/easter-egg/beestje-9.webp",
  "/easter-egg/beestje-10.webp",
  "/easter-egg/beestje-11.webp",
  "/easter-egg/beestje-12.webp",
  "/easter-egg/beestje-13.webp",
  "/easter-egg/beestje-14.webp",
];

const AANTAL_DANSERS = BEESTJES.length + 1; // +1 voor het koraalbeestje

interface Positie {
  x: number;
  y: number;
}

function willekeurigePositie(): Positie {
  return { x: 6 + Math.random() * 82, y: 10 + Math.random() * 72 };
}

function nieuwePosities(): Positie[] {
  return Array.from({ length: AANTAL_DANSERS }, willekeurigePositie);
}

function Koraalbeestje({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 120 100" className={className} style={style} aria-hidden>
      <g stroke="#a8531f" strokeWidth="6" strokeLinecap="round" fill="none">
        <path d="M55 45 C35 35, 20 25, 8 12" />
        <path d="M55 45 C30 40, 15 40, 4 34" />
        <path d="M55 45 C32 50, 18 58, 10 70" />
        <path d="M65 45 C85 35, 100 25, 112 12" />
        <path d="M65 45 C90 40, 105 40, 116 34" />
        <path d="M65 45 C88 50, 102 58, 110 70" />
        <path d="M60 55 C55 70, 50 82, 44 92" />
        <path d="M60 55 C68 72, 74 82, 80 90" />
      </g>
      <g fill="#e0a458">
        <circle cx="8" cy="12" r="6" />
        <circle cx="4" cy="34" r="5" />
        <circle cx="10" cy="70" r="5" />
        <circle cx="112" cy="12" r="6" />
        <circle cx="116" cy="34" r="5" />
        <circle cx="110" cy="70" r="5" />
        <circle cx="44" cy="92" r="5" />
        <circle cx="80" cy="90" r="5" />
      </g>
      <ellipse cx="60" cy="46" rx="22" ry="18" fill="#4f83c4" />
      <circle cx="52" cy="42" r="3" fill="#182c47" />
      <circle cx="68" cy="42" r="3" fill="#182c47" />
      <path d="M53 52 q7 5 14 0" stroke="#182c47" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="47" cy="52" r="7" fill="#c084e8" />
      <circle cx="60" cy="58" r="7" fill="#3fc9bf" />
      <circle cx="73" cy="52" r="6" fill="#71dfd6" />
    </svg>
  );
}

export function DansendeBeestjes() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const intervalsRef = useRef<ReturnType<typeof setInterval>[]>([]);
  const [danst, setDanst] = useState(false);
  const [posities, setPosities] = useState<Positie[]>(() => nieuwePosities());

  function stop() {
    setDanst(false);
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    intervalsRef.current.forEach(clearInterval);
    intervalsRef.current = [];
  }

  function start() {
    setPosities(nieuwePosities());
    setDanst(true);
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {
        // Autoplay-restricties: negeren, de gebruiker heeft net zelf getikt dus dit hoort te lukken.
      });
    }
    intervalsRef.current = Array.from({ length: AANTAL_DANSERS }, (_, i) =>
      setInterval(
        () => {
          setPosities((huidig) => {
            const nieuw = [...huidig];
            nieuw[i] = willekeurigePositie();
            return nieuw;
          });
        },
        1600 + Math.random() * 1400
      )
    );
  }

  function tikken() {
    if (danst) stop();
    else start();
  }

  useEffect(() => {
    return () => {
      intervalsRef.current.forEach(clearInterval);
    };
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={tikken}
        aria-label={danst ? "Zet het dansfeest uit" : "Geheim: tik voor een dansfeest"}
        aria-pressed={danst}
        className={`absolute -bottom-3 right-3 h-14 w-14 overflow-hidden rounded-full border-2 border-white bg-white shadow-floating focus-ring ${
          danst ? "animate-dance" : "animate-bob"
        }`}
      >
        <img src="/easter-egg/beestje-1.webp" alt="" aria-hidden className="h-full w-full object-contain p-1.5" />
      </button>

      {danst && (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden bg-diepblauw-900/25 backdrop-blur-[1px]">
          {BEESTJES.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              aria-hidden
              className="animate-dance absolute h-16 w-16 object-contain drop-shadow-lg sm:h-20 sm:w-20"
              style={{
                left: `${posities[i].x}vw`,
                top: `${posities[i].y}vh`,
                transition: "left 1.6s ease-in-out, top 1.6s ease-in-out",
              }}
            />
          ))}
          <Koraalbeestje
            className="animate-dance absolute h-20 w-20 object-contain drop-shadow-lg sm:h-24 sm:w-24"
            style={{
              left: `${posities[BEESTJES.length].x}vw`,
              top: `${posities[BEESTJES.length].y}vh`,
              transition: "left 1.6s ease-in-out, top 1.6s ease-in-out",
            }}
          />
          <button
            type="button"
            onClick={stop}
            className="focus-ring pointer-events-auto fixed right-4 top-4 z-[60] rounded-full bg-white px-4 py-2 text-sm font-semibold text-diepblauw-800 shadow-floating"
          >
            ✕ Stop het dansfeest
          </button>
        </div>
      )}

      <audio ref={audioRef} src="/easter-egg/dansliedje.mp3" onEnded={stop} preload="none" />
    </>
  );
}
