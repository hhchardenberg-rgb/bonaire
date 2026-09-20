"use client";

import { BackLink } from "@/components/BackLink";
import { PageHeader } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";
import { GidsLijst } from "@/components/GidsLijst";
import { gidsItems } from "@/data/gids";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { FAVORIETEN_SLEUTEL } from "@/components/GidsLijst";

export default function FavorietenPagina() {
  const { waarde: favorieten, geladen } = useLocalStorage<string[]>(FAVORIETEN_SLEUTEL, []);
  const items = gidsItems.filter((item) => favorieten.includes(item.id));

  return (
    <div className="space-y-6">
      <BackLink />
      <PageHeader titel="Favorieten" ondertitel="Jouw opgeslagen plekken uit de gids" emoji="⭐" />

      {!geladen ? null : items.length === 0 ? (
        <EmptyState
          emoji="⭐"
          titel="Nog geen favorieten"
          tekst="Tik op de ster bij een plek in de gids om 'm hier te verzamelen."
        />
      ) : (
        <GidsLijst items={items} />
      )}
    </div>
  );
}
