import { useState } from "react";

import { usePromptStore } from "@/app/(features)/projects/[project-id]/store/prompt";
import { useConversationStore } from "@/app/(features)/projects/[project-id]/store/conversation";

import { AskRequest } from "@/app/api/(features)/ask/interfaces";
import { ConversationResponse } from "@/app/(features)/projects/[project-id]/interfaces/conversation";

export function useAsk() {
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const conversationId = useConversationStore.getState().conversationId;

   const askQuestion = async (
      request: AskRequest,
   ): Promise<ConversationResponse | null> => {
      try {
         setIsLoading(true);
         setError(null);
         usePromptStore.setState({ prompt: "" });

         let response = await fetch("/api/ask", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(
               conversationId ? { conversationId, ...request } : request,
            ),
         });

         if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to get response");
         }

         const responseData: ConversationResponse = await response.json();

         if (!conversationId) {
            useConversationStore.setState({
               conversationId: responseData.conversation.id,
               title: responseData.conversation.title,
            });
         }

         const conversationStore = useConversationStore.getState();

         conversationStore.updateMessages(
            responseData.conversation.messages ?? [],
         );
         conversationStore.updateFiles(responseData.conversation.files ?? []);

         return responseData;
      } catch (err) {
         setError(
            err instanceof Error ? err.message : "An unexpected error occurred",
         );
         return null;
      } finally {
         setIsLoading(false);
      }
   };

   return {
      askQuestion,
      isLoading,
      error,
   };
}
