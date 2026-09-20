"use client";

export default function Fout({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center">
      <span className="text-5xl" aria-hidden>
        🌧️
      </span>
      <h1 className="font-display text-xl font-bold text-diepblauw-800">Er ging iets mis</h1>
      <p className="max-w-xs text-sm text-diepblauw-700/70">
        Deze pagina kon niet geladen worden. Probeer het opnieuw.
      </p>
      <button
        type="button"
        onClick={reset}
        className="focus-ring rounded-full bg-turquoise-500 px-4 py-2 text-sm font-semibold text-white hover:bg-turquoise-600"
      >
        Opnieuw proberen
      </button>
    </div>
  );
}
