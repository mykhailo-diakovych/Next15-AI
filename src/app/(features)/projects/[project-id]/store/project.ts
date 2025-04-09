import { create } from "zustand";

import { IProject } from "@features/projects/interfaces/projects";

interface State {
   project: IProject | null;
}

interface Action {
   setProject: (project: IProject) => void;
}

export const useProjectStore = create<State & Action>((set) => ({
   project: null,
   setProject: (project) => set(() => ({ project: project })),
}));
