"use client";

import { useRef, useState } from "react";

const AANTAL_FLESJES = 18;
const FLESJE_SRC = "/easter-egg/amstel-bright.webp";

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
        <img src={FLESJE_SRC} alt="" aria-hidden className="h-full w-auto object-contain" />
      </button>

      {regent && (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
          {druppels.map((d, i) => (
            <img
              key={i}
              src={FLESJE_SRC}
              alt=""
              aria-hidden
              className="animate-flesjes-regen absolute top-0 object-contain drop-shadow-lg"
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
            className="focus-ring pointer-events-auto fixed right-4 top-4 z-[60] rounded-full bg-white px-4 py-2 text-sm font-semibold text-diepblauw-800 shadow-floating"
          >
            ✕ Zet uit
          </button>
        </div>
      )}

      <audio ref={audioRef} src="/easter-egg/amstel-tune.mp3" onEnded={stop} preload="none" />
    </div>
  );
}
