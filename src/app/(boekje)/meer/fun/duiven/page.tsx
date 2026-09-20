import { BackLink } from "@/components/BackLink";
import { PageHeader } from "@/components/PageHeader";
import { DuivenGame } from "@/components/DuivenGame";

export const metadata = { title: "Romcom's Duivenspel" };

export default function DuivenPagina() {
  return (
    <div className="space-y-6">
      <BackLink />
      <PageHeader titel="Romcom's Duivenspel" ondertitel="Vang broodkruimels, ontwijk de kat, bal en bezem" emoji="🐦" />
      <DuivenGame />
    </div>
  );
}
