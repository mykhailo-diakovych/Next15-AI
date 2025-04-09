import { useInfiniteQuery } from "@tanstack/react-query";

import { DocsResponse } from "@features/projects/[project-id]/interfaces/docs";
import { getProjectId } from "@features/projects/utils/getProjectId";

import { api } from "@configs/api";
import { QUERY_KEYS } from "@configs/query-keys";

export interface IUseFetchRelevantDocsParams {
   pageSize?: number;
   tags?: string[];
}

export const useFetchRelevantDocs = ({
   pageSize = 25,
   tags = [],
}: IUseFetchRelevantDocsParams = {}) => {
   return useInfiniteQuery({
      queryKey: QUERY_KEYS.DOCS.relevantWithTags(tags),
      queryFn: async ({ pageParam = 1 }) => {
         const projectId = getProjectId();
         if (!projectId) {
            throw new Error("No project selected. Please select a project.");
         }

         const { data } = await api.get<DocsResponse>("/listFiles", {
            params: {
               projectId: projectId,
               offset: pageParam,
               limit: pageSize,
               ...(tags.length > 0 && { tags: tags }),
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
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialPageParam: 0,
   });
};
