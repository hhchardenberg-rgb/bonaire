"use client";

import { useEffect, useState } from "react";

const SLEUTEL = "bonaire-install-hint-gezien";

export function InstallHint() {
  const [tonen, setTonen] = useState(false);

  useEffect(() => {
    try {
      const isIos = /iphone|ipod/.test(window.navigator.userAgent.toLowerCase());
      const isStandalone =
        (window.navigator as unknown as { standalone?: boolean }).standalone === true ||
        window.matchMedia("(display-mode: standalone)").matches;
      const algGezien = window.localStorage.getItem(SLEUTEL) === "1";
      setTonen(isIos && !isStandalone && !algGezien);
    } catch {
      // localStorage niet beschikbaar: geen probleem, toon dan niets
    }
  }, []);

  function sluiten() {
    setTonen(false);
    try {
      window.localStorage.setItem(SLEUTEL, "1");
    } catch {
      // negeren
    }
  }

  if (!tonen) return null;

  return (
    <div className="fixed inset-x-0 bottom-20 z-40 mx-auto max-w-xl px-4">
      <div className="flex items-start gap-3 rounded-xl2 bg-diepblauw-800 p-3.5 text-white shadow-floating">
        <span className="text-xl" aria-hidden>
          📲
        </span>
        <p className="flex-1 text-xs leading-relaxed">
          Voeg dit boekje toe aan je beginscherm: tik op het deel-icoon{" "}
          <span aria-hidden>⬆️</span> onderin Safari en kies &ldquo;Zet op beginscherm&rdquo;.
        </p>
        <button
          type="button"
          onClick={sluiten}
          aria-label="Sluiten"
          className="focus-ring -mt-1 -mr-1 rounded-full p-1 text-white/70 hover:text-white"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
