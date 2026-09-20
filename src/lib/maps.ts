/** Bouwt een Google Maps-zoeklink die op mobiel automatisch in de kaart-app opent. */
export function mapsUrl(query: string): string {
  return `https://maps.google.com/?q=${encodeURIComponent(query)}`;
}
