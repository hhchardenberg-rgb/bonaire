import Link from "next/link";
import { HeroIllustration } from "@/components/HeroIllustration";
import { Countdown } from "@/components/Countdown";
import { WeerEnTip } from "@/components/WeerEnTip";
import { DansendeBeestjes } from "@/components/DansendeBeestjes";
import { trip } from "@/data/trip";
import { formatDatumLang } from "@/lib/date";

const snelknoppen = [
  { href: "/vandaag", label: "Vandaag", emoji: "☀️" },
  { href: "/programma", label: "Programma", emoji: "🗓️" },
  { href: "/gids", label: "Gids", emoji: "🧭" },
  { href: "/kaart", label: "Kaart", emoji: "📍" },
  { href: "/meer/praktisch", label: "Praktisch", emoji: "🧳" },
];

export default function WelkomstPagina() {
  return (
    <div className="space-y-6">
      <div className="relative">
        <HeroIllustration />
        <DansendeBeestjes />
      </div>

      <div className="text-center">
        <h1 className="font-display text-3xl font-bold text-diepblauw-800">{trip.titel}</h1>
        <p className="mt-2 text-sm text-diepblauw-700/70">
          {formatDatumLang(trip.startDatum)} — {formatDatumLang(trip.eindDatum)}
        </p>
      </div>

      <div className="rounded-xl2 bg-white p-4 shadow-card">
        <Countdown doelIso={trip.vertrekMoment} label="Nog tot vertrek" />
      </div>

      <p className="rounded-xl2 bg-turquoise-50 p-4 text-sm leading-relaxed text-diepblauw-800">
        {trip.welkomstTekst}
      </p>

      <div>
        <h2 className="mb-2 font-display text-sm font-semibold text-diepblauw-700">Snel naar</h2>
        <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-5">
          {snelknoppen.map((knop) => (
            <Link
              key={knop.href}
              href={knop.href}
              className="focus-ring flex flex-col items-center gap-1 rounded-xl2 bg-white p-3 text-center shadow-card transition hover:-translate-y-0.5 hover:shadow-floating"
            >
              <span className="text-2xl" aria-hidden>
                {knop.emoji}
              </span>
              <span className="text-xs font-medium text-diepblauw-800">{knop.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-2 font-display text-sm font-semibold text-diepblauw-700">Weer & dagtip</h2>
        <WeerEnTip />
      </div>
    </div>
  );
}
