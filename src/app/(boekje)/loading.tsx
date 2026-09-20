export default function Laden() {
  return (
    <div className="flex flex-col items-center gap-3 py-20 text-center" role="status" aria-live="polite">
      <span className="animate-bob text-4xl" aria-hidden>
        🌴
      </span>
      <p className="text-sm text-diepblauw-700/60">Even laden…</p>
    </div>
  );
}
