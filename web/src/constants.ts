export const SPOILERS = {
  "restore-account-terms":
    "To restore access to your account, you must enter the associated email address.\n" +
    "A confirmation link will be sent to the specified address to continue restoring access.",
  "restore-account-confirm":
    "The confirmation link was sent to the email address. Use it to proceed restoration.",
  "restore-account-password":
    "Now you need to set up new password.",
  "restore-account-done":
    "The restoration has been completed. Password updated successfully.",
  "create-account-confirm":
    "A confirmation link has been sent to the email address. Use it to activate your account.",
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
