import { FormikErrors } from "formik";
import { mutate } from "swr";
import { HOST } from "./constants";
import pushService from "./push";
import { IAuth, IResponse, ITask } from "./typings";
import { errorMap, fetcher, showToast } from "./utils";

export function mutation<T = unknown>(
  endpoint: string,
  method: RequestInit["method"],
  onSuccess?: (data?: T) => void
) {
  return async (
    payload?: unknown,
    cb?: (err?: FormikErrors<typeof payload>, data?: T) => void,
    id?: string
  ) => {
    return fetcher<IResponse<T>>(HOST + endpoint + (id ? `/${id}` : ""), {
      body: JSON.stringify(payload),
      method,
    })
      .then((res) => {
        if (res.errors) {
          cb?.(errorMap(res.errors));
        } else if (res.data !== undefined) {
          cb?.(undefined, res.data);
          onSuccess?.(res.data);
        }
      })
      .catch((e: Error) => {
        cb?.({});
        showToast({
          title: "Network error",
          description: e.message,
          status: "error",
        });
      });
  };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  createUserToken: mutation("users/token", "POST"),
  createUser: mutation("users", "POST", (data) => mutate(`${HOST}auth`, data)),
  getUsers: mutation("users", "GET"),
  updateUser: mutation("users", "PATCH"),
  restoreUser: mutation("users/restore", "PATCH"),
  deleteUser: mutation("users", "DELETE"),

  createAuth: mutation<IAuth>("auth", "POST", (data) => {
    mutate(`${HOST}auth`, data);
    if (data?.vapidPublicKey) {
      pushService.subscribe(data.vapidPublicKey);
    }
  }),
  deleteAuth: mutation("auth", "DELETE", () => {
    mutate(`${HOST}auth`, null);
    pushService.unsubscribe();
  }),
  createPushSubscription: mutation("auth/createPush", "PATCH"),
  deletePushSubscription: mutation("auth/deletePush", "PATCH"),
  
  createTask: mutation("tasks", "POST", () => mutate(`${HOST}tasks`, null)),
  deleteTask: mutation("tasks", "DELETE", () => mutate(`${HOST}tasks`, null)),
  updateTask: mutation("tasks", "PATCH", () => mutate(`${HOST}tasks`, null)),
};
