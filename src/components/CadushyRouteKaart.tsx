// Illustratieve (niet cartografisch precieze) schets van Bonaire met de
// route van vandaag erop: een lus van Kralendijk naar Rincon en terug. De
// exacte foodtruckstops staan al als tekst hierboven; deze kaart laat vooral
// de vorm van de rit zien.
const PUNTEN = [
  { nr: "1–3, 5, 7", label: "Kralendijk (Punt Vierkant, Pita Madre, Yhanni's, Stoked, Dominican Urban)", x: 60, y: 195 },
  { nr: "4", label: "Rincon — The Cadushy Distillery", x: 72, y: 58 },
  { nr: "✨", label: "Ostracods (kust bij Kralendijk)", x: 40, y: 222 },
];

export function CadushyRouteKaart() {
  return (
    <div className="overflow-hidden rounded-xl2 bg-turquoise-50 shadow-card">
      <svg viewBox="0 0 140 300" className="h-auto w-full" role="img" aria-label="Illustratieve kaart van de route over Bonaire">
        {/* Zee */}
        <rect x="0" y="0" width="140" height="300" fill="#d3f7f3" />

        {/* Eiland, sterk vereenvoudigd */}
        <path
          d="M70 10
             C86 20, 92 45, 84 70
             C78 90, 66 95, 70 115
             C90 130, 100 150, 92 170
             C104 180, 108 200, 96 218
             C110 228, 112 250, 98 265
             C90 278, 70 288, 55 282
             C38 276, 30 260, 34 240
             C22 232, 16 212, 26 195
             C18 180, 20 160, 34 150
             C26 130, 30 108, 46 98
             C40 78, 44 55, 58 38
             C56 25, 60 14, 70 10 Z"
          fill="#eacf87"
          stroke="#d29e39"
          strokeWidth="1.5"
        />

        {/* Route-lijn: Kralendijk → Rincon → terug → ostracods */}
        <path
          d="M60 193 Q68 150 78 110 Q88 80 72 58 Q58 95 56 140 Q52 170 58 190 Q48 208 40 222"
          fill="none"
          stroke="#f0563a"
          strokeWidth="2.5"
          strokeDasharray="5 4"
          strokeLinecap="round"
        />

        {/* Kompasroos */}
        <text x="14" y="20" fontSize="8" fill="#195957" fontWeight="700">
          N ↑
        </text>

        {PUNTEN.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="9" fill="#f0563a" stroke="white" strokeWidth="1.5" />
            <text x={p.x} y={p.y + 3} fontSize="7" fill="white" fontWeight="700" textAnchor="middle">
              {p.nr}
            </text>
          </g>
        ))}
      </svg>

      <ul className="space-y-1.5 p-3 text-xs text-diepblauw-800">
        {PUNTEN.map((p, i) => (
          <li key={i} className="flex items-start gap-1.5">
            <span
              className="mt-0.5 flex h-4 min-w-4 flex-shrink-0 items-center justify-center rounded-full bg-koraal-500 px-1 text-[9px] font-bold text-white"
              aria-hidden
            >
              {p.nr}
            </span>
            {p.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
