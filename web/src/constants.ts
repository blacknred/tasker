export const SPOILERS = {
  "email-token-sent":
    "A confirmation link has been sent to the email address. It will be available for 1 hour.",
  "create-account-done": "A new account has been created.",
  "restore-account-done":
    "The restoration has been completed. Password updated successfully.",
};

export const MESSAGES = Object.keys(SPOILERS).reduce(
  (a, k) => ({ ...a, [k]: k }),
  {} as typeof SPOILERS
);

export const INTERVALS = [
  { label: "year", seconds: 31536000 },
  { label: "month", seconds: 2592000 },
  { label: "day", seconds: 86400 },
  { label: "hour", seconds: 3600 },
  { label: "minute", seconds: 60 },
  { label: "second", seconds: 1 },
];

export const HOST = `${process.env.API_HOST}/api/v1/`;
