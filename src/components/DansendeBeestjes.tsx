"use client";

import { useEffect, useRef, useState } from "react";

const BEESTJES = [
  "/easter-egg/beestje-8.webp",
  "/easter-egg/beestje-9.webp",
  "/easter-egg/beestje-10.webp",
  "/easter-egg/beestje-11.webp",
  "/easter-egg/beestje-12.webp",
  "/easter-egg/beestje-13.webp",
  "/easter-egg/beestje-14.webp",
];

interface Positie {
  x: number;
  y: number;
}

function willekeurigePositie(): Positie {
  return { x: 6 + Math.random() * 82, y: 10 + Math.random() * 72 };
}

function nieuwePosities(): Positie[] {
  return Array.from({ length: BEESTJES.length }, willekeurigePositie);
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
    intervalsRef.current = Array.from({ length: BEESTJES.length }, (_, i) =>
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
        <img src={BEESTJES[0]} alt="" aria-hidden className="h-full w-full object-contain p-1.5" />
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
