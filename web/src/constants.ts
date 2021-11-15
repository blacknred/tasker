export const SPOILERS = {
  "confirmation-link-sent": "A confirmation link has been sent to the email address. Use it during 1 day.",
  "invitation-link-sent": "An invitation link has been sent to the email address.",
  "create-account-done": "A new account has been created.",
  "update-account-done": "An account has been updated.",
  "update-email-done": "An email has been updated.",
  "update-password-done": "A password has been updated.",
  "restore-account-done": "The restoration has been completed. Password updated successfully.",
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

export const MAX_FILE_SIZE = 1024 * 1024 * 2;

export const MB = 1024 * 1024;
