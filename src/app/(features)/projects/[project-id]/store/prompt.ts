import { create } from "zustand";

interface State {
   prompt: string;
   followups: string[];
   isFocused: boolean;
}

interface Action {
   updatePrompt: (prompt: string) => void;
   updateFollowups: (followups: string[]) => void;
   setIsFocused: (isFocused: boolean) => void;
   resetPromptState: () => void;
}

export const initialPromptState = {
   prompt: "",
   followups: [],
   isFocused: false,
};

export const usePromptStore = create<State & Action>((set) => ({
   ...initialPromptState,
   updatePrompt: (prompt) => set(() => ({ prompt: prompt })),
   updateFollowups: (followups) => set(() => ({ followups: followups })),
   setIsFocused: (isFocused) => set(() => ({ isFocused: isFocused })),
   resetPromptState: () => set(initialPromptState),
}));
