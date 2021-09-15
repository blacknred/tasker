import { FormikErrors } from "formik";
import { mutate } from "swr";
import { ITask } from "./typings";
import { errorMap, fetcher } from "./utils";

export function auth(url: RequestInfo) {
  return (data: object, cb?: (err?: FormikErrors<typeof data>) => void) => {
    return fetcher(url, { method: "POST", body: JSON.stringify(data) })
      .catch((e) => console.log(e.message))
      .then((res) => {
        if (res.errors) {
          cb?.(errorMap(res.errors));
        } else {
          mutate("api/v1/users/auth", res.data);
          cb?.(undefined);
        }
      });
  };
}

export function logout(cb?: () => void) {
  fetch("api/v1/users/auth", { method: "DELETE" });
  mutate(null);
  cb?.();
}

export function task(url: RequestInfo, method: RequestInit["method"]) {
  return (
    data: object,
    id?: string,
    cb?: (err?: FormikErrors<typeof data>) => void
  ) => {
    return fetcher(url, { method, body: JSON.stringify(data) })
      .catch((e) => console.log(e.message))
      .then((res) => {
        if (res.errors) {
          cb?.(errorMap(res.errors));
        } else {
          if (method === "POST") {
            mutate("api/v1/tasks", null);
          }
          if (method === "PATCH" && id) {
            mutate("api/v1/tasks", (tasks: ITask[]) => {
              return tasks.map((task) => (task.id === id ? res.data : task));
            });
          }
          cb?.(undefined);
        }
      });
  };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  logout,
  register: auth("api/v1/users"),
  login: auth('"api/v1/users/login"'),
  createTask: task("api/v1/tasks", "POST"),
  updateTask: task("api/v1/tasks", "PATCH"),
};
