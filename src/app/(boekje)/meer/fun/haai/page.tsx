import { BackLink } from "@/components/BackLink";
import { PageHeader } from "@/components/PageHeader";
import { HaaiGame } from "@/components/HaaiGame";

export const metadata = { title: "Hongerige haai" };

export default function HaaiPagina() {
  return (
    <div className="space-y-6">
      <BackLink />
      <PageHeader titel="Hongerige haai" ondertitel="Eet alle vissen en kwallen op, ontwijk de octopus" emoji="🦈" />
      <HaaiGame />
    </div>
  );
}
