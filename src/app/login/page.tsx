import { trip } from "@/data/trip";

export const metadata = {
  title: `Inloggen · ${trip.titel}`,
};

export default function LoginPage({
  searchParams,
}: {
  searchParams: { van?: string; fout?: string };
}) {
  const van = searchParams?.van && searchParams.van.startsWith("/") ? searchParams.van : "/";
  const fout = searchParams?.fout === "1";

  return (
    <main className="flex min-h-dvh items-center justify-center bg-gradient-to-b from-turquoise-500 via-turquoise-400 to-zon-200 px-4 py-10">
      <div className="w-full max-w-sm animate-pop-in rounded-xl3 bg-white/95 p-7 shadow-floating backdrop-blur">
        <div className="mb-5 flex flex-col items-center text-center">
          <span className="mb-2 text-5xl animate-bob" aria-hidden>
            🏝️
          </span>
          <h1 className="font-display text-2xl font-bold text-diepblauw-800">{trip.titel}</h1>
          <p className="mt-1 text-sm text-diepblauw-700/70">
            Privé vakantieboekje voor de groep. Voer de gedeelde toegangscode in.
          </p>
        </div>

        <form action="/api/auth" method="POST" className="space-y-4">
          <input type="hidden" name="van" value={van} />
          <div>
            <label htmlFor="code" className="mb-1 block text-sm font-medium text-diepblauw-800">
              Toegangscode
            </label>
            <input
              id="code"
              name="code"
              type="password"
              inputMode="text"
              autoComplete="off"
              autoFocus
              required
              placeholder="••••••••"
              className="w-full rounded-xl border-2 border-turquoise-200 bg-white px-4 py-3 text-lg tracking-widest text-diepblauw-900 outline-none transition focus:border-turquoise-500 focus:ring-4 focus:ring-turquoise-100"
            />
          </div>

          {fout && (
            <p role="alert" className="rounded-lg bg-koraal-50 px-3 py-2 text-sm font-medium text-koraal-700">
              Deze code klopt niet. Vraag de code aan de reisorganisator.
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-koraal-500 px-4 py-3 text-base font-semibold text-white shadow-card transition hover:bg-koraal-600 active:scale-[0.98]"
          >
            Open het boekje
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-diepblauw-700/50">
          Deze site is privé en niet zichtbaar in zoekmachines.
        </p>
      </div>
    </main>
  );
}
