import { BackLink } from "@/components/BackLink";
import { PageHeader } from "@/components/PageHeader";
import { ValutaCalculator } from "@/components/ValutaCalculator";

export const metadata = { title: "Wisselkoers" };

export default function ValutaPagina() {
  return (
    <div className="space-y-6">
      <BackLink href="/" label="Home" />
      <PageHeader titel="Wisselkoers" ondertitel="Snel dollars omrekenen naar euro's" emoji="💱" />
      <ValutaCalculator />
    </div>
  );
}
