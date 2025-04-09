import React from "react";

import { useAnalyzeStore } from "@features/projects/[project-id]/store/analyze";

import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@components/ui/tooltip";

export const RelevantDocsCounter = () => {
   const selectedDocs = useAnalyzeStore((state) => state.selectedDocs);

   return (
      <TooltipProvider>
         <Tooltip>
            <TooltipTrigger>
               <div className="gradient flex size-8 shrink-0 items-center justify-center rounded-full">
                  <div className="flex size-7 items-center justify-center rounded-full bg-white-smoke text-[#31A147]">
                     {selectedDocs.length}
                  </div>
               </div>
            </TooltipTrigger>
            <TooltipContent>
               <div className="grid grid-cols-2 gap-4">
                  {selectedDocs.map((d, i) => (
                     <p key={`${d.id}${i}`} className="max-w-40 truncate">
                        {d.title}
                     </p>
                  ))}
               </div>
            </TooltipContent>
         </Tooltip>
      </TooltipProvider>
   );
};
