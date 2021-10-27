import { createStandaloneToast } from "@chakra-ui/toast";
import { dataAttr } from "@chakra-ui/utils";
import { Fetcher, Key, SWRConfiguration, SWRHook } from "swr";
import { ValidationError } from "./typings";

const INTERVALS = [
  { label: "year", seconds: 31536000 },
  { label: "month", seconds: 2592000 },
  { label: "day", seconds: 86400 },
  { label: "hour", seconds: 3600 },
  { label: "minute", seconds: 60 },
  { label: "second", seconds: 1 },
];

export const HOST = `${process.env.API_HOST}/api/v1/`;

export const showToast = createStandaloneToast({
  defaultOptions: {
    status: "warning",
    duration: 5000,
    isClosable: true,
    position: "bottom-left",
  },
});

export function localStorageProvider() {
  if (isServer()) return new Map();

  const map = new Map(JSON.parse(localStorage.getItem("app-cache") || "[]"));
  window.addEventListener("beforeunload", () => {
    const appCache = JSON.stringify(Array.from(map.entries()));
    localStorage.setItem("app-cache", appCache);
  });

  return map;
}

export const isServer = () => typeof window === "undefined";

export function delay(ms = 1000): Promise<void> {
  return new Promise((r) => setInterval(r, ms));
}

export async function fetcher<T = unknown>(
  res: RequestInfo,
  init: RequestInit
) {
  return fetch(res, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    ...init,
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.message) throw new Error(res.message);
      return res as T;
    });
}

export function logger(useSWRNext: SWRHook) {
  return (key: Key, fetcher: Fetcher<unknown> | null, config: SWRConfiguration) => {
    const res = useSWRNext(key, fetcher, config);
    console.log("SWR Request:", key, res.data);

    return res;
  };
}

export function errorMap(errors: ValidationError[]) {
  const map: Record<string, string> = {};
  for (let { field, message } of errors) {
    map[field] = message;
  }

  return map;
}

export function timeSince(date: number | string) {
  if (typeof date === 'string') date = Date.parse(date);
  const seconds = Math.floor((Date.now() - new Date(+date).getTime()) / 1000);
  const interval = INTERVALS.find((i) => i.seconds < seconds) || INTERVALS[5];
  const count = Math.floor(seconds / interval.seconds);
  return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
}

export function getRandColor(saturation = 50) {
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
