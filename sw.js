let nameList = "v1";
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(nameList).then(cache => {
        console.log("caching");
        return cache.addAll([
          'index.html',
          'about.html',
          'contact.html',
          'staff.html',
          'normalize/normalize.css',
          'css/about.css',
          'css/contact.css',
          'css/index.css',
          'css/staff.css',
          'main.js',
          'img/175-1.jfif',
          'img/175.jfif',
          'img/176.jfif',
          'img/177.jfif',
        ]);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  console.log('Activating');
  e.waitUntil(
    Promise.all([
      clients.claim(), 
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cache => {
            if (cache !== nameList) {
              return caches.delete(cache);
            }
          })
        )
        }
      )
    ])
  )
});

self.addEventListener('fetch', e => {
  console.log("Fetching");
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});

// self.addEventListener('fetch', function(event) {
//   console.log("Fetching");
//   event.respondWith(
//     caches.match(event.request)
//       .then(function(response) {
//         if (response) {
//           return response;
//         }
//         return fetch(event.request);
//       }
//     )
//   );
//})