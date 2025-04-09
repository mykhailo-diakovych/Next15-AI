import React from "react";

import { IDocument } from "@features/projects/[project-id]/interfaces/docs";

import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@components/ui/tooltip";
import { Card } from "@components/ui/card";
import { Icon } from "@components/shared/icon";

import { cn } from "@utils/tailwindMerge";

interface IFileTileProps {
   document: IDocument;
   handleSelectDocument: (document: IDocument) => void;
   isDocumentSelected: (document: IDocument) => IDocument | undefined;
}

export const RelevantFileTile = ({
   document,
   handleSelectDocument,
   isDocumentSelected,
}: IFileTileProps) => {
   return (
      <TooltipProvider>
         <Tooltip>
            <TooltipTrigger className="max-h-16">
               <Card
                  className={cn(
                     "flex max-w-64 cursor-pointer gap-2 p-2",
                     isDocumentSelected(document) && "border-lime-500",
                  )}
                  onClick={() => handleSelectDocument(document)}
               >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-100 p-2">
                     <Icon name="pdf-file" className="size-5" />
                  </div>
                  <div className="flex flex-col gap-[2px] overflow-hidden text-left">
                     <p className="w-full truncate text-left text-sm font-normal">
                        {document.title}
                     </p>
                     <p className="truncate text-sm font-normal text-old-silver">
                        {document.filename}
                     </p>
                  </div>
               </Card>
            </TooltipTrigger>
            <TooltipContent>
               <span>{document.title}</span>
            </TooltipContent>
         </Tooltip>
      </TooltipProvider>
   );
};
