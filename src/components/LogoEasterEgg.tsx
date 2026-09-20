"use client";

import { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const TIKKEN_NODIG = 5;
const VENSTER_MS = 2000;

export function LogoEasterEgg({ titel }: { titel: string }) {
  const router = useRouter();
  const tellerRef = useRef(0);
  const laatsteTikRef = useRef(0);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const nu = Date.now();
    if (nu - laatsteTikRef.current > VENSTER_MS) {
      tellerRef.current = 0;
    }
    tellerRef.current += 1;
    laatsteTikRef.current = nu;

    if (tellerRef.current >= TIKKEN_NODIG) {
      e.preventDefault();
      tellerRef.current = 0;
      router.push("/meer/fun/geheim");
    }
  }

  return (
    <Link href="/" onClick={handleClick} className="focus-ring flex items-center gap-2 rounded-lg">
      <span className="text-xl" aria-hidden>
        🏝️
      </span>
      <span className="font-display text-sm font-semibold text-diepblauw-800">{titel}</span>
    </Link>
  );
}
