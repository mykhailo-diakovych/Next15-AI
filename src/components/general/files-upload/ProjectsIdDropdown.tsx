import React, { Suspense } from "react";

import { ProjectsLoading } from "@features/projects/components/projects-loading/ProjectsLoading";
import { useFetchProjects } from "@features/projects/hooks/useFetchProjects";

import { Icon } from "@components/shared/icon";

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuLabel,
   DropdownMenuRadioGroup,
   DropdownMenuRadioItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface IProjectsIdDropdownProps {
   projectId: string;
   setProjectId: (id: string) => void;
}

export const ProjectsIdDropdown = ({
   projectId,
   setProjectId,
}: IProjectsIdDropdownProps) => {
   const { data } = useFetchProjects();

   return (
      <DropdownMenu>
         <DropdownMenuTrigger
            className="outline-element max-w-72 cursor-pointer"
            asChild
         >
            <div className="flex items-center gap-2">
               <div className="flex min-w-14 justify-center">
                  Select Project
               </div>
               <Icon name="arrow" className="h-1.5 w-3" />
            </div>
         </DropdownMenuTrigger>
         <DropdownMenuContent>
            <DropdownMenuLabel>Projects</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
               value={projectId}
               onValueChange={setProjectId}
            >
               <Suspense fallback={<ProjectsLoading />}>
                  {data.items.map((project) => (
                     <DropdownMenuRadioItem
                        key={project.id}
                        value={project.id}
                        className="cursor-pointer"
                     >
                        {project.name}
                     </DropdownMenuRadioItem>
                  ))}
               </Suspense>
            </DropdownMenuRadioGroup>
         </DropdownMenuContent>
      </DropdownMenu>
   );
};
