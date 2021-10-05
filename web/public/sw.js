"use strict";

let VAPID_PUBLIC_KEY;

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "VAPID_PUBLIC_KEY") {
    VAPID_PUBLIC_KEY = event.data.data;
  }
});

self.addEventListener("push", function (event) {
  console.log("[Service Worker] Push Received.", event.data.text());
  let title = "Tasker notification";
  const options = {
    body: "New updates",
    // icon: 'images/icon.png',
    // badge: 'images/badge.png'
    tag: "renotify",
    renotify: true,
    data: {
      time: new Date(Date.now()).toString(),
    },
  };

  try {
    data = event.data.json();
    title = data.title;
    options.body = data.message;
  } catch (e) {}

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", function (event) {
  console.log(event.notification.data);
  event.notification.close();
  event.waitUntil(clients.openWindow(self.location.origin));
});

// self.addEventListener("pushsubscriptionchange", function (event) {
//   console.log("[Service Worker]: 'pushsubscriptionchange' event fired.");
//   event.waitUntil(
//     self.registration.pushManager
//       .subscribe({
//         userVisibleOnly: true,
//         applicationServerKey: VAPID_PUBLIC_KEY,
//       })
//       .then(function (newSubscription) {
//         // TODO: Send to application server
//         console.log("[Service Worker] New subscription: ", newSubscription);
//       })
//   );
// });
