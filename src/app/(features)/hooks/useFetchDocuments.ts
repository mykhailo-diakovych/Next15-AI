import { useSuspenseQuery } from "@tanstack/react-query";

import { DocsResponse } from "@features/projects/[project-id]/interfaces/docs";

import { api } from "@configs/api";
import { QUERY_KEYS } from "@configs/query-keys";

interface IUseFetchDocumentsParams {
   projectId: string;
}

export const useFetchDocuments = ({ projectId }: IUseFetchDocumentsParams) => {
   return useSuspenseQuery({
      queryKey: QUERY_KEYS.FILES.list(projectId),
      queryFn: async () => {
         if (!projectId) {
            throw new Error("No project selected. Please select a project.");
         }

         const { data } = await api.get<DocsResponse>("/listFiles", {
            params: {
               projectId: projectId,
            },
         });

         return data;
      },
   });
};
