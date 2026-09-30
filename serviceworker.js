const CACHE_NAME = "dev-coffe-v4";

const APP_SHELL = [
	"./",
	"./index.html",
	"./manifest.json",
	"./detalle.html",
	"./css/styles.css",
	"./js/app.js",
	"./js/detalle.js",
	"./images/coffee1.jpg",
	"./images/coffee2.jpg",
	"./images/coffee3.jpg",
	"./images/coffee4.jpg",
	"./images/coffee5.jpg",
	"./images/coffee6.jpg",
	"./images/coffee7.jpg",
	"./images/coffee8.jpg",
	"./images/coffee9.jpg",
	"./images/coffee10.jpg",
	"./images/icons/icon-72x72.png",
	"./images/icons/icon-96x96.png",
	"./images/icons/icon-128x128.png",
	"./images/icons/icon-144x144.png",
	"./images/icons/icon-152x152.png",
	"./images/icons/icon-192x192.png",
	"./images/icons/icon-384x384.png",
	"./images/icons/icon-512x512.png"
];

self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
	);
	self.skipWaiting();
});

self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches.keys().then((cacheNames) =>
			Promise.all(
				cacheNames
					.filter((cacheName) => cacheName !== CACHE_NAME)
					.map((cacheName) => caches.delete(cacheName))
			)
		)
	);
	self.clients.claim();
});

self.addEventListener("fetch", (event) => {
	const requestUrl = new URL(event.request.url);
	if (
		requestUrl.origin !== self.location.origin ||
		!(["http:", "https:"].includes(requestUrl.protocol))
	) {
		return;
	}

	if (event.request.method !== "GET") {
		return;
	}

	if (event.request.mode === "navigate") {
		event.respondWith(
			fetch(event.request).catch(() => caches.match("./index.html"))
		);
		return;
	}

	event.respondWith(
		caches.match(event.request).then((cachedResponse) => {
			if (cachedResponse) {
				return cachedResponse;
			}

			return fetch(event.request).then((networkResponse) => {
				if (!networkResponse || networkResponse.status !== 200) {
					return networkResponse;
				}

				return caches.open(CACHE_NAME)
					.then((cache) => cache.put(event.request, networkResponse.clone()))
					.catch(() => {})
					.then(() => networkResponse);
			});
		})
	);
});
