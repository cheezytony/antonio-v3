const CACHE_VERSION = 'v1';
const STATIC_CACHE = `antonio-static-${CACHE_VERSION}`;
const ASSET_CACHE = `antonio-assets-${CACHE_VERSION}`;
const ALL_CACHES = [STATIC_CACHE, ASSET_CACHE];

// Pre-cache the app shell on install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(['/'])),
  );
  self.skipWaiting();
});

// Delete stale caches on activate
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => !ALL_CACHES.includes(k)).map((k) => caches.delete(k))),
      ),
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET requests from the same origin
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  // Static assets (JS, CSS, images, fonts) — cache first, network fallback
  if (/\.(js|css|png|jpg|jpeg|svg|gif|webp|ico|woff2?|ttf|otf)(\?.*)?$/.test(url.pathname)) {
    event.respondWith(
      caches.open(ASSET_CACHE).then((cache) =>
        cache.match(request).then((cached) => {
          if (cached) return cached;
          return fetch(request).then((response) => {
            if (response.ok) cache.put(request, response.clone());
            return response;
          });
        }),
      ),
    );
    return;
  }

  // Navigation — network first, fall back to cached shell
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => caches.match('/')),
    );
  }
});
