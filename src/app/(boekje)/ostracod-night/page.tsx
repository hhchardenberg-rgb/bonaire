import { BackLink } from "@/components/BackLink";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { OstracodDiagram } from "@/components/OstracodDiagram";

export const metadata = { title: "Ostracod Night" };

export default function OstracodNightPagina() {
  return (
    <div className="space-y-6">
      <BackLink href="/programma" label="Programma" />
      <PageHeader
        titel="✨ Ostracod Night"
        ondertitel="Nachtsnorkelen — maandag 29 september, 18:30 aanwezig"
        emoji="🌙"
      />

      <div className="flex items-center gap-2">
        <StatusBadge status="bevestigd" />
        <span className="text-sm text-diepblauw-700/70">
          Aanwezig om 18:30 · de lichtshow begint zelf rond 19:09
        </span>
      </div>

      <div>
        <h2 className="mb-2 font-display text-sm font-semibold text-diepblauw-700">Wat is het?</h2>
        <p className="rounded-xl2 bg-white p-4 text-sm leading-relaxed text-diepblauw-800 shadow-card">
          Ostracoden zijn piepkleine schaaldiertjes die &apos;s nachts een kort lichtshow geven om
          partners aan te trekken — een beetje als vuurvliegjes, maar dan onder water. De
          mannetjes geven na elkaar korte lichtsignalen af boven ondiepe, structuurrijke riffen.
          Zodra het donker genoeg is beginnen de eerste lichtflitsjes, en al snel doen er steeds
          meer mannetjes mee — tot het rif vol lijkt te liggen met kleine sterretjes.
        </p>
      </div>

      <div>
        <h2 className="mb-2 font-display text-sm font-semibold text-diepblauw-700">
          Zo ziet het eruit
        </h2>
        <OstracodDiagram />
      </div>

      <div>
        <h2 className="mb-3 font-display text-sm font-semibold text-diepblauw-700">Tips</h2>
        <div className="space-y-3">
          <div className="rounded-xl2 bg-turquoise-50 p-4 text-sm leading-relaxed text-diepblauw-800">
            <p className="mb-1 font-semibold">🔦 Neem lampen mee, maar gebruik ze bewust</p>
            <p>
              Een ostracoduitstap is niet &ldquo;zonder lamp op pad&rdquo;. Gebruik licht voor een
              veilige instap, oriëntatie en uitstap; schakel het tijdens het kijken alleen uit
              volgens de afspraken met de gids. Duikers horen een hoofdlamp én een reservelamp mee
              te nemen. Spreek vooraf af hoe je contact houdt en een probleem meldt. Veiligheid
              gaat altijd voor een donkere kijkervaring.
            </p>
          </div>
          <div className="rounded-xl2 bg-turquoise-50 p-4 text-sm leading-relaxed text-diepblauw-800">
            <p className="mb-1 font-semibold">✨ Kijk naar kleine lichtreeksen, niet naar een felblauwe zee</p>
            <p>
              De mannetjes produceren lichtpatronen om vrouwtjes aan te trekken. Denk aan kleine
              puntjes en korte snoertjes boven het rif. Dat is iets anders dan lichtgevend
              plankton dat opflitst wanneer je met je handen door het water beweegt. Voor de
              ostracodshow hoef je dus niet te gaan zwaaien of water op te woelen.
            </p>
          </div>
          <div className="rounded-xl2 bg-turquoise-50 p-4 text-sm leading-relaxed text-diepblauw-800">
            <p className="mb-1 font-semibold">👀 Geef je ogen rust</p>
            <p>
              Niet steeds een telefoon, camera of felle lamp aanzetten. Blijf rustig kijken;
              aanvankelijk lijkt er mogelijk weinig te gebeuren. Die zwakke flitsjes worden beter
              zichtbaar wanneer je ogen aan het donker wennen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
