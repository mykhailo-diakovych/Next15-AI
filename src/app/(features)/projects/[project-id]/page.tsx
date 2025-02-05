"use client";

import React from "react";

import { Prompt } from "@/app/(features)/projects/[project-id]/components/prompt/Prompt";

import { useAsk } from "@/app/(features)/projects/[project-id]/hooks/useAsk";
import { useConversationStore } from "@/app/(features)/projects/[project-id]/store/conversation";

const ProjectPage = () => {
   const { askQuestion, isLoading, error } = useAsk();

   const state = useConversationStore((state) => state);
   console.log(state);

   const handleAsk = async (prompt: string) => {
      await askQuestion({
         question: prompt,
      });
   };

   return (
      <div className="flex flex-1 items-center justify-center px-5">
         <Prompt handleAsk={handleAsk} />
      </div>
   );
};

export default ProjectPage;
