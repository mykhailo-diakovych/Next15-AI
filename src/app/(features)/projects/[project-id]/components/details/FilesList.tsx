import React, { useRef } from "react";

import { IDocument } from "@features/projects/[project-id]/interfaces/docs";
import { useDetailsStore } from "@features/projects/[project-id]/store/details";
import { FileCard } from "@features/projects/[project-id]/components/details/FileCard";

interface FilesListProps {
   files: IDocument[];
}

export const FilesList = ({ files }: FilesListProps) => {
   const openSources = useDetailsStore((state) => state.openSources);

   const containerRef = useRef<HTMLDivElement>(null);
   const collapsibleRefs = useRef<(HTMLDivElement | null)[]>([]);

   // Helper function to scroll to opened element
   const scrollToOpenedElement = (index: number) => {
      if (!containerRef.current || !collapsibleRefs.current[index]) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const elementRect =
         collapsibleRefs.current[index].getBoundingClientRect();

      // If element is not fully visible, adjust scroll
      if (
         elementRect.top < containerRect.top ||
         elementRect.bottom > containerRect.bottom
      ) {
         const offset =
            collapsibleRefs.current[index].offsetTop -
            containerRef.current.clientHeight / 2 +
            elementRect.height / 2;

         containerRef.current.scrollTo({
            top: offset,
            behavior: "smooth",
         });
      }
   };

   return (
      <div
         ref={containerRef}
         className="no-scrollbar relative flex h-full max-h-[calc(100dvh-6rem)] w-full flex-col justify-center overflow-y-auto border-l-2 border-gray-100 bg-white"
      >
         <div className="h-full">
            <div className="relative flex flex-1 flex-col gap-3 overflow-y-auto p-3">
               {!files?.length && (
                  <h3 className="text-center">No Details Available</h3>
               )}
               {files?.map((file, index) => (
                  <FileCard
                     key={`${file.id}-${index}`}
                     file={file}
                     index={index}
                     isOpen={openSources.some(
                        (source) => source.id === file.id,
                     )}
                     ref={(el) => {
                        collapsibleRefs.current[index] = el;
                     }}
                     onAnimationComplete={() => scrollToOpenedElement(index)}
                  />
               ))}
            </div>
         </div>
      </div>
   );
};
