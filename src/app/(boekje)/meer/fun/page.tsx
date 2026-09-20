import Link from "next/link";
import { BackLink } from "@/components/BackLink";
import { PageHeader } from "@/components/PageHeader";

export const metadata = { title: "Voor de lol" };

const items = [
  { href: "/meer/fun/kiezer", label: "Wie kiest vandaag?", emoji: "🎲" },
  { href: "/meer/fun/haai", label: "Ella's haaienspel", emoji: "🦈" },
  { href: "/meer/fun/bingo", label: "Vakantie-bingo", emoji: "🎉" },
  { href: "/meer/fun/quiz", label: "Bonaire-quiz", emoji: "🧠" },
  { href: "/meer/fun/bucketlist", label: "Bucketlist", emoji: "📋" },
  { href: "/meer/fun/scorebord", label: "Scorebord", emoji: "🏆" },
  { href: "/meer/fun/fotomuur", label: "Fotomuur", emoji: "📸" },
  { href: "/meer/fun/favorieten", label: "Favorieten", emoji: "⭐" },
];

export default function FunPagina() {
  return (
    <div className="space-y-6">
      <BackLink />
      <PageHeader titel="Voor de lol" ondertitel="Lichte, optionele extra's" emoji="🎈" />
      <ul className="grid grid-cols-2 gap-3">
        {items.map((item) => (
          <li key={item.href} className="list-none">
            <Link
              href={item.href}
              className="focus-ring flex h-full flex-col items-center gap-1.5 rounded-xl2 bg-white p-4 text-center shadow-card transition hover:-translate-y-0.5 hover:shadow-floating"
            >
              <span className="text-2xl" aria-hidden>
                {item.emoji}
              </span>
              <span className="text-sm font-medium text-diepblauw-800">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
