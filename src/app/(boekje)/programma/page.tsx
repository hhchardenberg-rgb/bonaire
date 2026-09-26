import { PageHeader } from "@/components/PageHeader";
import { ProgrammaLijst } from "@/components/ProgrammaLijst";
import { programma } from "@/data/programma";

export const metadata = { title: "Programma" };

export default function ProgrammaPagina() {
  return (
    <div className="space-y-6">
      <PageHeader
        titel="Programma"
        ondertitel="De hele reisplanning, dag voor dag"
        emoji="🗓️"
      />

      <ProgrammaLijst programma={programma} />
    </div>
  );
}
