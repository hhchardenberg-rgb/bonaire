import { BackLink } from "@/components/BackLink";
import { PageHeader } from "@/components/PageHeader";
import { DuivenGame } from "@/components/DuivenGame";

export const metadata = { title: "Remco's Duivenspel" };

export default function DuivenPagina() {
  return (
    <div className="space-y-6">
      <BackLink />
      <PageHeader titel="Remco's Duivenspel" ondertitel="Vang broodkruimels, ontwijk de kat, bal en bezem" emoji="🐦" />
      <DuivenGame />
    </div>
  );
}
