"use client";

import { useState } from "react";
import { BackLink } from "@/components/BackLink";
import { PageHeader } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";
import { dagelijkseQuotes } from "@/data/fun";
import { trip } from "@/data/trip";
import { useLocalStorage } from "@/lib/useLocalStorage";

interface Herinnering {
  id: string;
  tekst: string;
  emoji: string;
}

const emojiKeuzes = ["📸", "🌅", "🍹", "🤿", "😂", "🌴"];

export default function FotomuurPagina() {
  const { waarde: herinneringen, bijwerken } = useLocalStorage<Herinnering[]>("bonaire-herinneringen", []);
  const [tekst, setTekst] = useState("");
  const [emoji, setEmoji] = useState(emojiKeuzes[0]);

  const dagvanjaar = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );
  const quote = dagelijkseQuotes[dagvanjaar % dagelijkseQuotes.length];

  function toevoegen() {
    const waarde = tekst.trim();
    if (!waarde) return;
    bijwerken((huidig) => [{ id: `${Date.now()}`, tekst: waarde, emoji }, ...huidig]);
    setTekst("");
  }

  return (
    <div className="space-y-6">
      <BackLink />
      <PageHeader titel="Fotomuur" ondertitel="Dagelijkse quote en herinneringen" emoji="📸" />

      <div className="rounded-xl2 bg-gradient-to-br from-zon-200 to-koraal-200 p-4 text-center shadow-card">
        <p className="text-xs font-semibold uppercase tracking-wide text-koraal-800">Quote van vandaag</p>
        <p className="mt-1 font-display text-lg font-semibold text-diepblauw-900">&ldquo;{quote}&rdquo;</p>
      </div>

      <div className="rounded-xl2 bg-white p-4 shadow-card">
        <h2 className="font-display text-sm font-semibold text-diepblauw-800">Gedeeld fotoalbum</h2>
        {trip.fotoAlbumUrl ? (
          <a
            href={trip.fotoAlbumUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring mt-2 inline-flex items-center gap-1.5 rounded-full bg-diepblauw-700 px-3.5 py-2 text-sm font-medium text-white hover:bg-diepblauw-800"
          >
            Open het album
          </a>
        ) : (
          <p className="mt-1 text-sm text-diepblauw-700/70">
            Nog geen gedeeld album gekoppeld.
          </p>
        )}
      </div>

      <div>
        <h2 className="mb-2 font-display text-sm font-semibold text-diepblauw-700">Herinneringen</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toevoegen();
          }}
          className="mb-3 space-y-2 rounded-xl2 bg-white p-3 shadow-card"
        >
          <div className="flex flex-wrap gap-1.5">
            {emojiKeuzes.map((e) => (
              <button
                key={e}
                type="button"
                onClick={() => setEmoji(e)}
                aria-pressed={emoji === e}
                className={`focus-ring flex h-9 w-9 items-center justify-center rounded-full text-lg transition ${
                  emoji === e ? "bg-turquoise-500" : "bg-zand-100 hover:bg-turquoise-100"
                }`}
              >
                {e}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={tekst}
              onChange={(e) => setTekst(e.target.value)}
              placeholder="Schrijf een korte herinnering…"
              className="flex-1 rounded-xl border-2 border-turquoise-100 px-3 py-2 text-sm outline-none focus:border-turquoise-400"
            />
            <button
              type="submit"
              className="focus-ring rounded-xl bg-turquoise-500 px-4 py-2 text-sm font-semibold text-white hover:bg-turquoise-600"
            >
              Toevoegen
            </button>
          </div>
        </form>

        {herinneringen.length === 0 ? (
          <EmptyState emoji="🖼️" titel="Nog geen herinneringen" tekst="Voeg de eerste toe zodra jullie er zijn!" />
        ) : (
          <ul className="space-y-2">
            {herinneringen.map((h) => (
              <li key={h.id} className="flex items-start gap-2.5 rounded-xl2 bg-white p-3 shadow-card">
                <span className="text-xl" aria-hidden>
                  {h.emoji}
                </span>
                <p className="text-sm text-diepblauw-800">{h.tekst}</p>
                <button
                  type="button"
                  onClick={() => bijwerken((huidig) => huidig.filter((x) => x.id !== h.id))}
                  aria-label="Verwijder herinnering"
                  className="focus-ring ml-auto text-diepblauw-400 hover:text-koraal-600"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
