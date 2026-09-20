import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { groepsleden, taken } from "@/data/taken";

export const metadata = { title: "Wie doet wat?" };

export default function WieDoetWatPagina() {
  return (
    <div className="space-y-6">
      <Link href="/meer" className="focus-ring text-sm font-medium text-turquoise-700">
        ← Meer
      </Link>
      <PageHeader titel="Wie doet wat?" ondertitel="Taakverdeling van de groep" emoji="🙋" />

      <ul className="space-y-3">
        {taken.map((taak) => (
          <li key={taak.id} className="rounded-xl2 bg-white p-4 shadow-card">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-display text-base font-semibold text-diepblauw-800">{taak.naam}</h3>
              <div className="flex -space-x-1.5">
                {taak.toegewezenAan.map((naam) => (
                  <span
                    key={naam}
                    title={naam}
                    className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-turquoise-400 text-xs font-bold text-white"
                  >
                    {naam.slice(0, 1)}
                  </span>
                ))}
              </div>
            </div>
            <p className="mt-1 text-sm text-diepblauw-700/70">{taak.toegewezenAan.join(" & ")}</p>
            {taak.omschrijving && <p className="mt-1 text-sm text-diepblauw-700/70">{taak.omschrijving}</p>}
          </li>
        ))}
      </ul>

      <div className="rounded-xl2 border border-dashed border-turquoise-200 bg-white/60 p-4 text-sm text-diepblauw-700/80">
        <p className="mb-1 font-semibold text-diepblauw-800">Groepsleden</p>
        <p>{groepsleden.join(", ")}</p>
        <p className="mt-2 text-xs text-diepblauw-700/60">
          Namen en taken aanpassen kan in <code className="rounded bg-zand-100 px-1">src/data/taken.ts</code>.
        </p>
      </div>
    </div>
  );
}
