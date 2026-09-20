import type { ActiviteitStatus } from "@/types";

const stijl: Record<ActiviteitStatus, string> = {
  optie: "bg-koraal-50 text-koraal-700",
  gepland: "bg-zand-100 text-zand-800",
  bevestigd: "bg-turquoise-100 text-turquoise-800",
  afgerond: "bg-diepblauw-100 text-diepblauw-700 line-through decoration-2",
};

const label: Record<ActiviteitStatus, string> = {
  optie: "Optie",
  gepland: "Gepland",
  bevestigd: "Bevestigd",
  afgerond: "Afgerond",
};

export function StatusBadge({ status }: { status: ActiviteitStatus }) {
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${stijl[status]}`}>
      {label[status]}
    </span>
  );
}
