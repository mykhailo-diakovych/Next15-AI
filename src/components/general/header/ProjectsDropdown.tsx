import React, { Suspense, useEffect, useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { usePathname, useRouter } from "next/navigation";

import { useProjectStore } from "@features/projects/[project-id]/store/project";
import { ProjectsLoading } from "@features/projects/components/projects-loading/ProjectsLoading";
import { useFetchProjects } from "@features/projects/hooks/useFetchProjects";
import { useFetchProject } from "@features/projects/[project-id]/hooks/useFetchProject";

import { getUser } from "@auth/utils/getUser";

import { Icon } from "@components/shared/icon";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@components/ui/select";

import { ORGANIZATION_CONFIGS, ORGANIZATIONS } from "@configs/constants";
import { STORAGE_KEYS } from "@configs/storage-keys";
import { ROUTES } from "@configs/routes";

export const ProjectsDropdown = () => {
   const router = useRouter();
   const currentPath = usePathname();

   const [storedProjectId, setStoredProjectId] = useLocalStorage<string>(
      STORAGE_KEYS.projectId,
   );

   const { data } = useFetchProjects();
   const { data: fetchedProject } = useFetchProject({
      projectId: storedProjectId,
   });

   const [projectId, setProjectId] = useState("");

   const project = useProjectStore((state) => state.project);
   const setProject = useProjectStore((state) => state.setProject);

   const user = getUser();

   const { project: mockProject } =
      ORGANIZATION_CONFIGS[user?.organizationId] ??
      ORGANIZATION_CONFIGS[ORGANIZATIONS.OCEANEERING];

   // Find the current project name
   const currentProjectName = project ? project.name : mockProject;

   const handleProjectChange = (selectedProjectId: string) => {
      setProjectId(selectedProjectId);
      setStoredProjectId(selectedProjectId);

      if (currentPath.includes(ROUTES.DOCUMENT_FINDER.path)) {
         router.push(ROUTES.PROJECT_DOCUMENT_FINDER.path(selectedProjectId));
      } else if (currentPath.includes(ROUTES.PROJECTS.path)) {
         router.push(ROUTES.PROJECT.path(selectedProjectId));
      } else {
         router.push(ROUTES.PROJECT.path(selectedProjectId));
      }
   };

   useEffect(() => {
      if (fetchedProject?.project) setProject(fetchedProject.project);
   }, [fetchedProject, setProject]);

   return (
      <Select value={projectId} onValueChange={handleProjectChange}>
         <SelectTrigger className="outline-element flex max-w-72 items-center overflow-auto [&>svg]:shrink-0">
            <Icon name="project-title" className="mr-2 h-4 w-4" />
            <SelectValue placeholder={currentProjectName}>
               {currentProjectName}
            </SelectValue>
         </SelectTrigger>
         <SelectContent>
            <Suspense fallback={<ProjectsLoading />}>
               {data.items.map((project) => (
                  <SelectItem
                     key={project.id}
                     value={project.id}
                     className="cursor-pointer"
                  >
                     {project.name}
                  </SelectItem>
               ))}
            </Suspense>
         </SelectContent>
      </Select>
   );
};
