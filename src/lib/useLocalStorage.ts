"use client";

import { useEffect, useState, useCallback } from "react";

/**
 * Bewaart state in localStorage van de browser (per apparaat, niet gedeeld).
 * Val terug op de standaardwaarde als opslag niet beschikbaar is (privénavigatie e.d.).
 */
export function useLocalStorage<T>(sleutel: string, standaard: T) {
  const [waarde, setWaarde] = useState<T>(standaard);
  const [geladen, setGeladen] = useState(false);

  useEffect(() => {
    try {
      const opgeslagen = window.localStorage.getItem(sleutel);
      if (opgeslagen !== null) {
        setWaarde(JSON.parse(opgeslagen));
      }
    } catch {
      // negeren: gebruik standaardwaarde
    } finally {
      setGeladen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sleutel]);

  const bijwerken = useCallback(
    (nieuw: T | ((huidig: T) => T)) => {
      setWaarde((huidig) => {
        const resultaat =
          typeof nieuw === "function" ? (nieuw as (huidig: T) => T)(huidig) : nieuw;
        try {
          window.localStorage.setItem(sleutel, JSON.stringify(resultaat));
        } catch {
          // opslag vol of geblokkeerd: negeren, werkt wel voor deze sessie
        }
        return resultaat;
      });
    },
    [sleutel]
  );

  const wissen = useCallback(() => {
    try {
      window.localStorage.removeItem(sleutel);
    } catch {
      // negeren
    }
    setWaarde(standaard);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sleutel]);

  return { waarde, bijwerken, wissen, geladen };
}
