"use client";

import { BackLink } from "@/components/BackLink";
import { PageHeader } from "@/components/PageHeader";
import { bingoItems } from "@/data/fun";
import { useLocalStorage } from "@/lib/useLocalStorage";

export default function BingoPagina() {
  const { waarde: aangevinkt, bijwerken, wissen } = useLocalStorage<Record<number, boolean>>(
    "bonaire-bingo",
    {}
  );

  const aantal = Object.values(aangevinkt).filter(Boolean).length;
  const volledigeBingo = aantal === bingoItems.length && bingoItems.length > 0;

  return (
    <div className="space-y-6">
      <BackLink />
      <PageHeader titel="Vakantie-bingo" ondertitel="Vink af wat je tegenkomt" emoji="🎉" />

      {volledigeBingo && (
        <div className="animate-pop-in rounded-xl2 bg-gradient-to-br from-zon-300 to-koraal-400 p-4 text-center font-display font-bold text-white shadow-floating">
          🎊 BINGO! Jullie hebben alles afgevinkt!
        </div>
      )}

      <p className="text-sm text-diepblauw-700/70">{aantal} / {bingoItems.length} afgevinkt</p>

      <div className="grid grid-cols-2 gap-2.5">
        {bingoItems.map((item, i) => {
          const actief = Boolean(aangevinkt[i]);
          return (
            <button
              key={i}
              type="button"
              onClick={() => bijwerken((huidig) => ({ ...huidig, [i]: !huidig[i] }))}
              aria-pressed={actief}
              className={`focus-ring flex min-h-20 items-center justify-center rounded-xl2 p-2.5 text-center text-xs font-medium shadow-card transition ${
                actief
                  ? "bg-turquoise-500 text-white"
                  : "bg-white text-diepblauw-800 hover:bg-turquoise-50"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => wissen()}
        className="focus-ring text-sm font-medium text-diepblauw-700/60 underline hover:text-koraal-600"
      >
        Bingokaart resetten
      </button>
    </div>
  );
}
