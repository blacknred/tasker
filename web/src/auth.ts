import router from "next/router";
import { mutate } from "swr";
import { fetcher } from "./utils";

export function auth(url: RequestInfo) {
  return (data: object) => {
    return fetcher(url, { method: "POST", body: JSON.stringify(data) })
      .then((res) => {
        if (res.errors) {
          return res.errors;
        }
        mutate("api/v1/users/auth", res.data);
        router.push("/dashboard");
      })
      .catch((e) => console.log(e.message));
  };
}

export function logout() {
  fetch("api/v1/users/auth", { method: "DELETE" })
  mutate(null);
  router.replace("/");
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  register: auth('"api/v1/users/create"'),
  login: auth('"api/v1/users/login"'),
  logout
};
