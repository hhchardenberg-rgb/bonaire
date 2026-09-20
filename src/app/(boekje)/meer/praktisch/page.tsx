import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { MapLinkButton } from "@/components/MapLinkButton";
import { praktischeInfo } from "@/data/praktisch";
import { trip } from "@/data/trip";

export const metadata = { title: "Praktische informatie" };

export default function PraktischPagina() {
  return (
    <div className="space-y-6">
      <Link href="/meer" className="focus-ring text-sm font-medium text-turquoise-700">
        ← Meer
      </Link>
      <PageHeader titel="Praktische informatie" ondertitel="Alles op een rij" emoji="🧳" />

      <div className="rounded-xl2 bg-white p-4 shadow-card">
        <h2 className="font-display text-sm font-semibold text-diepblauw-800">{trip.accommodatie.naam}</h2>
        <p className="mt-1 text-sm text-diepblauw-700/80">{trip.accommodatie.adres}</p>
        <div className="mt-2 space-y-0.5 text-xs text-diepblauw-700/70">
          <p>Check-in: {trip.accommodatie.checkIn}</p>
          <p>Check-out: {trip.accommodatie.checkOut}</p>
          <p>{trip.accommodatie.wifi}</p>
          <p>{trip.accommodatie.contact}</p>
        </div>
        <div className="mt-3">
          <MapLinkButton url={trip.accommodatie.kaartUrl} />
        </div>
      </div>

      <div className="space-y-4">
        {praktischeInfo.map((sectie) => (
          <details key={sectie.id} className="group rounded-xl2 bg-white p-4 shadow-card open:pb-4">
            <summary className="focus-ring flex cursor-pointer list-none items-center justify-between font-display text-sm font-semibold text-diepblauw-800">
              <span className="flex items-center gap-2">
                <span aria-hidden>{sectie.emoji}</span> {sectie.titel}
              </span>
              <span className="text-diepblauw-400 transition group-open:rotate-180" aria-hidden>
                ⌄
              </span>
            </summary>
            <ul className="mt-3 space-y-2 text-sm text-diepblauw-800">
              {sectie.inhoud.map((regel, i) => (
                <li key={i}>
                  {regel.label && <span className="font-semibold">{regel.label}: </span>}
                  {regel.telefoon ? (
                    <a href={`tel:${regel.telefoon}`} className="text-turquoise-700 underline">
                      {regel.telefoon}
                    </a>
                  ) : (
                    <span className="text-diepblauw-700/80">{regel.tekst}</span>
                  )}
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </div>
  );
}
