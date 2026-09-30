/* Daymark service worker: cache-first, refreshes the cache in the background.
   Bump VERSION whenever any file changes so installed apps pick up the update. */
const VERSION = 'daymark-v7';
const FILES = [
  './', 'index.html', 'manifest.webmanifest', 'favicon.ico',
  'icon-32.png', 'icon-96.png', 'icon-192.png', 'icon-512.png',
  'icon-maskable-192.png', 'icon-maskable-512.png', 'apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  e.respondWith(
    caches.open(VERSION).then(cache =>
      cache.match(r, { ignoreSearch: true }).then(hit => {
        const net = fetch(r).then(res => {
          if (res && res.ok) cache.put(r, res.clone());
          return res;
        }).catch(() => null);
        if (hit) { e.waitUntil(net); return hit; }
        return net.then(res => res || (r.mode === 'navigate' ? cache.match('index.html') : Response.error()));
      })
    )
  );
});
