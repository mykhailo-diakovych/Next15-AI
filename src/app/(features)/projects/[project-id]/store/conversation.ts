import { create } from "zustand";

import { IMessage } from "@/app/(features)/projects/[project-id]/interfaces/message";

interface State {
   conversationId: string | null;
   title: string | null;
   messages: IMessage[] | null;
   files: string[] | null;
}

interface Action {
   updateConversationId: (id: State["conversationId"]) => void;
   updateTitle: (title: State["title"]) => void;
   updateMessages: (message: IMessage[]) => void;
   addUserMessage: (message: IMessage) => void;
   updateFiles: (files: string[]) => void;
}

export const useConversationStore = create<State & Action>((set) => ({
   conversationId: null,
   title: null,
   messages: null,
   files: null,
   updateConversationId: (id) => set(() => ({ conversationId: id })),
   updateTitle: (title) => set(() => ({ title: title })),
   updateMessages: (messages) => set(() => ({ messages: messages })),
   addUserMessage: (message) =>
      set((state) => ({
         messages: state.messages ? [...state.messages, message] : [message],
      })),

   updateFiles: (files) => set(() => ({ files: files })),
}));
