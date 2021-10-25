import api from "./mutations";
import { showToast, urlB64ToUint8Array } from "./utils";

export class PushNotificationService {
  private registration?: ServiceWorkerRegistration;

  private error(e: Error) {
    console.error(e.message);
    showToast({
      title: "Push Notifications error.",
      description: e.message,
      status: "error",
    });
  }

  init(path: string) {
    if (!("serviceWorker" in navigator && "PushManager" in window)) {
      console.warn("Push Notifications is not supported");
      return;
    }

    // get notifications from sw
    navigator.serviceWorker.addEventListener("message", (event) => {
      console.log("Received a message from SW: ", event.data);
    });

    navigator.serviceWorker.register(path).then((registration) => {
      console.log("SW registration scope: ", registration.scope);
      this.registration = registration;

      // initial subscription
      registration.pushManager.getSubscription().then((sub) => {
        if (sub) api.createPushSubscription(sub);
        else api.deletePushSubscription();
      });
    }, this.error);
  }

  subscribe(vapidPublicKey: string) {
    const applicationServerKey = urlB64ToUint8Array(vapidPublicKey);

    // send key to SW
    navigator.serviceWorker.controller?.postMessage({
      type: "VAPID_PUBLIC_KEY",
      data: applicationServerKey,
    });

    // subscribe for notifications
    this.registration?.pushManager
      .subscribe({
        applicationServerKey,
        userVisibleOnly: true,
      })
      .then(api.createPushSubscription, this.error);
  }

  unsubscribe() {
    // unsubscribe from notifications
    this.registration?.pushManager
      .getSubscription()
      .then((sub) => {
        sub?.unsubscribe();
      })
      .then(api.deletePushSubscription, this.error);
  }
}

export default new PushNotificationService();
