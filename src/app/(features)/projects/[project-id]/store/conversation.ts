import { create } from "zustand";

import { Message } from "@/app/(features)/projects/[project-id]/interfaces/message";

interface State {
   conversationId: string | null;
   title: string | null;
   messages: Message[] | null;
   files: string[] | null;
}

interface Action {
   updateConversationId: (id: State["conversationId"]) => void;
   updateTitle: (title: State["title"]) => void;
   updateMessages: (message: Message[]) => void;
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
   updateFiles: (files) => set(() => ({ files: files })),
}));
