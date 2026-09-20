import { BackLink } from "@/components/BackLink";
import { PageHeader } from "@/components/PageHeader";
import { MisdaadGame } from "@/components/MisdaadGame";

export const metadata = { title: "Jermaine’s Misdaadspel" };

export default function MisdaadPagina() {
  return (
    <div className="space-y-6">
      <BackLink />
      <PageHeader titel="Jermaine’s Misdaadspel" ondertitel="Los de zaak op aan de hand van de aanwijzingen" emoji="🕵️" />
      <MisdaadGame />
    </div>
  );
}
