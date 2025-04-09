"use client";

import React from "react";

import { useFetchAllDetailsSources } from "@features/projects/[project-id]/hooks/useFetchAllDetailsSources";
import { useDetailsStore } from "@features/projects/[project-id]/store/details";
import { useConversationStore } from "@features/projects/[project-id]/store/conversation";
import { DocumentPreview } from "@features/projects/[project-id]/components/details/DocumentPreview";
import { FilesList } from "@features/projects/[project-id]/components/details/FilesList";

import { cn } from "@utils/tailwindMerge";

export const ProjectDetails = () => {
   // Extract state from stores
   const isDetailsOpened = useDetailsStore((state) => state.isDetailsOpened);
   const documentPreviewUrl = useDetailsStore(
      (state) => state.documentPreviewUrl,
   );
   const isDocumentPreviewFullscreen = useDetailsStore(
      (state) => state.isDocumentPreviewFullscreen,
   );

   const files = useConversationStore((state) => state.files) ?? [];

   // Fetch files
   const { fetchedFiles } = useFetchAllDetailsSources(files);

   return (
      <section
         className={cn(
            "absolute right-0 top-0 h-full transform transition-all duration-300 ease-in-out",
            {
               "translate-x-0": isDetailsOpened,
               "translate-x-full": !isDetailsOpened,
               "w-full": documentPreviewUrl,
               "w-[28rem]": !documentPreviewUrl,
            },
         )}
      >
         {documentPreviewUrl && !isDocumentPreviewFullscreen && (
            <DocumentPreview />
         )}

         {!documentPreviewUrl && <FilesList files={fetchedFiles} />}
      </section>
   );
};
