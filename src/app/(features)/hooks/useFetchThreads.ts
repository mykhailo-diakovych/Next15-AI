"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { api } from "@configs/api";
import { QUERY_KEYS } from "@configs/query-keys";

interface FetchThreadsParams {
   projectId: string;
   pageSize?: number;
}

export interface Item {
   id: string;
   createdDate: string;
   updatedDate: string;
   title: string;
}

export interface useFetchThreadsResponse {
   success: boolean;
   items: Item[];
}

export function useFetchThreads({
   projectId,
   pageSize = 15,
}: FetchThreadsParams) {
   return useInfiniteQuery({
      queryKey: QUERY_KEYS.THREADS.list(projectId),
      queryFn: async ({ pageParam = 0 }) => {
         const { data } = await api.get<useFetchThreadsResponse>("/fetch", {
            params: {
               offset: pageParam,
               limit: pageSize,
               projectId,
            },
         });

         return {
            ...data,
            nextCursor:
               data.items.length < pageSize
                  ? null
                  : pageParam + data.items.length,
         };
      },
      enabled: !!projectId,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialPageParam: 0,
   });
}
