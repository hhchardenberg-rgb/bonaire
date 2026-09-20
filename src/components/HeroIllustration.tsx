export function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 400 220"
      role="img"
      aria-label="Illustratie van een zonsondergang boven zee met een palmboom, in sfeer van Bonaire"
      className="h-44 w-full rounded-b-xl3 shadow-floating sm:h-56"
    >
      <defs>
        <linearGradient id="lucht" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffb81c" />
          <stop offset="45%" stopColor="#fb7657" />
          <stop offset="100%" stopColor="#f0563a" />
        </linearGradient>
        <linearGradient id="zee" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3fc9bf" />
          <stop offset="100%" stopColor="#186f6c" />
        </linearGradient>
      </defs>
      <rect width="400" height="220" fill="url(#lucht)" />
      <circle cx="200" cy="110" r="42" fill="#fff2c2" opacity="0.9" />
      <rect y="130" width="400" height="90" fill="url(#zee)" />
      <path
        d="M0 130 Q 25 122 50 130 T 100 130 T 150 130 T 200 130 T 250 130 T 300 130 T 350 130 T 400 130 V220 H0 Z"
        fill="#a8eee7"
        opacity="0.35"
      />
      <g transform="translate(55 70)" fill="#195957">
        <rect x="-4" y="30" width="8" height="60" rx="3" />
        <path d="M0 30 C -20 10 -45 15 -55 0 C -35 5 -15 15 0 22 Z" />
        <path d="M0 30 C 20 8 45 12 58 -4 C 38 3 15 14 0 22 Z" />
        <path d="M0 30 C -10 6 -8 -15 -20 -28 C -6 -18 4 -2 4 20 Z" />
        <path d="M0 30 C 8 6 10 -14 22 -26 C 8 -16 -2 0 -2 20 Z" />
      </g>
      <g fill="#ffffff" opacity="0.85">
        <ellipse cx="320" cy="55" rx="26" ry="9" />
        <ellipse cx="345" cy="50" rx="18" ry="7" />
        <ellipse cx="70" cy="40" rx="20" ry="7" />
      </g>
    </svg>
  );
}
