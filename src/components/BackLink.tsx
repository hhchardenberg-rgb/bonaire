import Link from "next/link";

export function BackLink({ href = "/meer", label = "Meer" }: { href?: string; label?: string }) {
  return (
    <Link href={href} className="focus-ring text-sm font-medium text-turquoise-700">
      ← {label}
    </Link>
  );
}
