const CACHE_VERSION = 'kgh-v1.1.0';
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `runtime-${CACHE_VERSION}`;

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/about.html',
  '/services.html',
  '/gallery.html',
  '/contact.html',
  '/privacy.html',
  '/refund.html',
  '/404.html',
  '/offline.html',
  '/css/style.css',
  '/js/main.js',
  '/manifest.json',
  '/images/kgh.png',
  '/images/icon-192.png',
  '/images/icon-512.png',
  '/images/icon-maskable-192.png',
  '/images/icon-maskable-512.png',
  '/images/screenshot-wide.png',
  '/images/screenshot-narrow.png',
  '/images/hero-slide-1.png',
  '/images/hero-slide-2.png',
  '/images/hero-slide-3.png',
  '/48.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== STATIC_CACHE && key !== RUNTIME_CACHE)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (!url.protocol.startsWith('http')) return;

  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((response) => {
          const copy = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(req, copy));
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(req);
          if (cached) return cached;
          return caches.match('/offline.html');
        })
    );
    return;
  }

  const isSameOriginAsset =
    url.origin === self.location.origin &&
    /\.(?:css|js|png|jpg|jpeg|webp|svg|ico|json|woff2?)$/i.test(url.pathname);
  const isFontRequest = req.destination === 'font' || /fonts\.gstatic\.com/i.test(url.hostname);

  if (!isSameOriginAsset && !isFontRequest) return;

  event.respondWith(
    caches.match(req).then((cached) => {
      const networkFetch = fetch(req)
        .then((response) => {
          const copy = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(req, copy));
          return response;
        })
        .catch(() => cached);

      return cached || networkFetch;
    })
  );
});
