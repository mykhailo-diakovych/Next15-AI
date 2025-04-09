import { create } from "zustand";

import { IReportSection } from "@features/workflows/(pages)/report-writer/interfaces/report-section";

interface State {
   reportName: string;
   sections: IReportSection[];
}

interface Action {
   setReportName: (name: string) => void;
   setSections: (sections: IReportSection[]) => void;
}

const initialReportSections = [
   {
      id: crypto.randomUUID(),
      title: "Executive Summary",
      description:
         "Summarize key findings from the Puffin Field Development Plan, including volumes, risks, and concept selection.",
   },
   {
      id: crypto.randomUUID(),
      title: "Seismic Interpretation and Structural Configuration",
      description:
         "Describe seismic interpretation for the Puffin field—coverage, faults, closures—and structural risks to FDP.",
   },
   {
      id: crypto.randomUUID(),
      title: "Petrophysics and Reservoir Fluids",
      description:
         "Summarize petrophysical results from Puffin wells. Include key properties and fluid data relevant to the FDP.",
   },
   {
      id: crypto.randomUUID(),
      title: "Hydrocarbons Initially In Place (HIIP)",
      description:
         " Provide HIIP estimates for the Puffin field, with input parameters and uncertainty ranges for FDP planning.",
   },
   {
      id: crypto.randomUUID(),
      title: "Conclusion",
      description:
         "Conclude the Puffin FDP with a summary of development viability, subsurface risks, and recommended next steps.",
   },
];

export const useReportSectionsStore = create<State & Action>((set) => ({
   reportName: "New Report",
   sections: initialReportSections,
   setReportName: (name: string) => set(() => ({ reportName: name })),
   setSections: (sections) => set(() => ({ sections: sections })),
}));
