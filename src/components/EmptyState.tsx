export function EmptyState({ emoji = "🌴", titel, tekst }: { emoji?: string; titel: string; tekst?: string }) {
  return (
    <div className="rounded-xl2 border border-dashed border-turquoise-200 bg-white/60 p-6 text-center">
      <span className="text-3xl" aria-hidden>
        {emoji}
      </span>
      <p className="mt-2 font-display font-semibold text-diepblauw-800">{titel}</p>
      {tekst && <p className="mt-1 text-sm text-diepblauw-700/70">{tekst}</p>}
    </div>
  );
}
