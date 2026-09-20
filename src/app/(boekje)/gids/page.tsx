import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { gidsCategorieen, gidsItems } from "@/data/gids";

export const metadata = { title: "Gids" };

export default function GidsPagina() {
  return (
    <div className="space-y-6">
      <PageHeader titel="Bonaire-gids" ondertitel="Alle aanraders per categorie" emoji="🧭" />

      <ul className="grid grid-cols-2 gap-3">
        {gidsCategorieen.map((categorie) => {
          const aantal = gidsItems.filter((i) => i.categorie === categorie.id).length;
          return (
            <li key={categorie.id} className="list-none">
              <Link
                href={`/gids/${categorie.id}`}
                className="focus-ring flex h-full flex-col items-center gap-1.5 rounded-xl2 bg-white p-4 text-center shadow-card transition hover:-translate-y-0.5 hover:shadow-floating"
              >
                <span className="text-3xl" aria-hidden>
                  {categorie.emoji}
                </span>
                <span className="font-display text-sm font-semibold text-diepblauw-800">
                  {categorie.naam}
                </span>
                <span className="text-xs text-diepblauw-700/60">{categorie.omschrijving}</span>
                <span className="mt-1 rounded-full bg-turquoise-50 px-2 py-0.5 text-[11px] font-medium text-turquoise-700">
                  {aantal} {aantal === 1 ? "plek" : "plekken"}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="rounded-xl2 border border-dashed border-koraal-200 bg-koraal-50 p-4 text-sm text-koraal-800">
        <span className="font-semibold">Let op: </span>
        prijzen en openingstijden zijn waar mogelijk aangegeven, maar check ze zelf vlak voor
        vertrek — we hebben bewust niets verzonnen bij plekken waar we het niet zeker wisten.
      </div>
    </div>
  );
}
