import useSWR, {} from "swr";
import { HOST } from "../mutations";

const ENDPOINT = HOST + "auth";

export default function useAuth() {
  const { data, mutate, error } = useSWRImmutable(ENDPOINT, null, {
    refreshInterval: 60 * 10 * 1000,
    shouldRetryOnError: false,
    errorRetryCount: 0,
    // onError: () => null,
    // errorRetryInterval: 10000,
    fallbackData: {} as any,
  });

  return {
    loading: !data && !error,
    // loggedOut: error && error.status === 403,
    session: data,
    mutate,
  };
}

// useSWR(key, fetcher, {
//   revalidateIfStale: false,
//   revalidateOnFocus: false,
//   revalidateOnReconnect: false
// })
// // equivalent to
// useSWRImmutable(key, fetcher)
