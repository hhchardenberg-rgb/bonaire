"use client";

import type { GidsItem } from "@/types";
import { GuideCard } from "./GuideCard";
import { useLocalStorage } from "@/lib/useLocalStorage";

export const FAVORIETEN_SLEUTEL = "bonaire-favorieten";

export function GidsLijst({ items }: { items: GidsItem[] }) {
  const { waarde: favorieten, bijwerken } = useLocalStorage<string[]>(FAVORIETEN_SLEUTEL, []);

  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <GuideCard
          key={item.id}
          item={item}
          favoriet={favorieten.includes(item.id)}
          onToggleFavoriet={() =>
            bijwerken((huidig) =>
              huidig.includes(item.id) ? huidig.filter((id) => id !== item.id) : [...huidig, item.id]
            )
          }
        />
      ))}
    </ul>
  );
}
