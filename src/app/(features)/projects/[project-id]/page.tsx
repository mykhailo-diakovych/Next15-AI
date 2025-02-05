"use client";

import React, { useEffect } from "react";

import { Prompt } from "@/app/(features)/projects/[project-id]/components/prompt/Prompt";

import { useAsk } from "@/app/(features)/projects/[project-id]/hooks/useAsk";

const ProjectPage = () => {
   const { askQuestion, isLoading, error } = useAsk();

   const handleAsk = async () => {
      const response = await askQuestion({
         question: "How are you?",
      });

      console.log(response);
   };

   useEffect(() => {
      handleAsk();
   }, []);

   return (
      <div className="flex flex-1 items-center justify-center px-5">
         <Prompt />
      </div>
   );
};

export default ProjectPage;
