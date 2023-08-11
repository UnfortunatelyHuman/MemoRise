let customCache = "C_V1.0";

self.addEventListener("install", (event) => {
  console.log("Installed Successfully");
  self.skipWaiting();
  //caching
  event.waitUntil(
    caches
      .open(customCache)
      .then((cache) => {
        cache.add("/");
        cache.add("/css/style.css");
        cache.add("/index.html");
        cache.add("/manifest.json");
        cache.add("/js/script.js");
        cache.add("/images/logo.png");
        cache.add("/icons/favicon.ico");
      })
      .catch(() => {
        console.log("Caching Failed");
      })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
  //Deleting older caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      cacheNames.forEach((value) => {
        if (value !== customCache) {
          caches.delete(value);
        }
      });
    })
  );
});

//Stale while revalidate
self.addEventListener("fetch", (event) => {
  if (event.request.method === "GET") {
    event.respondWith(
      caches.open(customCache).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          const fetchedResponse = fetch(event.request).then(
            (networkResponse) => {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            }
          );
          return cachedResponse || fetchedResponse;
        });
      })
    );
  }
});
