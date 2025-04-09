import { create } from "zustand";

import { IDocument } from "../interfaces/docs";

interface State {
   category: null | string;
   isAnalyzeOpened: boolean;
   isRelevantDocsOpened: boolean;
   isComparingDocsOpened: boolean;
   selectedDocs: IDocument[];
   selectedTags: string[];
}

interface Action {
   setIsAnalyzeOpened: (isOpened: boolean) => void;
   setIsRelevantDocsOpened: (isOpened: boolean) => void;
   setIsComparingDocsOpened: (isOpened: boolean) => void;
   setSelectedDocs: (docs: IDocument[]) => void;
   setCategory: (category: string) => void;
   setSelectedTags: (tags: string[]) => void;
   setAnalyzeState: (state: Partial<State>) => void;
}

export const useAnalyzeStore = create<State & Action>((set) => ({
   category: null,
   isAnalyzeOpened: false,
   isRelevantDocsOpened: false,
   isComparingDocsOpened: false,
   selectedDocs: [],
   selectedTags: [],
   setIsAnalyzeOpened: (isOpened) => set(() => ({ isAnalyzeOpened: isOpened })),
   files: [],
   setIsRelevantDocsOpened: (isOpened) =>
      set(() => ({ isRelevantDocsOpened: isOpened })),
   setIsComparingDocsOpened: (isOpened) =>
      set(() => ({ isComparingDocsOpened: isOpened })),
   setSelectedDocs: (docs) => set(() => ({ selectedDocs: docs })),
   setCategory: (category) => set(() => ({ category: category })),
   setSelectedTags: (tags) => set(() => ({ selectedTags: tags })),
   setAnalyzeState: (newState) => set(() => ({ ...newState })),
}));
