import { create } from "zustand";

interface State {
   prompt: string;
}

interface Action {
   updatePrompt: (prompt: string) => void;
}

export const usePromptStore = create<State & Action>((set) => ({
   prompt: "",
   updatePrompt: async (prompt) => set(() => ({ prompt: prompt })),
}));
