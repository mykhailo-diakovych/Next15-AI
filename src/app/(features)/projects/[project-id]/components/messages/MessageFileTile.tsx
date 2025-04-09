import React, { useState } from "react";
import { motion } from "framer-motion";

import { IFile } from "@features/projects/[project-id]/interfaces/message";
import { useFetchAllDetailsSources } from "@features/projects/[project-id]/hooks/useFetchAllDetailsSources";
import { useDetailsStore } from "@features/projects/[project-id]/store/details";
import { useDocumentPreview } from "@features/hooks/useDocumentPreview";

import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@components/ui/tooltip";
import { Card } from "@components/ui/card";
import { Icon } from "@components/shared/icon";
import { useSidebar } from "@components/ui/sidebar";

interface IFileTileProps {
   file: IFile;
}

export const MessageFileTile = ({ file }: IFileTileProps) => {
   const { setOpen: setIsSidebarOpened } = useSidebar();

   const [isHovered, setIsHovered] = useState(false);

   const setOpenSources = useDetailsStore((state) => state.setOpenSources);
   const openSources = useDetailsStore((state) => state.openSources);
   const setIsDetailsOpened = useDetailsStore(
      (state) => state.setIsDetailsOpened,
   );

   const { fetchedFiles } = useFetchAllDetailsSources([file]);

   const { handleOpenDocument } = useDocumentPreview(file);

   const isFileSelected = (file: IFile) =>
      openSources.find((source) => source.id === file.id);

   const handleSelectSource = (file: IFile) => {
      setIsSidebarOpened(false);
      setIsDetailsOpened(true);

      if (isFileSelected(file)) {
         setOpenSources(openSources.filter((source) => source.id !== file.id));
      } else {
         setOpenSources([...openSources, file]);
      }
   };

   return (
      <TooltipProvider>
         <Tooltip>
            <TooltipTrigger>
               <Card
                  className="flex max-w-80 cursor-pointer items-center gap-2 rounded border border-gray-100 p-2.5"
                  onClick={() => handleSelectSource(file)}
               >
                  <motion.div
                     className="relative size-12 shrink-0 rounded-full bg-gray-100 p-1"
                     onHoverStart={() => setIsHovered(true)}
                     onHoverEnd={() => setIsHovered(false)}
                     whileHover={{ scale: 1.1 }}
                     onClick={() => handleOpenDocument()}
                  >
                     <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: isHovered ? 0 : 1 }}
                        transition={{ duration: 0.2 }}
                     >
                        <Icon
                           name="pdf-file"
                           className="absolute left-1/2 top-1/2 size-6 -translate-x-1/2 -translate-y-1/2"
                        />
                     </motion.div>
                     <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                     >
                        <Icon
                           name="expand-arrows"
                           className="absolute left-1/2 top-1/2 size-6 -translate-x-1/2 -translate-y-1/2"
                        />
                     </motion.div>
                  </motion.div>
                  <div className="flex flex-col gap-[2px] overflow-hidden text-left">
                     <p className="w-full truncate text-left text-sm font-normal">
                        {fetchedFiles[0]?.title}
                     </p>
                     <p className="truncate text-sm font-normal text-old-silver">
                        {fetchedFiles[0]?.filename}
                     </p>
                  </div>
                  <div className="w-20 shrink-0">
                     <p className="text-xs font-normal text-old-silver">
                        Page {fetchedFiles[0]?.pages?.join(", ")}
                     </p>
                  </div>
               </Card>
            </TooltipTrigger>
            <TooltipContent>
               <span>{fetchedFiles[0]?.title}</span>
            </TooltipContent>
         </Tooltip>
      </TooltipProvider>
   );
};
