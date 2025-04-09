import React from "react";

import { IDocument } from "@features/projects/[project-id]/interfaces/docs";
import { useDocumentPreview } from "@features/hooks/useDocumentPreview";

import { Icon } from "@components/shared/icon";
import { Button } from "@components/ui/button";
import { SmallLoader } from "@components/shared/loader/SmallLoader";
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@components/ui/tooltip";

interface DocumentNameProps {
   file: IDocument;
}

export const DocumentName: React.FC<DocumentNameProps> = ({ file }) => {
   const { handleOpenDocument, isDocumentLoading } = useDocumentPreview(file);

   return (
      <div className="flex flex-col gap-2">
         <p className="text-md font-normal">Document Name</p>
         <div
            className="flex cursor-pointer items-center justify-center gap-4 rounded bg-white p-3.5"
            onClick={handleOpenDocument}
         >
            <TooltipProvider>
               <Tooltip>
                  <TooltipTrigger asChild>
                     <div className="flex w-80 items-center gap-1.5">
                        <Icon name="pdf-source" className="size-4 shrink-0" />
                        <p className="flex-1 overflow-hidden truncate text-sm font-normal text-black-bean/90">
                           {file.filename}
                        </p>
                     </div>
                  </TooltipTrigger>
                  <TooltipContent>{file.filename}</TooltipContent>
               </Tooltip>
            </TooltipProvider>
            <Button
               variant="ghost"
               className="size-4 p-0 hover:bg-transparent"
               disabled={isDocumentLoading}
            >
               {isDocumentLoading ? (
                  <SmallLoader className="scale-[2.5]" />
               ) : (
                  <Icon
                     name="expand-arrows"
                     className="block size-3 shrink-0"
                  />
               )}
            </Button>
         </div>
      </div>
   );
};
