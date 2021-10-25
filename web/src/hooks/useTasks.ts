import useSWRInfinite from "swr/infinite";
import { HOST } from "../mutations";

const ENDPOINT = HOST + "tasks/getAll";

export default function useTasks(limit = 10) {
  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (pageIdx: number, prevPageData: any) => {
      if (prevPageData && !prevPageData.data) return null; // reached the end
      if (pageIdx === 0) return `${ENDPOINT}?limit=${limit}`;
      return `${ENDPOINT}?cursor=${prevPageData.nextCursor}&limit=${limit}`;
    }
  );

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < limit);
  const isRefreshing = isValidating && data && data.length === size;
  const loadMore = () => setSize(size + 1);

  return {
    data,
    error,
    mutate,
    loadMore,
    isRefreshing,
    isReachingEnd,
    isLoadingMore,
  };
}
