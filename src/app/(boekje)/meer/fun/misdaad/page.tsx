import { BackLink } from "@/components/BackLink";
import { PageHeader } from "@/components/PageHeader";
import { MisdaadGame } from "@/components/MisdaadGame";

export const metadata = { title: "Jermaine’s Misdaadspel" };

export default function MisdaadPagina() {
  return (
    <div className="space-y-6">
      <BackLink />
      <PageHeader titel="Jermaine’s Misdaadspel" ondertitel="Spot de boef tussen de burgers, voor de tijd om is" emoji="🕵️" />
      <MisdaadGame />
    </div>
  );
}
