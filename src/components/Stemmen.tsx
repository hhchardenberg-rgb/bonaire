"use client";

import { useLocalStorage } from "@/lib/useLocalStorage";

export function Stemmen({ pollId, titel, opties }: { pollId: string; titel: string; opties: string[] }) {
  const { waarde: stemmen, bijwerken, wissen } = useLocalStorage<Record<string, number>>(
    `bonaire-stemmen-${pollId}`,
    {}
  );

  const totaal = Object.values(stemmen).reduce((a, b) => a + b, 0);
  const maxStemmen = Math.max(1, ...Object.values(stemmen));

  return (
    <div className="rounded-xl2 bg-white p-4 shadow-card">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display text-sm font-semibold text-diepblauw-800">{titel}</h3>
        {totaal > 0 && (
          <button
            type="button"
            onClick={() => wissen()}
            className="focus-ring text-xs font-medium text-diepblauw-700/50 underline hover:text-koraal-600"
          >
            Reset
          </button>
        )}
      </div>
      <ul className="space-y-2">
        {opties.map((optie) => {
          const aantal = stemmen[optie] ?? 0;
          const percentage = totaal > 0 ? Math.round((aantal / totaal) * 100) : 0;
          const isLeidend = aantal === maxStemmen && aantal > 0;
          return (
            <li key={optie}>
              <button
                type="button"
                onClick={() => bijwerken((huidig) => ({ ...huidig, [optie]: (huidig[optie] ?? 0) + 1 }))}
                className="focus-ring w-full rounded-xl border border-turquoise-100 p-2.5 text-left transition hover:bg-turquoise-50"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className={`font-medium ${isLeidend ? "text-koraal-600" : "text-diepblauw-800"}`}>
                    {isLeidend && "🏆 "}
                    {optie}
                  </span>
                  <span className="text-xs text-diepblauw-700/60">{aantal} stem(men)</span>
                </div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-zand-100">
                  <div
                    className="h-full rounded-full bg-turquoise-400 transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
