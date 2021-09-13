import useSWR from "swr";

export default function useAuth() {
  const { data, mutate, error } = useSWR("api/v1/users/auth", null, {
    refreshInterval: 10000,
  });

  return {
    loading: !data && !error,
    // loggedOut: error && error.status === 403,
    user: data,
    mutate,
  };
}
