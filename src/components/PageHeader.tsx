import type { ReactNode } from "react";

export function PageHeader({
  titel,
  ondertitel,
  emoji,
  actie,
}: {
  titel: string;
  ondertitel?: string;
  emoji?: string;
  actie?: ReactNode;
}) {
  return (
    <header className="mb-5 flex items-start justify-between gap-3">
      <div>
        <h1 className="flex items-center gap-2 font-display text-2xl font-bold text-diepblauw-800">
          {emoji && <span aria-hidden>{emoji}</span>}
          {titel}
        </h1>
        {ondertitel && <p className="mt-1 text-sm text-diepblauw-700/70">{ondertitel}</p>}
      </div>
      {actie}
    </header>
  );
}
