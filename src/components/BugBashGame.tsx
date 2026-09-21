"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocalStorage } from "@/lib/useLocalStorage";

type Server = "leeg" | "bug" | "virus" | "koffie" | "gebruiker";

const AANTAL_SERVERS = 9;
const ROND_SECONDEN = 30;
const MAX_TEGELIJK = 2;
const LEVENSDUUR_MIN = 750;
const LEVENSDUUR_MAX = 1150;
const SPAWN_MIN = 420;
const SPAWN_MAX = 720;
const MAX_CRASHES = 3;

const KANSEN: { soort: Server; kans: number }[] = [
  { soort: "bug", kans: 0.55 },
  { soort: "virus", kans: 0.2 },
  { soort: "koffie", kans: 0.1 },
  { soort: "gebruiker", kans: 0.15 },
];

function kiesSoort(): Server {
  const r = Math.random();
  let cumulatief = 0;
  for (const { soort, kans } of KANSEN) {
    cumulatief += kans;
    if (r < cumulatief) return soort;
  }
  return "bug";
}

const EMOJI: Record<Exclude<Server, "leeg">, string> = {
  bug: "🐛",
  virus: "👾",
  koffie: "☕",
  gebruiker: "😠",
};

const LABEL: Record<Exclude<Server, "leeg">, string> = {
  bug: "Bug — tik snel weg!",
  virus: "Virus — extra punten, tik 'm weg!",
  koffie: "Koffie — bonuspunten!",
  gebruiker: "Boze gebruiker — niet tikken!",
};

export function BugBashGame() {
  const [status, setStatus] = useState<"idle" | "spelen" | "afgelopen">("idle");
  const [score, setScore] = useState(0);
  const [servers, setServers] = useState<Server[]>(Array(AANTAL_SERVERS).fill("leeg"));
  const [resterendeTijd, setResterendeTijd] = useState(ROND_SECONDEN);
  const [crashes, setCrashes] = useState(0);
  const { waarde: hoogsteScore, bijwerken: setHoogsteScore } = useLocalStorage(
    "bonaire-bugbash-highscore",
    0
  );

  const serversRef = useRef<Server[]>(Array(AANTAL_SERVERS).fill("leeg"));
  const totdatRef = useRef<number[]>(Array(AANTAL_SERVERS).fill(0));
  const volgendeSpawnRef = useRef(0);
  const startTijdRef = useRef(0);
  const scoreRef = useRef(0);
  const crashesRef = useRef(0);
  const statusRef = useRef(status);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  const reset = useCallback(() => {
    serversRef.current = Array(AANTAL_SERVERS).fill("leeg");
    totdatRef.current = Array(AANTAL_SERVERS).fill(0);
    volgendeSpawnRef.current = Date.now() + 300;
    startTijdRef.current = Date.now();
    scoreRef.current = 0;
    crashesRef.current = 0;
    setServers(Array(AANTAL_SERVERS).fill("leeg"));
    setScore(0);
    setCrashes(0);
    setResterendeTijd(ROND_SECONDEN);
    setStatus("spelen");
  }, []);

  useEffect(() => {
    if (status !== "spelen") return;

    const interval = setInterval(() => {
      const nu = Date.now();
      let gewijzigd = false;

      for (let i = 0; i < AANTAL_SERVERS; i++) {
        if (totdatRef.current[i] !== 0 && nu >= totdatRef.current[i]) {
          serversRef.current[i] = "leeg";
          totdatRef.current[i] = 0;
          gewijzigd = true;
        }
      }

      if (nu >= volgendeSpawnRef.current) {
        const actief = serversRef.current.filter((h) => h !== "leeg").length;
        const legeIndices = serversRef.current
          .map((h, i) => (h === "leeg" ? i : -1))
          .filter((i) => i !== -1);
        if (actief < MAX_TEGELIJK && legeIndices.length > 0) {
          const idx = legeIndices[Math.floor(Math.random() * legeIndices.length)];
          serversRef.current[idx] = kiesSoort();
          totdatRef.current[idx] =
            nu + LEVENSDUUR_MIN + Math.random() * (LEVENSDUUR_MAX - LEVENSDUUR_MIN);
          gewijzigd = true;
        }
        volgendeSpawnRef.current = nu + SPAWN_MIN + Math.random() * (SPAWN_MAX - SPAWN_MIN);
      }

      if (gewijzigd) {
        setServers([...serversRef.current]);
      }

      const verstreken = Math.floor((nu - startTijdRef.current) / 1000);
      const over = Math.max(0, ROND_SECONDEN - verstreken);
      setResterendeTijd(over);
      if (over <= 0) {
        setStatus("afgelopen");
      }
    }, 100);

    return () => clearInterval(interval);
  }, [status]);

  useEffect(() => {
    if (status === "afgelopen") {
      setHoogsteScore((h) => Math.max(h, scoreRef.current));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const tik = useCallback((i: number) => {
    if (statusRef.current !== "spelen") return;
    const soort = serversRef.current[i];
    if (soort === "leeg") return;
    serversRef.current[i] = "leeg";
    totdatRef.current[i] = 0;
    setServers([...serversRef.current]);
    if (soort === "bug") {
      setScore((s) => s + 1);
    } else if (soort === "virus") {
      setScore((s) => s + 3);
    } else if (soort === "koffie") {
      setScore((s) => s + 5);
    } else {
      setScore((s) => Math.max(0, s - 1));
      crashesRef.current += 1;
      setCrashes(crashesRef.current);
      if (crashesRef.current >= MAX_CRASHES) {
        setStatus("afgelopen");
      }
    }
  }, []);

  useEffect(() => {
    function opToets(e: KeyboardEvent) {
      const n = Number(e.key);
      if (n >= 1 && n <= AANTAL_SERVERS) {
        e.preventDefault();
        tik(n - 1);
      }
    }
    window.addEventListener("keydown", opToets);
    return () => window.removeEventListener("keydown", opToets);
  }, [tik]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-diepblauw-800">Score: {score}</span>
        {status === "spelen" ? (
          <span className="text-diepblauw-700/60">
            Tijd: {resterendeTijd}s · 💥 {crashes}/{MAX_CRASHES}
          </span>
        ) : (
          <span className="text-diepblauw-700/60">Hoogste: {hoogsteScore}</span>
        )}
      </div>

      <div className="relative overflow-hidden rounded-xl2 shadow-card">
        <div className="grid grid-cols-3 gap-2 bg-[#141b33] p-3">
          {servers.map((server, i) => (
            <button
              key={i}
              type="button"
              onClick={() => tik(i)}
              disabled={status !== "spelen"}
              aria-label={server === "leeg" ? "Lege server" : LABEL[server]}
              className="focus-ring flex aspect-square items-center justify-center rounded-xl bg-[#1f2947] text-3xl shadow-inner ring-1 ring-turquoise-400/20 transition active:scale-95"
            >
              {server !== "leeg" && <span aria-hidden>{EMOJI[server]}</span>}
            </button>
          ))}
        </div>

        {status !== "spelen" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-diepblauw-900/85 p-4 text-center text-white">
            {status === "idle" && (
              <p className="font-display text-lg font-semibold">
                🐛 Tik de bugs en virussen weg voordat de server crasht — maar tik nooit op de boze
                gebruiker!
              </p>
            )}
            {status === "afgelopen" && crashes >= MAX_CRASHES && (
              <p className="font-display text-lg font-semibold">
                💥 Drie keer de boze gebruiker geraakt! Game over. Score: {score}
              </p>
            )}
            {status === "afgelopen" && crashes < MAX_CRASHES && (
              <p className="font-display text-lg font-semibold">⏰ Tijd om! Score: {score}</p>
            )}
            <button
              type="button"
              onClick={reset}
              className="focus-ring rounded-full bg-koraal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-card hover:bg-koraal-600"
            >
              {status === "idle" ? "Start" : "Opnieuw"}
            </button>
          </div>
        )}
      </div>

      <p className="text-center text-xs text-diepblauw-700/50">
        Tik op een bug 🐛 of virus 👾 zodra die verschijnt (of gebruik de cijfertoetsen 1-9). Koffie
        ☕ geeft bonuspunten. Dertig seconden de tijd — maar drie keer de boze gebruiker 😠 geraakt
        en het is meteen game over.
      </p>
    </div>
  );
}
