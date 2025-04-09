import { STORAGE_KEYS } from "@configs/storage-keys";

export const getProjectId = () => {
   if (typeof window === "undefined") {
      return null; // Return null if running on the server
   }

   const projectId = localStorage.getItem(STORAGE_KEYS.projectId);
   return projectId ? JSON.parse(projectId) : null;
};
