import { create } from "zustand";

import { IFile } from "@features/projects/[project-id]/interfaces/message";

interface State {
   isDetailsOpened: boolean;
   isDocumentPreviewFullscreen: boolean;
   documentPreviewUrl: string | null;
   documentPreviewPage: number;
   openSources: IFile[];
}

interface Action {
   setIsDetailsOpened: (isOpened: boolean) => void;
   setDocumentPreviewUrl: (url: string | null) => void;
   setDocumentPreviewPage: (page: number) => void;
   setOpenSources: (sources: IFile[]) => void;
   setDocumentPreviewFullscreen: (preview: boolean) => void;
}

export const useDetailsStore = create<State & Action>((set) => ({
   isDetailsOpened: false,
   isDocumentPreviewFullscreen: false,
   documentPreviewUrl: null,
   documentPreviewPage: 0,
   openSources: [],
   setIsDetailsOpened: (isOpened: boolean) =>
      set(() => ({ isDetailsOpened: isOpened })),
   setDocumentPreviewFullscreen: (isFullScreen: boolean) =>
      set(() => ({ isDocumentPreviewFullscreen: isFullScreen })),
   setDocumentPreviewUrl: (url: string | null) =>
      set(() => ({ documentPreviewUrl: url })),
   setDocumentPreviewPage: (page: number) =>
      set(() => ({ documentPreviewPage: page })),
   setOpenSources: (sources: IFile[]) => set(() => ({ openSources: sources })),
}));
