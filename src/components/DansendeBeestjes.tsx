"use client";

import { useRef, useState } from "react";

export function DansendeBeestjes() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [danst, setDanst] = useState(false);

  function tikken() {
    const audio = audioRef.current;
    if (danst) {
      // Al aan het dansen/spelen: tweede tik zet het muziekje weer uit.
      setDanst(false);
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      return;
    }
    setDanst(true);
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {
        // Autoplay-restricties: negeren, de gebruiker heeft net zelf getikt dus dit hoort te lukken.
      });
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={tikken}
        aria-label={danst ? "Zet het muziekje uit" : "Geheim: tik voor een dansje"}
        aria-pressed={danst}
        className={`absolute -bottom-3 right-3 h-14 w-14 overflow-hidden rounded-full border-2 border-white shadow-floating focus-ring ${
          danst ? "animate-dance" : "animate-bob"
        }`}
      >
        <img
          src="/easter-egg/beestjes.webp"
          alt=""
          aria-hidden
          className="h-full w-full scale-[2.6] object-cover object-left"
        />
      </button>
      <audio
        ref={audioRef}
        src="/easter-egg/dansliedje.mp3"
        onEnded={() => setDanst(false)}
        preload="none"
      />
    </>
  );
}
