// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyA_0VHHpQJE3JLEMBH4Gk85DcjMjOr_oi0",
    authDomain: "demofires-01.firebaseapp.com",
    projectId: "demofires-01",
    storageBucket: "demofires-01.appspot.com",
    messagingSenderId: "197488042281",
    appId: "1:197488042281:web:cb0f67fa8bc14477475738",
    measurementId: "G-F2R0DMDDEF"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: '/pwa-192x192.png'
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });