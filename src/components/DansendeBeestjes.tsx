"use client";

import { useRef, useState } from "react";

export function DansendeBeestjes() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [danst, setDanst] = useState(false);

  function speelAf() {
    setDanst(true);
    const audio = audioRef.current;
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
        onClick={speelAf}
        aria-label="Geheim: tik voor een dansje"
        className={`absolute -bottom-3 -right-2 h-14 w-14 overflow-hidden rounded-full border-2 border-white shadow-floating focus-ring ${
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
