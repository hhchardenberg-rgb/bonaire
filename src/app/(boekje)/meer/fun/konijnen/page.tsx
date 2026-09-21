import { BackLink } from "@/components/BackLink";
import { PageHeader } from "@/components/PageHeader";
import { KonijnenGame } from "@/components/KonijnenGame";

export const metadata = { title: "Charella’s Konijnenhok" };

export default function KonijnenPagina() {
  return (
    <div className="space-y-6">
      <BackLink />
      <PageHeader titel="Charella’s Konijnenhok" ondertitel="Tik de konijnen weg, mis de vos — 30 seconden!" emoji="🐰" />
      <KonijnenGame />
    </div>
  );
}
