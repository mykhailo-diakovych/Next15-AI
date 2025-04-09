"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

import { ProjectCard } from "@features/projects/components/project-card/ProjectCard";
import { ProjectsLoading } from "@features/projects/components/projects-loading/ProjectsLoading";
import { useFetchProjects } from "@features/projects/hooks/useFetchProjects";
import { useConversationStore } from "@features/projects/[project-id]/store/conversation";
import { usePromptStore } from "@features/projects/[project-id]/store/prompt";

import { SearchInput } from "@components/shared/input/SearchInput";

const ProjectsList = ({ searchQuery }: { searchQuery: string }) => {
   const { data } = useFetchProjects();

   const debouncedSearchTerm = useDebounce(searchQuery, 300);
   const filteredItems = useMemo(() => {
      if (!debouncedSearchTerm) return data.items;

      return data.items?.filter((item) =>
         item.name?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
      );
   }, [data.items, debouncedSearchTerm]);

   return (
      <div className="w-full max-w-[1674.81px] px-4">
         <div className="flex flex-wrap justify-start gap-6">
            {filteredItems.map((project) => (
               <ProjectCard key={project.id} {...project} />
            ))}
            {filteredItems.length === 0 && (
               <p className="col-span-full text-center text-base">
                  There is no project with that name
               </p>
            )}
         </div>
      </div>
   );
};

const ProjectsPage = () => {
   const [searchQuery, setSearchQuery] = useState("");

   const resetConversationState = useConversationStore(
      (state) => state.resetConversationState,
   );
   const resetPromptState = usePromptStore((state) => state.resetPromptState);

   useEffect(() => {
      resetConversationState();
      resetPromptState();
   }, [resetConversationState, resetPromptState]);

   return (
      <div className="flex w-full flex-col">
         <div className="flex w-full flex-col items-center gap-8 px-8 py-4">
            <SearchInput
               className="max-w-lg"
               value={searchQuery}
               onChange={setSearchQuery}
            />
            <Suspense fallback={<ProjectsLoading />}>
               <ProjectsList searchQuery={searchQuery} />
            </Suspense>
         </div>
      </div>
   );
};

export default ProjectsPage;
