export function MapLinkButton({ url, label = "Open in kaart-app" }: { url: string; label?: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="focus-ring inline-flex items-center gap-1.5 rounded-full bg-diepblauw-700 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-diepblauw-800 active:scale-[0.97]"
    >
      <span aria-hidden>📍</span>
      {label}
    </a>
  );
}
