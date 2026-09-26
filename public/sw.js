// Simpele service worker voor optionele PWA-installatie en offline toegang tot
// eerder bezochte pagina's. Geen tracking, geen externe requests.
//
// Alles gaat network-first: eerst een verse fetch proberen en die
// cachen, en alleen bij een mislukte fetch (bv. offline) terugvallen op de
// cache. Dit voorkomt dat client-side navigatie (Next.js RSC-payloads,
// scripts) blijft hangen op een oude gecachte versie na een nieuwe deploy —
// dat gaf eerder het probleem dat nieuwe voorpagina-content niet verscheen
// als je terugnavigeerde binnen de app.
const CACHE_NAAM = "bonaire-boekje-v3";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((namen) =>
      Promise.all(namen.filter((naam) => naam !== CACHE_NAAM).map((naam) => caches.delete(naam)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  // Nooit auth-routes of de login-pagina cachen.
  if (url.pathname.startsWith("/api/")) return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        const kopie = response.clone();
        caches.open(CACHE_NAAM).then((cache) => cache.put(request, kopie));
        return response;
      })
      .catch(() => caches.match(request).then((r) => r || caches.match("/")))
  );
});
