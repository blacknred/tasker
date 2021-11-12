import useSWR from "swr";
import { HOST } from "../constants";
import { IPaginated, IResponse, ITask } from "../typings";

export default function useTasks(page: number) {
  const { data, mutate, error } = useSWR<IResponse<IPaginated<ITask>>>(
    `${HOST}tasks?limit=10&offset=${page * 10}`,
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

// export default function useTasks(limit = 10) {
//   const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite<
//     IResponse<IPaginated<ITask>>
//   >((pageIdx: number, prevPageData: any) => {
//     if (prevPageData && !prevPageData.data) return null; // reached the end
//     if (pageIdx === 0) return `${ENDPOINT}?limit=${limit}`;
//     return `${ENDPOINT}?cursor=${prevPageData.nextCursor}&limit=${limit}`;
//   });

//   const isLoadingInitialData = !data && !error;

//   const isLoadingMore =
//     isLoadingInitialData ||
//     (size > 0 && data && typeof data[size - 1] === "undefined");

//   const isEmpty = data?.[0]?.length === 0;
//   const isReachingEnd =
//     isEmpty || (data && data[data.length - 1]?.length < limit);
//   const isRefreshing = isValidating && data && data.length === size;

//   const loadMore = () => setSize(size + 1);

//   return {
//     data,
//     error,
//     mutate,
//     loadMore,
//     isRefreshing,
//     isReachingEnd,
//     isLoadingMore,
//   };
// }
