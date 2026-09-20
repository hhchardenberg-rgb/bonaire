"use client";

import { useEffect, useState } from "react";

const NL_ZONE = "Europe/Amsterdam";
const BONAIRE_ZONE = "America/Kralendijk";

function haalOffsetUren(datum: Date, timeZone: string): number {
  const deel = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "shortOffset" })
    .formatToParts(datum)
    .find((p) => p.type === "timeZoneName")?.value;
  const match = deel?.match(/GMT([+-]\d+)/);
  return match ? Number(match[1]) : 0;
}

function berekenTijden() {
  const nu = new Date();
  const opties: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", hour12: false };
  const nlTijd = new Intl.DateTimeFormat("nl-NL", { ...opties, timeZone: NL_ZONE }).format(nu);
  const bonaireTijd = new Intl.DateTimeFormat("nl-NL", { ...opties, timeZone: BONAIRE_ZONE }).format(nu);
  const verschil = haalOffsetUren(nu, NL_ZONE) - haalOffsetUren(nu, BONAIRE_ZONE);
  return { nlTijd, bonaireTijd, verschil };
}

export function TijdverschilLive() {
  // Start als `null`: pas na het mounten (client-only) berekenen, zodat server-
  // en clientrender hetzelfde zijn en er geen hydration-mismatch ontstaat.
  const [tijden, setTijden] = useState<ReturnType<typeof berekenTijden> | null>(null);

  useEffect(() => {
    setTijden(berekenTijden());
    const interval = setInterval(() => setTijden(berekenTijden()), 30_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-xl bg-turquoise-50 p-3 text-sm text-diepblauw-800">
      {tijden ? (
        <>
          <p>
            Nu in Nederland: <span className="font-semibold">{tijden.nlTijd}</span> · Op Bonaire:{" "}
            <span className="font-semibold">{tijden.bonaireTijd}</span>
          </p>
          <p className="mt-1">
            Bonaire loopt op dit moment <span className="font-semibold">{tijden.verschil} uur</span> achter op
            Nederland.
          </p>
        </>
      ) : (
        <p>Actueel tijdverschil wordt geladen…</p>
      )}
    </div>
  );
}
