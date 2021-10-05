import { createStandaloneToast } from "@chakra-ui/react";
import api from "./api";
import { urlB64ToUint8Array } from "./utils";

export class PushNotificationService {
  private registration?: ServiceWorkerRegistration;
  logger = createStandaloneToast();

  private error(e: Error) {
    console.error(e.message);
    this.logger?.({
      title: "Push Notifications error.",
      description: e.message,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  }

  init(path: string) {
    if (!("serviceWorker" in navigator && "PushManager" in window)) {
      console.warn("Push Notifications is not supported");
      return;
    }

    navigator.serviceWorker.register(path).then((registration) => {
      console.log("SW registration scope: ", registration.scope);
      this.registration = registration;
      registration.pushManager.getSubscription().then((sub) => {
        if (sub) api.createPushSubscription(sub);
        else api.deletePushSubscription(undefined);
      });
    }, this.error);
  }

  subscribe(VAPID_PUBLIC_KEY: string) {
    const applicationServerKey = urlB64ToUint8Array(VAPID_PUBLIC_KEY);
    navigator.serviceWorker.controller?.postMessage({
      type: "VAPID_PUBLIC_KEY",
      data: applicationServerKey,
    });

    this.registration?.pushManager
      .subscribe({
        applicationServerKey,
        userVisibleOnly: true,
      })
      .then(api.createPushSubscription);
  }

  unsubscribe() {
    this.registration?.pushManager
      .getSubscription()
      .then((sub) => sub?.unsubscribe());
  }

  // askPermission() {
  //   return new Promise(function (resolve, reject) {
  //     const permissionResult = Notification.requestPermission(function (
  //       result
  //     ) {
  //       resolve(result);
  //     });

  //     if (permissionResult) {
  //       permissionResult.then(resolve, reject);
  //     }
  //   });
  //   // .then(function(permissionResult) {
  //   //   if (permissionResult !== 'granted') {
  //   //     throw new Error('We weren\'t granted permission.');
  //   //   }
  //   // });
  // }
}

export default new PushNotificationService();
