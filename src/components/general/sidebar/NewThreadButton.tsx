"use client";

import { Plus } from "lucide-react";
import React, { useCallback, useEffect } from "react";

import { useConversationStore } from "@features/projects/[project-id]/store/conversation";
import { useDetailsStore } from "@features/projects/[project-id]/store/details";
import { usePromptStore } from "@features/projects/[project-id]/store/prompt";

import { useSidebar } from "@components/ui/sidebar";
import { Icon } from "@components/shared/icon";

import { cn } from "@utils/tailwindMerge";

import { Button } from "@/components/ui/button";

interface INewThreadButtonProps {
   setSelectedConversationIdAction: (conversationId: string | null) => void;
}

export function NewThreadButton({
   setSelectedConversationIdAction,
}: INewThreadButtonProps) {
   const { open } = useSidebar();

   const resetConversationState = useConversationStore(
      (state) => state.resetConversationState,
   );

   const resetPromptState = usePromptStore((state) => state.resetPromptState);

   const setOpenSources = useDetailsStore((state) => state.setOpenSources);

   const handleClick = useCallback(() => {
      resetConversationState();
      resetPromptState();

      setOpenSources([]);
      setSelectedConversationIdAction(null);
   }, [
      resetConversationState,
      resetPromptState,
      setOpenSources,
      setSelectedConversationIdAction,
   ]);

   // Add keyboard shortcut handler for Command+K
   useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
         // Check for Command+K (Mac) or Control+K (Windows/Linux)
         if ((event.metaKey || event.ctrlKey) && event.key === "k") {
            event.preventDefault(); // Prevent browser's default behavior
            handleClick();
         }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
         window.removeEventListener("keydown", handleKeyDown);
      };
   }, [handleClick]);

   return (
      <Button
         onClick={handleClick}
         className={cn(
            "flex h-full w-full items-center justify-between border-0 bg-whisper p-3 shadow-none hover:bg-whisper/50",
            {
               "size-12 justify-center p-0": !open,
            },
         )}
         variant="outline"
      >
         <div className="flex items-center gap-2">
            <Plus className="!size-5" />
            <span
               className={cn("text-sm font-normal text-black-bean", {
                  hidden: !open,
               })}
            >
               New Conversation
            </span>
         </div>

         <div className={cn("flex items-center gap-1.5", { hidden: !open })}>
            <div className="flex size-6 items-center justify-center rounded bg-white">
               <Icon name="command" className="!size-3" />
            </div>
            <div className="flex size-6 items-center justify-center rounded bg-white">
               K
            </div>
         </div>
      </Button>
   );
}
