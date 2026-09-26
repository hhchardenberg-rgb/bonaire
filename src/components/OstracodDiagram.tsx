const SPARKLES = [
  { left: "12%", top: "18%", delay: "0s" },
  { left: "32%", top: "38%", delay: "0.4s" },
  { left: "54%", top: "14%", delay: "0.8s" },
  { left: "72%", top: "34%", delay: "0.2s" },
  { left: "22%", top: "58%", delay: "0.6s" },
  { left: "62%", top: "56%", delay: "1s" },
  { left: "42%", top: "24%", delay: "1.2s" },
  { left: "85%", top: "50%", delay: "0.3s" },
];

export function OstracodDiagram() {
  return (
    <div className="overflow-hidden rounded-xl2 shadow-card">
      <div className="flex items-center justify-between bg-turquoise-50 px-4 py-2 text-xs font-semibold text-turquoise-800">
        <span>🌊 Oppervlakte</span>
        <span aria-hidden>↑</span>
      </div>

      <div
        className="relative h-48"
        style={{
          background: "linear-gradient(to bottom, #0f3d63 0%, #0a2847 55%, #071b30 100%)",
        }}
      >
        {SPARKLES.map((s, i) => (
          <span
            key={i}
            className="absolute animate-pulse text-lg"
            style={{ left: s.left, top: s.top, animationDelay: s.delay }}
            aria-hidden
          >
            ✨
          </span>
        ))}
        <p className="absolute bottom-2 right-3 text-[11px] font-medium text-white/70">
          ← hier zie je de lichtsignalen
        </p>
      </div>

      <div className="bg-[#1c3a2e] px-4 py-3 text-center text-2xl leading-tight">
        <p aria-hidden>🌿🪸🌿🪸🪸🌿</p>
        <p aria-hidden>🪨🪸🪨🪸🪨</p>
      </div>
      <div className="bg-[#163025] px-4 py-2 text-center text-xs font-medium text-white/80">
        Ondiep rif — veel structuur
      </div>
    </div>
  );
}
