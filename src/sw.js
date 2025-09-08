import { precacheAndRoute } from "workbox-precaching";
precacheAndRoute(self.__WB_MANIFEST);
const limitInCache = (key, size) => {
  caches.open(key).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitInCache(key, size));
      }
    });
  });
};
const cachversion = 5;
const activeCach = {
  static: `Static-${cachversion}`,
  dynamic: `dynamic-${cachversion}`,
};

self.addEventListener("install", (e) => {
  self.skipWaiting(); 
  e.waitUntil(
    caches.open(activeCach["static"]).then((Cache) => {
      Cache.add("/fallback.html");
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
   
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== activeCach.static) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


self.addEventListener("fetch", (e) => {
  const apiBase = "https://fakestoreapi.com";
  if (e.request.url.startsWith(apiBase)) {
    return e.respondWith(fetch(e.request));
  } else {
    e.respondWith(
      caches.match(e.request).then((res) => {
        if (res) {
          return res;
        } else {
          return fetch(e.request)
            .then((serverRes) => {
              return caches.open(activeCach["dynamic"]).then((cache) => {
                cache.put(e.request, serverRes.clone());
                return serverRes;
              });
            })
            .catch((err) => {
              return caches.match("/fallback.html");
            });
        }
      })
    );
  }
});

// self.addEventListener("notificationclick", (e) => {
//   const action = e.action;
//   const notification = e.notification;
//   notification.close();
//   if (action === "confirm") {
//     console.log("confirm");
//   } else if (action === "reject") {
//     console.log("reject");
//   }
// });
// self.addEventListener("notificationclose", (e) => {
//   console.log("notification closed");
// });

self.addEventListener("push", (e) => {
  // show notification
});
