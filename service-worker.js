self.addEventListener('install', function(e) {
    e.waitUntil(
      caches.open('my-app').then(function(cache) {
        return cache.addAll([
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
          'js/UI.js'
        ]);
      })
    );
   });
   
   self.addEventListener('fetch', function(event) {
    console.log(event.request.url);
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
   });
   