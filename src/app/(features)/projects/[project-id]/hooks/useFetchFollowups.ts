import { useQueryClient } from "@tanstack/react-query";

import { usePromptStore } from "@features/projects/[project-id]/store/prompt";
import { getProjectId } from "@features/projects/utils/getProjectId";

import { api } from "@configs/api";

interface IFetchFollowupsParams {
   userMessageId: string;
   assistantMessageId: string;
   conversationId: string;
}

export function useFetchFollowups() {
   const queryClient = useQueryClient();
   const updateFollowups = usePromptStore((state) => state.updateFollowups);

   const prefetchFollowups = async ({
      userMessageId,
      assistantMessageId,
      conversationId,
   }: IFetchFollowupsParams) => {
      await queryClient.fetchQuery({
         queryKey: ["followups", conversationId],
         queryFn: async () => {
            const projectId = getProjectId();
            if (!projectId) {
               throw new Error("No project selected. Please select a project.");
            }

            const { data } = await api.get(`/followups`, {
               params: {
                  userMessageId,
                  assistantMessageId,
                  conversationId,
               },
            });

            // Update the store with the followups
            if (data && data.followUps) {
               updateFollowups(data.followUps);
            }

            return data;
         },
      });
   };

   return { prefetchFollowups };
}
