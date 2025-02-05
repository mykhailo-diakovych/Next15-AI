"use client";

import React from "react";

import { Prompt } from "@features/projects/[project-id]/components/prompt/Prompt";
import { MessagesContainer } from "@features/projects/[project-id]/components/messages/MessagesContainer";

import { useConversationStore } from "@features/projects/[project-id]/store/conversation";

import { cn } from "@utils/tailwindMerge";

const ProjectPage = () => {
   const messages = useConversationStore((state) => state.messages);

   return (
      <div
         className={cn("flex h-full flex-1 flex-col justify-center p-6", {
            "justify-between": messages && messages.length > 0,
         })}
      >
         <MessagesContainer />
         <Prompt />
      </div>
   );
};

export default ProjectPage;
