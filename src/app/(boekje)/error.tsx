"use client";

import { useEffect } from "react";

// Na een nieuwe deploy kan een al open pagina proberen een oud, niet meer
// bestaand bestand te laden ("ChunkLoadError"). Herladen lost dit altijd op,
// terwijl de gewone reset() dat niet doet omdat de al geladen (kapotte)
// code dan blijft hangen.
const CHUNKFOUT_PATROON =
  /ChunkLoadError|Loading chunk [\w-]+ failed|Importing a module script failed|dynamically imported module/i;

export default function Fout({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const isChunkfout = CHUNKFOUT_PATROON.test(`${error.name} ${error.message}`);

  useEffect(() => {
    if (isChunkfout) {
      window.location.reload();
    }
  }, [isChunkfout]);

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
        onClick={() => (isChunkfout ? window.location.reload() : reset())}
        className="focus-ring rounded-full bg-turquoise-500 px-4 py-2 text-sm font-semibold text-white hover:bg-turquoise-600"
      >
        Opnieuw proberen
      </button>
    </div>
  );
}
