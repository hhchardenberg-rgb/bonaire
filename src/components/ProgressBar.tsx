export function ProgressBar({ voltooid, totaal }: { voltooid: number; totaal: number }) {
  const percentage = totaal > 0 ? Math.round((voltooid / totaal) * 100) : 0;
  return (
    <div>
      <div className="flex items-center justify-between text-xs font-medium text-diepblauw-700/70">
        <span>Voortgang</span>
        <span>
          {voltooid} / {totaal} ({percentage}%)
        </span>
      </div>
      <div className="mt-1 h-2.5 w-full overflow-hidden rounded-full bg-turquoise-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-turquoise-400 to-koraal-400 transition-all duration-500"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
