import useSWR from "swr";
import { IPaginated, IResponse, IWorkspace } from "../typings";
import { HOST } from "../utils";

export default function useWorkspaces(page: number) {
  const { data, mutate, error } = useSWR<IResponse<IPaginated<IWorkspace>>>(
    `${HOST}workspaces?limit=100`,
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
    error: error || data?.errors?.[0],
    ...data?.data,
    mutate,
  };
}
