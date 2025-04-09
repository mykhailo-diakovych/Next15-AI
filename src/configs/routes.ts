export const ROUTES = {
   WORKFLOWS: {
      path: "/workflows",
   },
   AI_REPORT_WRITER: {
      path: "/workflows/report-writer",
   },
   PROJECTS: {
      path: "/projects",
   },
   PROJECT: {
      path: (id: string) => `/projects/${id}`,
   },
   PROJECT_CONTROLS: {
      path: (id: string) => `/projects/${id}/controls`,
   },
   DOCUMENT_FINDER: {
      path: "/file-management",
   },
   PROJECT_DOCUMENT_FINDER: {
      path: (id: string) => `/file-management/${id}`,
   },
   SETTINGS: {
      path: "/settings",
   },
   LOGIN: {
      path: "/login",
   },
} as const;
