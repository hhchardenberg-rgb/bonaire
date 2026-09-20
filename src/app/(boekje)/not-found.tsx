import Link from "next/link";

export default function NietGevonden() {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center">
      <span className="text-5xl" aria-hidden>
        🧭
      </span>
      <h1 className="font-display text-xl font-bold text-diepblauw-800">Pagina niet gevonden</h1>
      <p className="max-w-xs text-sm text-diepblauw-700/70">
        Deze pagina bestaat niet (meer). Ga terug naar het beginscherm.
      </p>
      <Link
        href="/"
        className="focus-ring rounded-full bg-turquoise-500 px-4 py-2 text-sm font-semibold text-white hover:bg-turquoise-600"
      >
        Naar het beginscherm
      </Link>
    </div>
  );
}
