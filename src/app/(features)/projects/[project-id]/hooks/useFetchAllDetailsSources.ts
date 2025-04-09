import { useQueries } from "@tanstack/react-query";

import {
   IDocument,
   DocsResponse,
} from "@features/projects/[project-id]/interfaces/docs";
import { getProjectId } from "@features/projects/utils/getProjectId";

import { api } from "@configs/api";
import { QUERY_KEYS } from "@configs/query-keys";

export const useFetchAllDetailsSources = (
   fileWithIds: { filename: string; id: string | null }[],
) => {
   const queries = useQueries({
      queries: fileWithIds
         .filter((file) => file.id) // Ensure file ID is not null
         .map((file) => ({
            queryKey: QUERY_KEYS.DOCS.detail(file.id as string),
            queryFn: async () => {
               const projectId = getProjectId();
               if (!projectId) {
                  throw new Error(
                     "No project selected. Please select a project.",
                  );
               }

               const { data } = await api.get<DocsResponse>("/listFiles", {
                  params: {
                     fileId: file.id,
                     projectId,
                  },
               });

               return { ...file, ...data.items[0] };
            },
         })),
   });

   const isLoading = queries.some((query) => query.isLoading);
   const isError = queries.some((query) => query.isError);
   const fetchedFiles: IDocument[] = queries
      .map((query) => query.data)
      .filter(Boolean) as IDocument[];

   return { isLoading, isError, fetchedFiles };
};
