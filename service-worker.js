importScripts(
	"https://storage.googleapis.com/workbox-cdn/releases/6.5.3/workbox-sw.js",
	"https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js",
	"https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js"
);

const { routing, strategies, expiration } = workbox;
const CACHE_NAMES = {
	assets: "assets",
	images: "images",
	startPage: "startPage"
};

routing.registerRoute(
	/\.(?:css|js|jsx|json)$/,
	new strategies.StaleWhileRevalidate({
		cacheName: CACHE_NAMES.assets,
		plugins: [
			new expiration.ExpirationPlugin({
				maxEntries: 1000,
				maxAgeSeconds: 31536000,
			}),
		],
	})
);

routing.registerRoute(
	/\.(?:png|jpg|jpeg|gif|woff2)$/,
	new strategies.CacheFirst({
		cacheName: CACHE_NAMES.images,
		plugins: [
			new expiration.ExpirationPlugin({
				maxEntries: 1000,
				maxAgeSeconds: 31536000,
			}),
		],
	})
);

routing.registerRoute(
	/(\/)$/,
	new strategies.StaleWhileRevalidate({
		cacheName: CACHE_NAMES.startPage,
		plugins: [
			new expiration.ExpirationPlugin({
				maxEntries: 1000,
				maxAgeSeconds: 31536000,
			}),
		],
	})
);

firebase.initializeApp({
	apiKey: "YOUR_API_KEY",
	authDomain: "YOUR_AUTH_DOMAIN",
	projectId: "YOUR_PROJECT_ID",
	storageBucket: "YOUR_STORAGE_BUCKET",
	messagingSenderId: "YOUR_SENDER_ID",
	appId: "YOUR_APP_ID",
	measurementId: "YOUR_MEASUREMENT_ID"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
	console.log('[firebase-messaging-sw.js] Received background message ', payload);
	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
		icon: '/pwa-192x192.png'
	};
	self.registration.showNotification(notificationTitle, notificationOptions);
});
