import { useMutation } from "@tanstack/react-query";

import { api } from "@configs/api";

interface IFeedbackParams {
   isValuable: boolean;
   userComment: string;
   assistantMessageId: string;
   conversationId: string;
}

export function useFeedback() {
   const mutation = useMutation({
      mutationFn: async ({
         isValuable,
         userComment,
         assistantMessageId,
         conversationId,
      }: IFeedbackParams) => {
         const { data } = await api.patch(`/feedback`, {
            isValuable,
            userComment,
            assistantMessageId,
            conversationId,
         });

         return data;
      },
   });

   return {
      sendFeedback: mutation.mutate,
      isPending: mutation.isPending,
   };
}
