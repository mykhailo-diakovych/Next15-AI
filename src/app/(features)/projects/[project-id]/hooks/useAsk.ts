"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { usePromptStore } from "@features/projects/[project-id]/store/prompt";
import { useConversationStore } from "@features/projects/[project-id]/store/conversation";
import { useFetchFollowups } from "@features/projects/[project-id]/hooks/useFetchFollowups";
import { Conversation } from "@features/projects/[project-id]/interfaces/conversation";
import { getProjectId } from "@features/projects/utils/getProjectId";

import { getUser } from "@auth/utils/getUser";

import { getUniqueSources } from "@utils/getUniqueSources";

import { api } from "@configs/api";
import { QUERY_KEYS } from "@configs/query-keys";

import { useAnalyzeStore } from "../store/analyze";

const DONE_STREAM = "[DONE]";

interface IAskQuestionParams {
   question: string;
   conversationId?: string;
}

interface IStreamChunk {
   value?: string;
   message?: Conversation | typeof DONE_STREAM;
}

interface IUseAskParams {
   projectId: string;
}

export function useAsk({ projectId }: IUseAskParams) {
   const queryClient = useQueryClient();

   const { prefetchFollowups } = useFetchFollowups();

   const conversationId = useConversationStore((state) => state.conversationId);
   const updateLoading = useConversationStore((state) => state.updateLoading);
   const updateLastMessageText = useConversationStore(
      (state) => state.updateLastMessageText,
   );

   const selectedFiles = useAnalyzeStore((state) => state.selectedDocs).map(
      (file) => file.id,
   );
   const category = useAnalyzeStore((state) => state.category);
   const setAnalyzeState = useAnalyzeStore((state) => state.setAnalyzeState);

   const mutation = useMutation({
      mutationFn: async (request: IAskQuestionParams) => {
         updateLoading(true);
         usePromptStore.setState({ prompt: "" });

         const user = getUser();
         if (!user) {
            throw new Error("Unauthorized. Please log in.");
         }

         if (!projectId) {
            throw new Error("No project selected. Please select a project.");
         }

         const url = conversationId
            ? `/ask?conversationId=${conversationId}`
            : `/ask`;

         const response = await fetch(api.defaults.baseURL + url, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               "x-user-id": user.id,
               "x-session-id": user.sessionId,
               "x-functions-key": process.env.NEXT_PUBLIC_FUNCTIONS_KEY,
            },
            body: JSON.stringify({
               question: request.question,
               projectId,
               ...(selectedFiles.length ? { selectedFiles } : {}),
               ...(category ? { category } : {}),
            }),
         });

         if (!response.ok) {
            throw new Error("Network response was not ok");
         }

         const reader = response.body?.getReader();
         if (!reader) {
            throw new Error("Response body is not readable");
         }

         let streamedResponse: Conversation | null = null;
         let accumulatedContent = "";
         let buffer = "";

         while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            // Convert the chunk to text and add to buffer
            buffer += new TextDecoder().decode(value);

            // Split buffer into lines and process complete lines
            const lines = buffer.split("\n");
            // Keep the last potentially incomplete line in the buffer
            buffer = lines.pop() || "";

            for (const line of lines) {
               const trimmedLine = line.trim();
               if (!trimmedLine || !trimmedLine.startsWith("data: ")) continue;

               const data = line.slice(6); // Remove 'data: ' prefix
               if (data === DONE_STREAM) continue;

               try {
                  const parsed = JSON.parse(data) as IStreamChunk;

                  if (parsed.value) {
                     // Handle streaming content
                     accumulatedContent += parsed.value;
                     updateLastMessageText(accumulatedContent);
                  }

                  if (parsed.message && parsed.message !== DONE_STREAM) {
                     // Handle final JSON with complete conversation
                     streamedResponse = parsed.message;

                     // Update conversation store
                     if (
                        !conversationId &&
                        streamedResponse.id &&
                        streamedResponse.title
                     ) {
                        useConversationStore.setState({
                           conversationId: streamedResponse.id,
                           title: streamedResponse.title.replace(/"/g, ""),
                        });
                     }

                     // Update messages and files
                     useConversationStore.setState({
                        messages: streamedResponse.messages,
                        files: getUniqueSources(streamedResponse.messages),
                     });
                  }
               } catch (e) {
                  console.error("Failed to parse JSON:", data, e);
               }
            }
         }

         if (!streamedResponse) {
            throw new Error("No valid response received");
         }

         return streamedResponse;
      },
      onSuccess: async (data) => {
         updateLoading(false);
         setAnalyzeState({
            category: null,
            isAnalyzeOpened: false,
            isRelevantDocsOpened: false,
            isComparingDocsOpened: false,
            selectedDocs: [],
         });
         usePromptStore.setState({ followups: [] });

         const userMessage = data.messages[data.messages.length - 2];
         const assistantMessage = data.messages[data.messages.length - 1];

         await prefetchFollowups({
            userMessageId: userMessage.id,
            assistantMessageId: assistantMessage.id,
            conversationId: data.id,
         });

         const projectId = getProjectId();
         if (projectId) {
            await queryClient.invalidateQueries({
               queryKey: QUERY_KEYS.THREADS.list(projectId),
            });
         }
      },
   });

   return {
      askQuestion: mutation.mutate,
   };
}
