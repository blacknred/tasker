import { ValidationError } from "./typings";

export function localStorageProvider() {
  const map = new Map(JSON.parse(localStorage.getItem("app-cache") || "[]"));
  window.addEventListener("beforeunload", () => {
    const appCache = JSON.stringify(Array.from(map.entries()));
    localStorage.setItem("app-cache", appCache);
  });
  return map;
}

export function delay(ms = 1000): Promise<void> {
  return new Promise((r) => setInterval(r, ms));
}

export function fetcher<T = unknown>(res: RequestInfo, init: RequestInit) {
  return fetch(res, init)
    .then((res) => {
      if (!res.ok) throw new Error("Bad status code from server.");
      return res.json() as Promise<T>;
    })
    .catch((e: Error) => {
      throw e;
    });
}

export function errorMap(errors: ValidationError[]) {
  const map: Record<string, string> = {};
  for (let { field, message } of errors) {
    map[field] = message;
  }

  return map;
}

const intervals = [
  { label: "year", seconds: 31536000 },
  { label: "month", seconds: 2592000 },
  { label: "day", seconds: 86400 },
  { label: "hour", seconds: 3600 },
  { label: "minute", seconds: 60 },
  { label: "second", seconds: 1 },
];

export function timeSince(date: number | string) {
  const seconds = Math.floor((Date.now() - new Date(+date).getTime()) / 1000);
  const interval = intervals.find((i) => i.seconds < seconds) || intervals[5];
  const count = Math.floor(seconds / interval.seconds);
  return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
}

export function getRandBgColor(saturation = 50) {
  const colors = ["pink", "green", "orange", "gray", "facebook", "violet"];
  const index = Math.floor(Math.random() * colors.length);
  return `${colors[index]}.${saturation}`;
}

export function urlB64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}
