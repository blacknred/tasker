import { FormikErrors } from "formik";
import { mutate } from "swr";
import { ITask } from "./typings";
import { errorMap, fetcher } from "./utils";

export const HOST = `http://${process.env.API_HOST}/api/v1/`;

export function auth(url: RequestInfo) {
  return (data: object, cb?: (err?: FormikErrors<typeof data>) => void) => {
    return fetcher(url, { method: "POST", body: JSON.stringify(data) }).then(
      (res) => {
        if (res.errors) {
          cb?.(errorMap(res.errors));
        } else {
          mutate(url as string, res.data);
          cb?.(undefined);
        }
      }
    );
  };
}

export function deleteAuth(cb?: () => void) {
  fetch(HOST + "auth", { method: "DELETE" });
  mutate(null);
  cb?.();
}

export function task(url: RequestInfo, method: RequestInit["method"]) {
  return (
    data: object,
    id?: string,
    cb?: (err?: FormikErrors<typeof data>) => void
  ) => {
    return fetcher(url, { method, body: JSON.stringify(data) }).then((res) => {
      if (res.errors) {
        cb?.(errorMap(res.errors));
      } else {
        cb?.(undefined);
        if (method === "POST") {
          mutate("tasks", null);
        }
        if (method === "PATCH" && id) {
          mutate("tasks", (tasks: ITask[]) =>
            tasks.map((task) => (task.id === id ? res.data : task))
          );
        }
      }
    });
  };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  deleteAuth,
  createUser: auth(HOST + "users"),
  createAuth: auth(HOST + "auth"),
  createTask: task(HOST + "tasks", "POST"),
  updateTask: task(HOST + "tasks", "PATCH"),
};
