"use strict";

let VAPID_PUBLIC_KEY;

function isClientFocused() {
  return clients
    .matchAll({
      type: "window",
      includeUncontrolled: true,
    })
    .then((clients) => clients.some((client) => client.focused));
}

function findMatchingClient(urlToOpen) {
  clients
    .matchAll({
      type: "window",
      includeUncontrolled: true,
    })
    .then((clients) => clients.find((client) => client.url === urlToOpen));
}

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "VAPID_PUBLIC_KEY") {
    VAPID_PUBLIC_KEY = event.data.data;
  }
});

self.addEventListener("push", (event) => {
  console.log("[Service Worker] Push Received.", event.data.text());

  const promiseChain = isClientFocused().then((clientIsFocused) => {
    try {
      const { title, message } = event.data.json();

      // send notification to app
      windowClients.forEach((windowClient) => {
        windowClient.postMessage({ title, message });
      });

      // raise a notification if tab closed or a browser hidden
      if (!clientIsFocused) {
        return self.registration.showNotification(title, {
          body: message,
          tag: "renotify",
          renotify: true,
          // icon: 'images/icon.png',
          // badge: 'images/badge.png',
        });
      }
    } catch (e) {}
  });

  event.waitUntil(promiseChain);
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  const urlToOpen = new URL(examplePage, self.location.origin).href;
  const promiseChain = findMatchingClient(urlToOpen).then((matchingClient) => {
    // focus existing tab or open new one otherwise
    if (matchingClient) {
      return matchingClient.focus();
    } else {
      return clients.openWindow(urlToOpen);
    }
  });

  event.waitUntil(promiseChain);
});

self.addEventListener("pushsubscriptionchange", function (event) {
  console.log("[Service Worker]: 'pushsubscriptionchange' event fired by browser.");
  // event.waitUntil(
  //   self.registration.pushManager
  //     .subscribe({
  //       userVisibleOnly: true,
  //       applicationServerKey: VAPID_PUBLIC_KEY,
  //     })
  //     .then(function (newSubscription) {
  //       // TODO: Send to application server
  //       console.log("[Service Worker] New subscription: ", newSubscription);
  //     })
  // );
});
