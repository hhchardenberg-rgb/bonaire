"use client";

import { BackLink } from "@/components/BackLink";
import { PageHeader } from "@/components/PageHeader";
import { scorebordCategorieen } from "@/data/fun";
import { useLocalStorage } from "@/lib/useLocalStorage";

export default function ScorebordPagina() {
  const { waarde: scores, bijwerken } = useLocalStorage<Record<string, number>>("bonaire-scorebord", {});

  return (
    <div className="space-y-6">
      <BackLink />
      <PageHeader titel="Scorebord" ondertitel="Tel mee tijdens de trip" emoji="🏆" />

      <div className="space-y-3">
        {scorebordCategorieen.map((cat) => {
          const aantal = scores[cat.id] ?? 0;
          return (
            <div key={cat.id} className="flex items-center justify-between rounded-xl2 bg-white p-4 shadow-card">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl" aria-hidden>
                  {cat.emoji}
                </span>
                <span className="font-medium text-diepblauw-800">{cat.naam}</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => bijwerken((h) => ({ ...h, [cat.id]: Math.max(0, (h[cat.id] ?? 0) - 1) }))}
                  aria-label={`Verlaag ${cat.naam}`}
                  className="focus-ring flex h-8 w-8 items-center justify-center rounded-full bg-zand-100 text-lg font-bold text-diepblauw-700 hover:bg-zand-200"
                >
                  −
                </button>
                <span className="w-8 text-center font-display text-lg font-bold tabular-nums text-turquoise-700">
                  {aantal}
                </span>
                <button
                  type="button"
                  onClick={() => bijwerken((h) => ({ ...h, [cat.id]: (h[cat.id] ?? 0) + 1 }))}
                  aria-label={`Verhoog ${cat.naam}`}
                  className="focus-ring flex h-8 w-8 items-center justify-center rounded-full bg-turquoise-500 text-lg font-bold text-white hover:bg-turquoise-600"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
