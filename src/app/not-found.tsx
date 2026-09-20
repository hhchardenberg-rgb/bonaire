import Link from "next/link";

export default function RootNietGevonden() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-3 bg-zand-50 px-4 text-center">
      <span className="text-5xl" aria-hidden>
        🧭
      </span>
      <h1 className="font-display text-xl font-bold text-diepblauw-800">Pagina niet gevonden</h1>
      <Link href="/" className="rounded-full bg-turquoise-500 px-4 py-2 text-sm font-semibold text-white">
        Naar het beginscherm
      </Link>
    </main>
  );
}
