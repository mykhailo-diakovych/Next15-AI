import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useConversationStore } from "@features/projects/[project-id]/store/conversation";
import { useDetailsStore } from "@features/projects/[project-id]/store/details";
import { getProjectId } from "@features/projects/utils/getProjectId";

import { QUERY_KEYS } from "@configs/query-keys";
import { api } from "@configs/api";

interface IDeleteThreadParams {
   threadId: string;
}

export function useDeleteThread() {
   const queryClient = useQueryClient();

   const resetConversationState = useConversationStore(
      (state) => state.resetConversationState,
   );

   const setOpenSources = useDetailsStore((state) => state.setOpenSources);

   const mutation = useMutation({
      mutationFn: async ({ threadId }: IDeleteThreadParams) => {
         const { data } = await api.delete("/deleteConversation", {
            params: {
               conversationId: threadId,
            },
         });

         return data;
      },
      onSuccess: async () => {
         resetConversationState();

         setOpenSources([]);

         const projectId = getProjectId();
         if (projectId) {
            await queryClient.invalidateQueries({
               queryKey: QUERY_KEYS.THREADS.list(projectId),
            });
         }
      },
   });

   return {
      deleteConversation: mutation.mutate,
   };
}
