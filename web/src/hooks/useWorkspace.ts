import useSWR from "swr/immutable";
import { HOST } from "../config";
import { BaseResponse, IWorkspace } from "../types";

export default function useWorkspace(id: string) {
  const { data, mutate, error } = useSWR<BaseResponse<IWorkspace>>(
    `${HOST}workspaces/${id}`,
    null,
    {
      // refreshInterval: 10 * 60 * 1000,
      shouldRetryOnError: false,
      // revalidateIfStale: true,
      // revalidateOnFocus: true,
      // errorRetryCount: 0,
      // revalidateOnMount: false,
      onError: () => null,
      // errorRetryInterval: 10000,
      // fallbackData: {} as any,
    }
  );

  return {
    loading: !data && !error,
    // loggedOut: error && error.status === 403,
    workspace: data?.data,
    mutate,
  };
}
