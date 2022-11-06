import { FormikErrors } from "formik";
import { mutate } from "swr";
import { HOST } from "../config";
import pushService from "./push";
import { IAuth, BaseResponse, IWorkspace } from "../types";
import { errorMap, fetcher, showToast } from "../utils";

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
    return fetcher<BaseResponse<T>>(HOST + endpoint + (id ? `/${id}` : ""), {
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

const mutations = {
  // users
  createToken: mutation("users/token", "POST"),
  createUser: mutation("users", "POST", (data) => mutate(`${HOST}auth`, data)),
  updateUser: mutation("users", "PATCH"),
  restoreUser: mutation("users/restore", "PATCH"),
  deleteUser: mutation("users", "DELETE"),
  // auth
  createAuth: mutation<IAuth>("auth", "POST", (data) => {
    mutate(`${HOST}auth`, data);
    if (data?.vapidPublicKey) {
      pushService.subscribe(data.vapidPublicKey);
    }
  }),
  deleteAuth: mutation("auth", "DELETE", () => {
    mutate(`${HOST}auth`, null);
    pushService?.unsubscribe();
  }),
  createPushSubscription: mutation("auth/createPush", "PATCH"),
  deletePushSubscription: mutation("auth/deletePush", "PATCH"),
  // workspaces
  createWorkspace: mutation<IWorkspace>("workspaces", "POST"),
  updateWorkspace: mutation<IWorkspace>("workspaces", "PATCH"),
  restoreWorkspace: mutation<IWorkspace>("workspaces/restore", "PATCH"),
  deleteWorkspace: mutation("workspaces", "DELETE"),
  createAgent: mutation("workspaces/:id/agents", "POST"),
  createInvite: mutation("workspaces/:id/agents/invite", "POST"),
  updateAgent: mutation("workspaces/:id/agents/:id", "PATCH"),
  deleteAgent: mutation("workspaces/:id/agents/:id", "DELETE"),
  createSaga: mutation("workspaces/:id/sagas", "POST"),
  updateSaga: mutation("workspaces/:id/sagas/:id", "PATCH"),
  deleteSaga: mutation("workspaces/:id/sagas/:id", "DELETE"),
  createTask: mutation("workspaces/:id/tasks", "POST", () =>
    mutate(`${HOST}tasks`, null)
  ),
  updateTask: mutation("workspaces/:id/tasks/:id", "PATCH", () =>
    mutate(`${HOST}tasks`, null)
  ),
  deleteTask: mutation("workspaces/:id/tasks/:id", "DELETE", () =>
    mutate(`${HOST}tasks`, null)
  ),
};

export default mutations;
