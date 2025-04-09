"use client";

import React from "react";

import { MessagesContainer } from "@features/projects/[project-id]/components/messages/MessagesContainer";
import { Banner } from "@features/projects/[project-id]/components/banner/Banner";
import { Prompt } from "@features/projects/[project-id]/components/prompt/Prompt";
import { useConversationStore } from "@features/projects/[project-id]/store/conversation";
import { useDetailsStore } from "@features/projects/[project-id]/store/details";

import { ScrollArea } from "@components/ui/scroll-area";

import { cn } from "@utils/tailwindMerge";

export const ProjectContent = () => {
   const messages = useConversationStore((state) => state.messages);
   const isOpened = useDetailsStore((state) => state.isDetailsOpened);

   return (
      <div
         className={cn(
            "flex h-full flex-1 flex-col justify-center gap-8 p-4 transition-all duration-300 ease-in-out",
            {
               "justify-between": messages && messages.length > 0,
               "mr-96": isOpened,
            },
         )}
      >
         {messages ? (
            <div className="flex-1 overflow-hidden">
               <ScrollArea className="h-full w-full">
                  <MessagesContainer />
               </ScrollArea>
            </div>
         ) : (
            <Banner />
         )}
         <div className="flex-shrink-0">
            <Prompt />
         </div>
      </div>
   );
};
