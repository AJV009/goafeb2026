/**
 * GOA GUIDE — Service Worker
 * Enables offline access to all static content.
 * Version hash injected by GitHub Actions at deploy time.
 */
var CACHE_VERSION = '__SW_VERSION__';
var STATIC_CACHE = 'goa-guide-' + CACHE_VERSION;
var FONT_CACHE = 'goa-guide-fonts';

var PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './css/base.css',
  './js/data.js',
  './js/state.js',
  './js/app.js',
  './config.js',
  './components/toast/toast.css',
  './components/toast/toast.js',
  './components/api/api.js',
  './components/hero/hero.css',
  './components/hero/hero.js',
  './components/sidebar/sidebar.css',
  './components/sidebar/sidebar.js',
  './components/cards/cards.css',
  './components/cards/cards.js',
  './components/voting/voting.css',
  './components/voting/voting.js',
  './components/notes/notes.css',
  './components/notes/notes.js',
  './components/checklist/checklist.css',
  './components/checklist/checklist.js',
  './components/filters/filters.css',
  './components/filters/filters.js',
  './components/search/search.css',
  './components/search/search.js',
  './components/lists/lists.css',
  './components/lists/lists.js',
  './components/lists/list-actions.js',
  './components/custom-cards/custom-cards.css',
  './components/custom-cards/custom-cards.js',
  './components/flights/flights.css',
  './components/flights/flights.js',
  './components/footer/footer.css',
  './components/footer/footer.js',
  './components/pwa/pwa.js',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// ── Install: precache all static assets ──
self.addEventListener('install', function (event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(STATIC_CACHE).then(function (cache) {
      return cache.addAll(PRECACHE_URLS);
    })
  );
});

// ── Activate: purge old static caches, keep font cache ──
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (key) {
          return key.startsWith('goa-guide-') && key !== STATIC_CACHE && key !== FONT_CACHE;
        }).map(function (key) {
          return caches.delete(key);
        })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

// ── Fetch routing ──
self.addEventListener('fetch', function (event) {
  var url = new URL(event.request.url);

  // Skip JSONBin API — let app handle with localStorage cache + sync queue
  if (url.hostname === 'api.jsonbin.io') return;

  // Google Fonts — stale-while-revalidate in persistent font cache
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.open(FONT_CACHE).then(function (cache) {
        return cache.match(event.request).then(function (cached) {
          var fetched = fetch(event.request).then(function (response) {
            if (response.ok) cache.put(event.request, response.clone());
            return response;
          }).catch(function () {
            return cached;
          });
          return cached || fetched;
        });
      })
    );
    return;
  }

  // Navigation requests — network-first, fallback to cached index.html
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(function () {
        return caches.match('./index.html');
      })
    );
    return;
  }

  // Same-origin static assets — cache-first (strip query params for lookup)
  if (url.origin === self.location.origin) {
    var cleanUrl = url.origin + url.pathname;
    event.respondWith(
      caches.match(cleanUrl).then(function (cached) {
        return cached || fetch(event.request).then(function (response) {
          if (response.ok) {
            var clone = response.clone();
            caches.open(STATIC_CACHE).then(function (cache) {
              cache.put(cleanUrl, clone);
            });
          }
          return response;
        });
      })
    );
    return;
  }
});
