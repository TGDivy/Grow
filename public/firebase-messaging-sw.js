// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: `REPLACE_WITH_YOUR_FIREBASE_MESSAGING_API_KEY`,
  authDomain: `REPLACE_WITH_YOUR_FIREBASE_MESSAGING_AUTH_DOMAIN`,
  projectId: `REPLACE_WITH_YOUR_FIREBASE_MESSAGING_PROJECT_ID`,
  storageBucket: `REPLACE_WITH_YOUR_FIREBASE_MESSAGING_STORAGE_BUCKET`,
  messagingSenderId: `REPLACE_WITH_YOUR_FIREBASE_MESSAGING_SENDER_ID`,
  appId: `REPLACE_WITH_YOUR_FIREBASE_MESSAGING_APP_ID`,
  measurementId: `REPLACE_WITH_YOUR_FIREBASE_MESSAGING_MEASUREMENT_ID`,
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function (payload) {
//   console.log("Received background message ", payload);
//   // Customize notification here
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: "Nonono",
//   };

//   // payload data contains the time to show the notification
//   let timeToNotify = payload.data?.timeToNotify;

//   // if the time to notify is not specified, show the notification after 5 seconds
//   if (!timeToNotify) {
//     timeToNotify = Date.now() + 10000;
//   }

//   // convert the time to notify to a date object
//   const dateToNotify = new Date(timeToNotify);

//   // Show the notification at the specified time by timing out the function
//   setTimeout(() => {
//     self.registration.showNotification(notificationTitle, notificationOptions);
//   }, 3000);
// });
