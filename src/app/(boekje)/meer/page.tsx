import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";

export const metadata = { title: "Meer" };

const secties = [
  {
    titel: "Reis-essentials",
    items: [
      { href: "/meer/praktisch", label: "Praktische informatie", emoji: "🧳", omschrijving: "Vlucht, accommodatie, geld, tijdverschil en meer" },
      { href: "/meer/paklijst", label: "Paklijst", emoji: "✅", omschrijving: "Vink af wat al in de koffer zit" },
      { href: "/foodtruck-tour", label: "Foodtruckroute", emoji: "🌮", omschrijving: "De route langs de foodtrucks — grijp 'm erbij wanneer het uitkomt" },
      { href: "/nood", label: "Nood & hulp", emoji: "🆘", omschrijving: "Noodnummers en belangrijke contacten" },
    ],
  },
  {
    titel: "Voor de lol",
    items: [
      { href: "/meer/fun/kiezer", label: "Wie kiest vandaag?", emoji: "🎲", omschrijving: "Laat het lot beslissen" },
      { href: "/meer/fun/haai", label: "Ella's haaienspel", emoji: "🦈", omschrijving: "Pacman-stijl: eet vissen en kwallen, ontwijk de octopussen" },
      { href: "/meer/fun/duiven", label: "Remco's Duivenspel", emoji: "🐦", omschrijving: "Vang broodkruimels, ontwijk kat, bal en bezem" },
      { href: "/meer/fun/konijnen", label: "Charella’s Konijnenhok", emoji: "🐰", omschrijving: "Tik de konijnen weg, mis de vos — 30 seconden" },
      { href: "/meer/fun/misdaad", label: "Jermaine’s Misdaadspel", emoji: "🕵️", omschrijving: "Spot de boef tussen de burgers, voor de tijd om is" },
      { href: "/meer/fun/firewall", label: "Bart's Firewall Invaders", emoji: "👾", omschrijving: "Space Invaders in ICT-stijl: houd de bugs buiten de deur" },
      { href: "/meer/fun/bingo", label: "Vakantie-bingo", emoji: "🎉", omschrijving: "Vink af wat je tegenkomt" },
      { href: "/meer/fun/quiz", label: "Bonaire-quiz", emoji: "🧠", omschrijving: "Test je eilandkennis" },
      { href: "/meer/fun/bucketlist", label: "Bucketlist", emoji: "📋", omschrijving: "Dingen die we samen willen doen" },
      { href: "/meer/fun/scorebord", label: "Scorebord", emoji: "🏆", omschrijving: "Cocktails, snorkelplekken & zonsondergangen tellen" },
      { href: "/meer/fun/fotomuur", label: "Fotomuur", emoji: "📸", omschrijving: "Herinneringen en dagelijkse quote" },
      { href: "/meer/fun/favorieten", label: "Favorieten", emoji: "⭐", omschrijving: "Jouw opgeslagen plekken uit de gids" },
    ],
  },
];

export default function MeerPagina() {
  return (
    <div className="space-y-7">
      <PageHeader titel="Meer" ondertitel="Praktische zaken en leuke extra's" emoji="✨" />

      {secties.map((sectie) => (
        <div key={sectie.titel}>
          <h2 className="mb-2 font-display text-sm font-semibold text-diepblauw-700">{sectie.titel}</h2>
          <ul className="space-y-2">
            {sectie.items.map((item) => (
              <li key={item.href} className="list-none">
                <Link
                  href={item.href}
                  className="focus-ring flex items-center gap-3 rounded-xl2 bg-white p-3.5 shadow-card transition hover:-translate-y-0.5 hover:shadow-floating"
                >
                  <span className="text-2xl" aria-hidden>
                    {item.emoji}
                  </span>
                  <div className="min-w-0">
                    <p className="font-medium text-diepblauw-800">{item.label}</p>
                    <p className="truncate text-xs text-diepblauw-700/60">{item.omschrijving}</p>
                  </div>
                  <span className="ml-auto text-diepblauw-300" aria-hidden>
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="border-t border-turquoise-100 pt-4">
        <a
          href="/api/auth/logout"
          className="focus-ring inline-flex items-center gap-1.5 text-sm font-medium text-diepblauw-700/60 underline hover:text-diepblauw-800"
        >
          Uitloggen
        </a>
      </div>
    </div>
  );
}
