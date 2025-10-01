import { createHandlerBoundToURL, precacheAndRoute } from "workbox-precaching";
import { registerRoute, NavigationRoute } from "workbox-routing";
import {  NetworkFirst } from "workbox-strategies";
 
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// const specialUrls = [
//   "https://api.staging0.swai.ai/users/getCurrentUser",
//   "https://api.swai.ai/users/getCurrentUser",
// ];

// registerRoute(
//   ({ url }) => specialUrls.includes(url.href),
//   new NetworkFirst({
//     cacheName: "dynamic-api-v1",
//     networkTimeoutSeconds: 3,
//   }),
// );
// registerRoute(
//   ({ request }) => request.destination === "image",
//   new StaleWhileRevalidate({
//     cacheName: "images-cache",
//     plugins: [
//       new ExpirationPlugin({
//         maxEntries: 150,
//         maxAgeSeconds: 5 * 24 * 60 * 60, 
//       }),
//     ],
//   }),
// );

const handler = createHandlerBoundToURL("/index.html");
const navigationRoute = new NavigationRoute(handler, {
  denylist: [/^\/api\//, /\/assets\//],
});
registerRoute(navigationRoute);
