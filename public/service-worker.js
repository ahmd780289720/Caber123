const CACHE_NAME = 'cyberquest-v4-fix';
// We only cache the manifest initially. We let the HTML resolve via network
// to prevent the "stale index.html" 404 loop.
const urlsToCache = [
  './manifest.json'
];

// Install SW
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Force activation immediately
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate and clean old caches immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch Strategy
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Strategy: Network First, Fallback to Cache.
  // If Network returns 404, DO NOT CACHE IT.
  event.respondWith(
    fetch(request)
      .then((networkResponse) => {
        // Check if we received a valid response
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        // Clone the response to store in cache
        const responseToCache = networkResponse.clone();

        caches.open(CACHE_NAME)
          .then((cache) => {
            // Only cache valid GET requests (exclude API calls if needed, but here we cache assets)
            if (request.method === 'GET') {
              cache.put(request, responseToCache);
            }
          });

        return networkResponse;
      })
      .catch(() => {
        // If network fails (offline), look in cache
        return caches.match(request);
      })
  );
});