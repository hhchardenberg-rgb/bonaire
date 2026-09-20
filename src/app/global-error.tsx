"use client";

import { useEffect } from "react";

// Vangt fouten op die buiten de (boekje)-sectie vallen (bv. op /login of in de
// root layout zelf) — anders zou Next.js hier alleen de kale
// "Application error"-melding tonen, zonder eigen stijl of herstelknop.
const CHUNKFOUT_PATROON =
  /ChunkLoadError|Loading chunk [\w-]+ failed|Importing a module script failed|dynamically imported module/i;

export default function GlobaleFout({ error }: { error: Error & { digest?: string } }) {
  const isChunkfout = CHUNKFOUT_PATROON.test(`${error.name} ${error.message}`);

  useEffect(() => {
    if (isChunkfout) {
      window.location.reload();
    }
  }, [isChunkfout]);

  return (
    <html lang="nl">
      <body style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
        <div
          style={{
            display: "flex",
            minHeight: "100dvh",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <span style={{ fontSize: "3rem" }} aria-hidden>
            🌧️
          </span>
          <h1 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#1e3a5f" }}>Er ging iets mis</h1>
          <p style={{ maxWidth: "20rem", fontSize: "0.9rem", color: "#4b5f73" }}>
            De pagina kon niet geladen worden — dit gebeurt soms vlak na een update. Vernieuw de pagina om
            verder te gaan.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              borderRadius: "9999px",
              backgroundColor: "#22aca4",
              color: "white",
              fontWeight: 600,
              padding: "0.6rem 1.25rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            Vernieuwen
          </button>
        </div>
      </body>
    </html>
  );
}
