import { create } from "zustand";

import {
   IFeedbackItem,
   IFile,
   IMessage,
} from "@features/projects/[project-id]/interfaces/message";

interface State {
   conversationId: string | null;
   title: string | null;
   messages: IMessage[] | null;
   files: IFile[] | null;
   feedbacks: IFeedbackItem[] | null;
   isLoading: boolean;
}

interface Action {
   updateConversationId: (id: State["conversationId"]) => void;
   updateTitle: (title: State["title"]) => void;
   updateMessages: (message: IMessage[]) => void;
   addMessages: (messages: IMessage[]) => void;
   updateLastMessageText: (text: string) => void;
   updateFiles: (files: IFile[]) => void;
   updateLoading: (status: boolean) => void;
   setConversationState: (state: Partial<State>) => void;
   resetConversationState: () => void;
}

export const initialConversationState = {
   conversationId: null,
   title: null,
   messages: null,
   files: null,
   feedbacks: null,
   isLoading: false,
};

export const useConversationStore = create<State & Action>((set) => ({
   ...initialConversationState,
   updateConversationId: (id) => set(() => ({ conversationId: id })),
   updateTitle: (title) => set(() => ({ title: title })),
   updateMessages: (messages) => set(() => ({ messages: messages })),
   addMessages: (messages) =>
      set((state) => ({
         messages: state.messages ? [...state.messages, ...messages] : messages,
      })),
   updateLastMessageText: (text: string) =>
      set((state) => {
         if (!state.messages || state.messages.length === 0) {
            return state;
         }

         const messages = [...state.messages];
         const lastMessage = messages[messages.length - 1];

         messages[messages.length - 1] = {
            ...lastMessage,
            body: {
               ...lastMessage.body,
               content: text,
            },
         };

         return { messages };
      }),
   updateFiles: (files) => set(() => ({ files: files })),
   updateLoading: (status) => set(() => ({ isLoading: status })),
   setConversationState: (newState) => set(() => ({ ...newState })),
   resetConversationState: () => set(initialConversationState),
}));
