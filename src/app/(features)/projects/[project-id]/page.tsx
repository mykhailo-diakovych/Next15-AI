"use client";

import React from "react";

import { Prompt } from "@/app/(features)/projects/[project-id]/components/prompt/Prompt";
import { MessagesContainer } from "@/app/(features)/projects/[project-id]/components/messages/MessagesContainer";

import { useAsk } from "@/app/(features)/projects/[project-id]/hooks/useAsk";

const ProjectPage = () => {
   const { askQuestion, isLoading, error } = useAsk();

   const handleAsk = async (prompt: string) => {
      await askQuestion({
         question: prompt,
      });
   };

   return (
      <div className="flex flex-1 flex-col items-center justify-center px-5">
         <MessagesContainer />
         <Prompt handleAsk={handleAsk} />
      </div>
   );
};

export default ProjectPage;
