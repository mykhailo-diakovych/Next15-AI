import React from "react";
import { TrashIcon } from "lucide-react";

import { Item } from "@features/hooks/useFetchThreads";
import { useConversationStore } from "@features/projects/[project-id]/store/conversation";

import { SidebarMenuButton, SidebarMenuItem } from "@components/ui/sidebar";
import { Button } from "@components/ui/button";

import { cn } from "@utils/tailwindMerge";

interface IThreadItemProps {
   thread: Item;
   isHovered: boolean;
   onMouseEnter: () => void;
   onMouseLeave: () => void;
   onClick: () => void;
   onDelete: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const ThreadItem = ({
   thread,
   isHovered,
   onMouseEnter,
   onMouseLeave,
   onClick,
   onDelete,
}: IThreadItemProps) => {
   const conversationId = useConversationStore((state) => state.conversationId);

   return (
      <SidebarMenuItem
         className={cn("relative w-full", { hidden: !open })}
         onMouseEnter={onMouseEnter}
         onMouseLeave={onMouseLeave}
      >
         <SidebarMenuButton
            asChild
            size="lg"
            className={cn(
               "w-full cursor-pointer rounded-lg hover:bg-whisper/75",
               {
                  "bg-whisper": conversationId === thread.id,
               },
            )}
            onClick={onClick}
         >
            <div className="flex items-center justify-between">
               <span className="cursor-pointer truncate">
                  {thread.title.replace(/"/g, "")}
               </span>
               {isHovered && (
                  <Button
                     variant="ghost"
                     className="flex size-8 shrink-0 items-center justify-center p-0 hover:bg-red-500"
                     onClick={onDelete}
                  >
                     <TrashIcon className="h-4 w-4 text-black" />
                  </Button>
               )}
            </div>
         </SidebarMenuButton>
      </SidebarMenuItem>
   );
};
