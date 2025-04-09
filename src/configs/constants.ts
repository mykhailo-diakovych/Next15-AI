import { ROUTES } from "@configs/routes";

type NavItem = {
   title: string;
   icon: string;
   url: string | ((id: string) => string);
};

export const SIDEBAR = {
   models: [{ name: "Volt" }, { name: "Acorn" }] as { name: string }[],
   navMain: [
      {
         title: "Workflows",
         icon: "workflows",
         url: ROUTES.WORKFLOWS.path,
      },
      {
         title: "Projects",
         icon: "projects",
         url: ROUTES.PROJECTS.path,
      },
   ] as NavItem[],
   projects: [
      {
         title: "Projects",
         icon: "projects",
         url: ROUTES.PROJECTS.path,
      },
   ] as NavItem[],
};

export enum ANALYSE_CARDS_ID {
   COMPARE_DOCUMENTS = "compare",
   ANALYZE_FILE = "analyze",
   CUSTOMER_MEETING = "meeting",
}

export const ANALYSE_CARDS = [
   {
      id: ANALYSE_CARDS_ID.COMPARE_DOCUMENTS,
      title: "Compare Documents",
      text: "Compare multiple documents side by side to identify key differences and similarities in content.",
      iconName: "compare-docs",
   },
   {
      id: ANALYSE_CARDS_ID.ANALYZE_FILE,
      title: "Analyze File",
      text: "Get a structured breakdown of a file’s contents, metadata, and key highlights for deeper analysis.",
      iconName: "analyze-file",
   },
   // {
   //   id: ANALYSE_CARDS_ID.CUSTOMER_MEETING,
   //   title: "Customer Meeting",
   //   text: "Select relevant documents to focus on before your customer meeting for a streamlined conversation.",
   //   iconName: "customer-meet",
   // },
] as const;

export const ANALYSE_CATEGORIES = {
   ANALYSE: "analyze",
   COMPARE: "compare",
   MEETINGS: "meetings",
} as const;

export const ORGANIZATIONS = {
   OCEANEERING: "909b90f9-db94-4bc5-ac3b-72591e3fe3ad",
   VOLTQUANT: "739d7269-d19e-482e-984f-dee88c681c91",
   SHELL: "91b7bcb8-e8ee-45be-bde4-8dce692f79b4",
   NOV: "e0baf44d-678b-4f5e-8173-2dbc37de9ffb",
};

export const ORGANIZATION_CONFIGS = {
   [ORGANIZATIONS.OCEANEERING]: {
      model: "Oceaneering",
      project: "Synapse",
      title: "OCEANEERING",
      description: "OCEANEERING",
      logo: "/svg-icons/logo.svg",
      prompts: [
         "What are Oceaneering's core services?",
         "Tell me about ROV operations",
      ],
   },
   [ORGANIZATIONS.VOLTQUANT]: {
      model: "Voltquant AI",
      project: "Synapse",
      title: "Virtual AI Colleague",
      description: "Project knowledge at your fingertips",
      logo: "/svg-icons/logo.svg",
      prompts: [
         "How does the Grid Code define “Demand Aggregation”?",
         "What data is needed for short-circuit?",
      ],
   },
   [ORGANIZATIONS.SHELL]: {
      model: "Puffin",
      project: "PuffIQ",
      title: "PuffIQ: Your Virtual AI Assistant",
      description: "Puffin Project Knowledge at your Fingertips.",
      logo: "/svg-icons/logo.svg",
      prompts: [
         "Catch me up on the Puffin Project",
         "What type of pressure profiles are expected?",
      ],
   },
   [ORGANIZATIONS.NOV]: {
      model: "Puffin",
      project: "Synapse",
      title: "NOV AI Assistant",
      description: "NOV AI Assistant",
      logo: "/svg-icons/logo.svg",
      prompts: [
         "Catch me up on our tender?",
         "What risks assessments have been made?",
      ],
   },
};

// File Types
export const ALLOWED_FILE_TYPES = ".pdf,application/pdf";

export const ALLOWED_DROPZONE_FILE_TYPES = {
   "application/pdf": [".pdf"],
};

export const MAX_FILE_SIZE = 16 * 1024 * 1024;

export const MAX_FILES_COUNT = 3;

export const ROLES = [
   {
      value: "superAdmin",
      name: "Super Admin",
   },
   {
      value: "admin",
      name: "Admin",
   },
   {
      value: "reader",
      name: "Reader",
   },
];
