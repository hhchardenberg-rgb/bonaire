"use client";

import type { Activiteit } from "@/types";
import { ActivityCard } from "./ActivityCard";
import { EmptyState } from "./EmptyState";
import { ProgressBar } from "./ProgressBar";
import { useLocalStorage } from "@/lib/useLocalStorage";

export function VandaagProgramma({ dag, activiteiten }: { dag: string; activiteiten: Activiteit[] }) {
  const { waarde: afgevinkt, bijwerken } = useLocalStorage<Record<string, boolean>>(
    `bonaire-vandaag-${dag}`,
    {}
  );

  if (activiteiten.length === 0) {
    return (
      <EmptyState
        emoji="🌴"
        titel="Geen vaste plannen vandaag"
        tekst="Fijn, een vrije dag! Kijk in de gids voor inspiratie."
      />
    );
  }

  const aantalAfgevinkt = activiteiten.filter((a) => afgevinkt[a.id]).length;

  return (
    <div className="space-y-3">
      <ProgressBar voltooid={aantalAfgevinkt} totaal={activiteiten.length} />
      <ul className="space-y-3">
        {activiteiten.map((activiteit) => (
          <ActivityCard
            key={activiteit.id}
            activiteit={activiteit}
            afgevinkt={Boolean(afgevinkt[activiteit.id])}
            onToggleAfgevinkt={() =>
              bijwerken((huidig) => ({ ...huidig, [activiteit.id]: !huidig[activiteit.id] }))
            }
          />
        ))}
      </ul>
    </div>
  );
}
