import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { PaklijstInhoud } from "@/components/PaklijstInhoud";
import { paklijst } from "@/data/paklijst";

export const metadata = { title: "Paklijst" };

export default function PaklijstPagina() {
  return (
    <div className="space-y-6">
      <Link href="/meer" className="focus-ring text-sm font-medium text-turquoise-700">
        ← Meer
      </Link>
      <PageHeader
        titel="Paklijst"
        ondertitel="Wordt automatisch bewaard op dit apparaat"
        emoji="✅"
      />
      <PaklijstInhoud categorieen={paklijst} />
    </div>
  );
}
