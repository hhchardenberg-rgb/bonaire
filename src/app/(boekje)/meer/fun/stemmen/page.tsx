import { BackLink } from "@/components/BackLink";
import { PageHeader } from "@/components/PageHeader";
import { Stemmen } from "@/components/Stemmen";

export const metadata = { title: "Stemmen" };

const peilingen = [
  {
    id: "restaurant",
    titel: "Welk restaurant vanavond?",
    opties: ["It Rains Fishes", "Kite City Café", "Zeezicht Restaurant", "Gio's Gelato & Pizza"],
  },
  {
    id: "strand",
    titel: "Welk strand morgen?",
    opties: ["Te Amo Beach", "Sorobon Beach", "1000 Steps", "Klein Bonaire"],
  },
  {
    id: "activiteit",
    titel: "Welke activiteit?",
    opties: ["Snorkelen", "Duiken", "Washington Slagbaai", "Rustige strand-dag"],
  },
];

export default function StemmenPagina() {
  return (
    <div className="space-y-6">
      <BackLink />
      <PageHeader
        titel="Stemmen"
        ondertitel="Op dit toestel — geef de telefoon door om samen te stemmen"
        emoji="🗳️"
      />
      <div className="space-y-4">
        {peilingen.map((peiling) => (
          <Stemmen key={peiling.id} pollId={peiling.id} titel={peiling.titel} opties={peiling.opties} />
        ))}
      </div>
    </div>
  );
}
