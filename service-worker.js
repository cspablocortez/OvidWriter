const VERSION = "v1"
const CACHE_NAME = `ovid-writer=${VERSION}`
const APP_STATIC_RESOURCES = [
  '/',
  '/index.html',
  'css/normalize.css',
  'css/skeleton.css',
  'css/settings.css',
  'css/style.css',
  'js/main.js',
  'js/quill-config.js',
  'js/storage.js',
  'js/settings.js',
  'js/UI.js',
  'icons/*'
]


self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      cache.addAll(APP_STATIC_RESOURCES);
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(
        names.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        }),
      );
      await clients.claim();
    })(),
  );
});
