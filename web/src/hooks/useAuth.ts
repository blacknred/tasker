import useSWR from "swr";
import { HOST } from "../api";

const ENDPOINT = HOST + "auth";

export default function useAuth() {
  const { data, mutate, error } = useSWR(ENDPOINT, null, {
    refreshInterval: 100000,
  });

  return {
    loading: !data && !error,
    // loggedOut: error && error.status === 403,
    user: data,
    mutate,
  };
}
