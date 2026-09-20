"use client";

import { useEffect } from "react";

// Vangt "ChunkLoadError"-achtige fouten op die ontstaan wanneer een browser na
// een nieuwe deploy nog een oude paginaversie in het geheugen heeft en een
// bestandsnaam probeert te laden die niet meer bestaat. Dit gebeurt buiten
// React's eigen rendering om (in event handlers/async code), dus geen enkele
// error boundary vangt dit anders af — de gebruiker zou dan de kale
// "Application error"-melding van Next.js te zien krijgen.
const PATROON =
  /ChunkLoadError|Loading chunk [\w-]+ failed|Importing a module script failed|dynamically imported module/i;
const SLEUTEL = "bonaire-laatste-chunk-reload";
const MIN_TUSSENPOZE_MS = 10_000;

function magHerladen(): boolean {
  try {
    const laatste = Number(sessionStorage.getItem(SLEUTEL) || 0);
    return Date.now() - laatste > MIN_TUSSENPOZE_MS;
  } catch {
    return true;
  }
}

function herlaad() {
  try {
    sessionStorage.setItem(SLEUTEL, String(Date.now()));
  } catch {
    // sessionStorage kan geblokkeerd zijn (bv. privénavigatie) — dan gewoon herladen.
  }
  window.location.reload();
}

export function ChunkErrorGuard() {
  useEffect(() => {
    function opFout(event: ErrorEvent) {
      if (PATROON.test(event.message) && magHerladen()) herlaad();
    }
    function opRejection(event: PromiseRejectionEvent) {
      const reden = event.reason instanceof Error ? event.reason.message : String(event.reason);
      if (PATROON.test(reden) && magHerladen()) herlaad();
    }
    window.addEventListener("error", opFout);
    window.addEventListener("unhandledrejection", opRejection);
    return () => {
      window.removeEventListener("error", opFout);
      window.removeEventListener("unhandledrejection", opRejection);
    };
  }, []);

  return null;
}
