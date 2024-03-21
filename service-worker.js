const VERSION = "v1"
const CACHE_NAME = `ovid-writer=${VERSION}`
const APP_STATIC_RESOURCES = [
  'https://cdn.quilljs.com/1.3.6/quill.bubble.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
  '/',
  'index.html',
  'css/normalize.css',
  'css/skeleton.css',
  'css/settings.css',
  'css/style.css',
  'https://cdn.quilljs.com/1.3.6/quill.js',
  'js/main.js',
  'js/quill-config.js',
  'js/storage.js',
  'js/settings.js',
  'js/UI.js',
  'manifest.json',
  'icons/favicon.ico',
  'icons/apple-touch-icon.png',
  'icons/android-chrome-192x192.png',
  'icons/android-chrome-512x512.png',
  'icons/favicon-16x16.png',
  'icons/favicon-32x32.png'
]


self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      cache.addAll(APP_STATIC_RESOURCES);
    })(),
  );
});

// self.addEventListener("activate", (event) => {
//   event.waitUntil(
//     (async () => {
//       const names = await caches.keys();
//       await Promise.all(
//         names.map((name) => {
//           if (name !== CACHE_NAME) {
//             return caches.delete(name);
//           }
//         }),
//       );
//       await clients.claim();
//     })(),
//   );
// });

// self.addEventListener("fetch", (event) => {
//   // when seeking an HTML page
//   if (event.request.mode === "navigate") {
//     // Return to the index.html page
//     event.respondWith(caches.match("index.html"));
//     return;
//   }

//   // For every other request type
//   event.respondWith(
//     (async () => {
//       const cache = await caches.open(CACHE_NAME);
//       const cachedResponse = await cache.match(event.request.url);
//       if (cachedResponse) {
//         // Return the cached response if it's available.
//         return cachedResponse;
//       }
//       // Respond with a HTTP 404 response status.
//       return new Response(null, { status: 404 });
//     })(),
//   );
// });