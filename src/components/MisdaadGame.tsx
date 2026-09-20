"use client";

import { useState } from "react";
import { useLocalStorage } from "@/lib/useLocalStorage";

interface Verdachte {
  naam: string;
  emoji: string;
  hoed: string;
  kleur: string;
  gezicht: string;
  schoenen: string;
}

type Kenmerk = "hoed" | "kleur" | "gezicht" | "schoenen";

const KENMERK_LABELS: Record<Kenmerk, string> = {
  hoed: "Hoofddeksel",
  kleur: "Kleur shirt",
  gezicht: "Kenmerk",
  schoenen: "Schoeisel",
};

const KENMERKEN: Kenmerk[] = ["hoed", "kleur", "gezicht", "schoenen"];

const VERDACHTEN: Verdachte[] = [
  { naam: "Kapitein Kokosnoot", emoji: "🥥", hoed: "pet", kleur: "rood", gezicht: "snor", schoenen: "sandalen" },
  { naam: "Zonnebril Sanne", emoji: "😎", hoed: "geen hoofddeksel", kleur: "geel", gezicht: "zonnebril", schoenen: "slippers" },
  { naam: "Stille Stan", emoji: "🤫", hoed: "strohoed", kleur: "blauw", gezicht: "bril", schoenen: "sneakers" },
  { naam: "Dansende Denise", emoji: "💃", hoed: "bloemenkrans", kleur: "roze", gezicht: "brede lach", schoenen: "blote voeten" },
  { naam: "Mysterieuze Max", emoji: "🕵️", hoed: "hoge hoed", kleur: "zwart", gezicht: "baard", schoenen: "laarzen" },
  { naam: "Zingende Zara", emoji: "🎤", hoed: "zonnehoed", kleur: "groen", gezicht: "sproeten", schoenen: "sandalen" },
  { naam: "Grappige Guus", emoji: "🤡", hoed: "pet achterstevoren", kleur: "oranje", gezicht: "snor", schoenen: "slippers" },
  { naam: "Chille Charlie", emoji: "🏖️", hoed: "geen hoofddeksel", kleur: "wit", gezicht: "zonnebril", schoenen: "blote voeten" },
];

const MISDAADJES: string[] = [
  "De laatste cocktail van de avond is spoorloos verdwenen!",
  "Iemands zonnebrand is helemaal op — en niemand geeft het toe.",
  "De strandbal is gejat tijdens het middagdutje.",
  "De sleutels van het vakantiehuis zijn zoek!",
  "Er ontbreekt een hele zak chips uit de keuken.",
  "Iemand heeft stiekem de beste ligstoel ingepikt.",
  "De laatste snorkel is verdwenen, vlak voor het uitje.",
  "Er is een geheimzinnige hap uit de verjaardagstaart genomen.",
];

const MAX_FOUTEN = 3;

function shuffle<T>(arr: T[]): T[] {
  const kopie = [...arr];
  for (let i = kopie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [kopie[i], kopie[j]] = [kopie[j], kopie[i]];
  }
  return kopie;
}

export function MisdaadGame() {
  const [status, setStatus] = useState<"idle" | "spelen" | "afgelopen">("idle");
  const [score, setScore] = useState(0);
  const [ronde, setRonde] = useState(1);
  const [fouten, setFouten] = useState(0);
  const { waarde: hoogsteScore, bijwerken: setHoogsteScore } = useLocalStorage(
    "bonaire-misdaad-highscore",
    0
  );

  const [dief, setDief] = useState(0);
  const [clueVolgorde, setClueVolgorde] = useState<Kenmerk[]>(KENMERKEN);
  const [cluesRevealed, setCluesRevealed] = useState(1);
  const [geelimineerd, setGeelimineerd] = useState<Set<number>>(new Set());
  const [misdaad, setMisdaad] = useState(MISDAADJES[0]);

  function nieuweRonde() {
    setDief(Math.floor(Math.random() * VERDACHTEN.length));
    setClueVolgorde(shuffle(KENMERKEN));
    setCluesRevealed(1);
    setGeelimineerd(new Set());
    setMisdaad(MISDAADJES[Math.floor(Math.random() * MISDAADJES.length)]);
  }

  function start() {
    setScore(0);
    setRonde(1);
    setFouten(0);
    nieuweRonde();
    setStatus("spelen");
  }

  function volgendeAanwijzing() {
    setCluesRevealed((c) => Math.min(KENMERKEN.length, c + 1));
  }

  function tikVerdachte(i: number) {
    if (status !== "spelen" || geelimineerd.has(i)) return;

    if (i === dief) {
      const punten = Math.max(1, KENMERKEN.length + 1 - cluesRevealed);
      const nieuweScore = score + punten;
      setScore(nieuweScore);
      setHoogsteScore((h) => Math.max(h, nieuweScore));
      setRonde((r) => r + 1);
      nieuweRonde();
    } else {
      setGeelimineerd((prev) => new Set(prev).add(i));
      const nieuweFouten = fouten + 1;
      setFouten(nieuweFouten);
      if (nieuweFouten >= MAX_FOUTEN) {
        setStatus("afgelopen");
      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-diepblauw-800">Score: {score}</span>
        {status === "spelen" ? (
          <span className="text-diepblauw-700/60">
            Ronde {ronde} ·{" "}
            {Array.from({ length: MAX_FOUTEN }, (_, i) => (i < MAX_FOUTEN - fouten ? "❤️" : "🤍")).join("")}
          </span>
        ) : (
          <span className="text-diepblauw-700/60">Hoogste: {hoogsteScore}</span>
        )}
      </div>

      <div className="relative overflow-hidden rounded-xl2 bg-diepblauw-900 p-4 text-white shadow-card">
        {status === "spelen" && (
          <div className="space-y-3">
            <p className="rounded-xl bg-white/10 p-3 text-sm font-medium">🚨 Melding: {misdaad}</p>

            <ul className="space-y-1.5">
              {clueVolgorde.slice(0, cluesRevealed).map((k) => (
                <li key={k} className="rounded-lg bg-white/5 px-3 py-2 text-sm">
                  <span className="font-semibold text-zon-200">{KENMERK_LABELS[k]}:</span>{" "}
                  {VERDACHTEN[dief][k]}
                </li>
              ))}
            </ul>

            {cluesRevealed < KENMERKEN.length && (
              <button
                type="button"
                onClick={volgendeAanwijzing}
                className="focus-ring rounded-full bg-white/15 px-4 py-2 text-sm font-medium hover:bg-white/25"
              >
                Volgende aanwijzing
              </button>
            )}

            <div className="grid grid-cols-2 gap-2 pt-1">
              {VERDACHTEN.map((v, i) => (
                <button
                  key={v.naam}
                  type="button"
                  onClick={() => tikVerdachte(i)}
                  disabled={geelimineerd.has(i)}
                  className={`focus-ring flex items-center gap-2 rounded-xl p-2.5 text-left text-sm transition ${
                    geelimineerd.has(i)
                      ? "bg-white/5 text-white/30 line-through"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  <span className="text-xl" aria-hidden>
                    {v.emoji}
                  </span>
                  <span>{v.naam}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {status !== "spelen" && (
          <div className="flex min-h-[22rem] flex-col items-center justify-center gap-3 p-4 text-center">
            {status === "idle" && (
              <p className="font-display text-lg font-semibold">
                🕵️ Los de zaak op — kies de verdachte die bij alle aanwijzingen past!
              </p>
            )}
            {status === "afgelopen" && (
              <p className="font-display text-lg font-semibold">
                🚔 Zaak gesloten na {ronde - 1} opgeloste ronde{ronde - 1 === 1 ? "" : "s"}. Score: {score}
              </p>
            )}
            <button
              type="button"
              onClick={start}
              className="focus-ring rounded-full bg-koraal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-card hover:bg-koraal-600"
            >
              {status === "idle" ? "Start" : "Opnieuw"}
            </button>
          </div>
        )}
      </div>

      <p className="text-center text-xs text-diepblauw-700/50">
        Tik op de verdachte die bij alle aanwijzingen past. Drie misgokjes en de zaak is gesloten.
      </p>
    </div>
  );
}
