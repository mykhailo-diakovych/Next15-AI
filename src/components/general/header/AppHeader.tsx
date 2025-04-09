"use client";

import React from "react";
import { usePathname } from "next/navigation";

import { useDetailsStore } from "@features/projects/[project-id]/store/details";
import { useAnalyzeStore } from "@features/projects/[project-id]/store/analyze";
import { useVoiceStore } from "@features/projects/[project-id]/store/voice";
// import { useCreateProject } from "@features/projects/hooks/useCreateProject";

import { Button } from "@components/ui/button";
import { Icon } from "@components/shared/icon";
import { useSidebar } from "@components/ui/sidebar";
import { ProjectsDropdown } from "@components/general/header/ProjectsDropdown";

import { useToast } from "@hooks/use-toast";

import { cn } from "@utils/tailwindMerge";

import "./header.css";

export function AppHeader() {
   const pathname = usePathname();
   const isProjectPage = /^\/projects\/[^/]+$/.test(pathname);
   const isProjectsPage = pathname === "/projects";

   const { setOpen: setIsSidebarOpened } = useSidebar();

   const isDetailsOpened = useDetailsStore((state) => state.isDetailsOpened);
   const setIsDetailsOpened = useDetailsStore(
      (state) => state.setIsDetailsOpened,
   );
   const setOpenSources = useDetailsStore((state) => state.setOpenSources);

   const setIsAnalyzeOpened = useAnalyzeStore(
      (state) => state.setIsAnalyzeOpened,
   );
   const isAnalyzeOpened = useAnalyzeStore((state) => state.isAnalyzeOpened);
   const setIsRelevantDocsOpened = useAnalyzeStore(
      (state) => state.setIsRelevantDocsOpened,
   );

   const setIsVoiceOpened = useVoiceStore((state) => state.setIsVoiceOpened);
   const isVoiceOpened = useVoiceStore((state) => state.isVoiceOpened);

   // const { createProject } = useCreateProject();

   const { toast } = useToast();

   const handleAnalyzeClick = () => {
      setIsDetailsOpened(false);
      setIsVoiceOpened(false);
      setIsAnalyzeOpened(!isAnalyzeOpened);
      setOpenSources([]);
      setIsSidebarOpened(false);
      setIsRelevantDocsOpened(false);
   };

   const handleDetailsClick = () => {
      setIsAnalyzeOpened(false);
      setIsVoiceOpened(false);
      setIsDetailsOpened(!isDetailsOpened);
      setOpenSources([]);
      setIsSidebarOpened(false);
      setIsRelevantDocsOpened(false);
   };

   const handleVoiceClick = () => {
      setIsAnalyzeOpened(false);
      setIsDetailsOpened(false);
      setIsVoiceOpened(!isVoiceOpened);
      setOpenSources([]);
      setIsSidebarOpened(false);
      setIsRelevantDocsOpened(false);
   };

   return (
      <div className="relative flex h-24 items-center justify-between px-4 py-2">
         <div className="flex items-center justify-between gap-2.5">
            {(isProjectsPage || isProjectPage) && <ProjectsDropdown />}

            {isProjectsPage && (
               <Button
                  className="outline-element gradient-button"
                  onClick={() =>
                     toast({
                        variant: "destructive",
                        title: "Unauthorised Access",
                        description:
                           "Please Contact Voltquant Admin to add a new Project",
                     })
                  }
               >
                  <Icon name="plus" /> Create new
               </Button>
            )}
         </div>

         {isProjectPage && (
            <div className="flex items-center gap-4">
               <div className="group relative">
                  <Button
                     onClick={handleVoiceClick}
                     variant="ghost"
                     className={cn(
                        "flex h-9 cursor-pointer items-center justify-center gap-2 transition-colors group-hover:text-green-400",
                        {
                           "text-green-500": isVoiceOpened,
                        },
                     )}
                  >
                     <Icon
                        name="voice"
                        className={cn(
                           "size-4 transition-colors group-hover:text-green-400",
                           {
                              "text-green-500": isVoiceOpened,
                           },
                        )}
                     />
                     Voice
                  </Button>
               </div>

               <div className="flex h-14 items-center justify-center gap-2 rounded-md border-4 border-white bg-cultured px-4 outline outline-1 outline-cultured">
                  <div className="group relative">
                     <Button
                        variant="ghost"
                        onClick={handleAnalyzeClick}
                        className="relative group-hover:bg-transparent"
                     >
                        <Icon name="analyze" />
                        Analyze
                        <span
                           className={cn(
                              "absolute bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-green-500 transition-all duration-300 ease-out group-hover:w-5/6",
                              {
                                 "w-3/4": isAnalyzeOpened,
                              },
                           )}
                        />
                     </Button>
                  </div>

                  <div className="group relative">
                     <Button
                        variant="ghost"
                        onClick={handleDetailsClick}
                        className="relative group-hover:bg-transparent"
                     >
                        <Icon name="details" />
                        Details
                        <span
                           className={cn(
                              "absolute bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-green-500 transition-all duration-300 ease-out group-hover:w-5/6",
                              {
                                 "w-3/4": isDetailsOpened,
                              },
                           )}
                        />
                     </Button>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}
