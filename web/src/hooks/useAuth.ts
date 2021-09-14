import useSWR from "swr";

const ENDPOINT = "api/v1/users/auth";

export default function useAuth() {
  const { data, mutate, error } = useSWR(ENDPOINT, null, {
    refreshInterval: 10000,
  });

  return {
    loading: !data && !error,
    // loggedOut: error && error.status === 403,
    user: data,
    mutate,
  };
}
