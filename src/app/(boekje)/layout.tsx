import Link from "next/link";
import { BottomNav } from "@/components/BottomNav";
import { trip } from "@/data/trip";

export default function BoekjeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-zand-50">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-turquoise-100 bg-white/90 px-4 py-2.5 backdrop-blur">
        <Link href="/" className="focus-ring flex items-center gap-2 rounded-lg">
          <span className="text-xl" aria-hidden>
            🏝️
          </span>
          <span className="font-display text-sm font-semibold text-diepblauw-800">
            {trip.titel}
          </span>
        </Link>
        <Link
          href="/nood"
          className="focus-ring flex items-center gap-1 rounded-full bg-koraal-50 px-3 py-1.5 text-xs font-semibold text-koraal-700 transition hover:bg-koraal-100"
        >
          <span aria-hidden>🆘</span> Nood
        </Link>
      </header>

      <main className="mx-auto max-w-xl px-4 pb-28 pt-4">{children}</main>

      <BottomNav />
    </div>
  );
}
