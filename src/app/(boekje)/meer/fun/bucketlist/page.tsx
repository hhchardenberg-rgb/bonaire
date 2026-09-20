"use client";

import { useState } from "react";
import { BackLink } from "@/components/BackLink";
import { PageHeader } from "@/components/PageHeader";
import { CheckItem } from "@/components/CheckItem";
import { bucketlistVoorbeelden } from "@/data/fun";
import { useLocalStorage } from "@/lib/useLocalStorage";

interface BucketlistItem {
  id: string;
  tekst: string;
  afgevinkt: boolean;
}

function startlijst(): BucketlistItem[] {
  return bucketlistVoorbeelden.map((tekst, i) => ({ id: `voorbeeld-${i}`, tekst, afgevinkt: false }));
}

export default function BucketlistPagina() {
  const { waarde: items, bijwerken } = useLocalStorage<BucketlistItem[]>("bonaire-bucketlist", startlijst());
  const [nieuw, setNieuw] = useState("");

  function toevoegen() {
    const tekst = nieuw.trim();
    if (!tekst) return;
    bijwerken((huidig) => [...huidig, { id: `eigen-${Date.now()}`, tekst, afgevinkt: false }]);
    setNieuw("");
  }

  return (
    <div className="space-y-6">
      <BackLink />
      <PageHeader titel="Bucketlist" ondertitel="Dingen die we samen willen doen" emoji="📋" />

      <ul className="rounded-xl2 bg-white p-1.5 shadow-card">
        {items.map((item) => (
          <CheckItem
            key={item.id}
            id={item.id}
            label={item.tekst}
            checked={item.afgevinkt}
            onChange={(checked) =>
              bijwerken((huidig) => huidig.map((h) => (h.id === item.id ? { ...h, afgevinkt: checked } : h)))
            }
          />
        ))}
      </ul>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          toevoegen();
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          value={nieuw}
          onChange={(e) => setNieuw(e.target.value)}
          placeholder="Voeg een eigen idee toe…"
          className="flex-1 rounded-xl border-2 border-turquoise-100 px-3 py-2 text-sm outline-none focus:border-turquoise-400"
        />
        <button
          type="submit"
          className="focus-ring rounded-xl bg-turquoise-500 px-4 py-2 text-sm font-semibold text-white hover:bg-turquoise-600"
        >
          Toevoegen
        </button>
      </form>
    </div>
  );
}
