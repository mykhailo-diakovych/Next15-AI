"use client";

import { useQuery } from "@tanstack/react-query";

import { getProjectId } from "@features/projects/utils/getProjectId";

import { api } from "@configs/api";
import { QUERY_KEYS } from "@configs/query-keys";

interface IFetchThreadsParams {
   conversationId: string;
}

export function useFetchConversation({ conversationId }: IFetchThreadsParams) {
   return useQuery({
      queryKey: QUERY_KEYS.CONVERSATIONS.detail(conversationId),
      queryFn: async () => {
         const projectId = getProjectId();
         if (!projectId) {
            throw new Error("No project selected. Please select a project.");
         }

         const { data } = await api.get(`/fetch/${conversationId}`, {
            params: {
               projectId,
            },
         });

         return data;
      },
      enabled: !!conversationId,
   });
}
