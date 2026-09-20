"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/vandaag", label: "Vandaag", emoji: "☀️" },
  { href: "/programma", label: "Programma", emoji: "🗓️" },
  { href: "/gids", label: "Gids", emoji: "🧭" },
  { href: "/kaart", label: "Kaart", emoji: "📍" },
  { href: "/meer", label: "Meer", emoji: "✨" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Hoofdnavigatie"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-turquoise-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto flex max-w-xl items-stretch justify-between px-1">
        {items.map((item) => {
          const actief = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className={`focus-ring flex flex-col items-center gap-0.5 px-2 py-2.5 text-xs font-medium transition-colors ${
                  actief ? "text-koraal-600" : "text-diepblauw-700/60 hover:text-turquoise-600"
                }`}
                aria-current={actief ? "page" : undefined}
              >
                <span
                  className={`text-xl leading-none transition-transform ${actief ? "scale-110" : ""}`}
                  aria-hidden
                >
                  {item.emoji}
                </span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
