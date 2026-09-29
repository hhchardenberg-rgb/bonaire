/** Bouwt een Google Maps-zoeklink die op mobiel automatisch in de kaart-app opent. */
export function mapsUrl(query: string): string {
  return `https://maps.google.com/?q=${encodeURIComponent(query)}`;
}

/**
 * Bouwt een Google Maps-routelink (auto) langs meerdere stops. `stops` is
 * de volgorde van start tot bestemming; alles ertussen wordt een waypoint.
 */
export function mapsRouteUrl(stops: string[]): string {
  const [origin, ...rest] = stops;
  const destination = rest[rest.length - 1];
  const waypoints = rest.slice(0, -1);
  const params = new URLSearchParams({
    api: "1",
    travelmode: "driving",
    origin,
    destination,
  });
  if (waypoints.length > 0) {
    params.set("waypoints", waypoints.join("|"));
  }
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}
