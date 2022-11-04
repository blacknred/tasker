import useSWR from "swr";
import { HOST } from "../config";
import { IPaginated, BaseResponse, IWorkspace } from "../types";

export default function useWorkspaces(page: number) {
  const { data, mutate, error } = useSWR<BaseResponse<IPaginated<IWorkspace>>>(
    `${HOST}workspaces?limit=100`,
    null,
    {
      // refreshInterval: 10 * 60 * 1000,
      shouldRetryOnError: false,
      // revalidateIfStale: true,
      // revalidateOnFocus: true,
      // errorRetryCount: 0,
      // revalidateOnMount: true,
      onError: () => null,
      // errorRetryInterval: 10000,
      // fallbackData: { name: 'kjlkjlk' } as any,
    }
  );

  return {
    error: error || data?.errors?.[0],
    ...data?.data,
    mutate,
  };
}
