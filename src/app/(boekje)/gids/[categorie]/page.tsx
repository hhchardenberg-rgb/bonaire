import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";
import { GidsLijst } from "@/components/GidsLijst";
import { gidsCategorieen, getGidsItems } from "@/data/gids";
import type { GidsCategorieId } from "@/types";

export function generateMetadata({ params }: { params: { categorie: string } }) {
  const categorie = gidsCategorieen.find((c) => c.id === params.categorie);
  return { title: categorie?.naam ?? "Niet gevonden" };
}

export default function GidsCategoriePagina({ params }: { params: { categorie: string } }) {
  const categorie = gidsCategorieen.find((c) => c.id === params.categorie);
  if (!categorie) notFound();

  const items = getGidsItems(categorie.id as GidsCategorieId);

  return (
    <div className="space-y-5">
      <Link href="/gids" className="focus-ring text-sm font-medium text-turquoise-700">
        ← Alle categorieën
      </Link>
      <PageHeader titel={categorie.naam} ondertitel={categorie.omschrijving} emoji={categorie.emoji} />

      {items.length === 0 ? (
        <EmptyState titel="Nog geen plekken toegevoegd" tekst="Vul deze categorie later aan." />
      ) : (
        <GidsLijst items={items} />
      )}
    </div>
  );
}
