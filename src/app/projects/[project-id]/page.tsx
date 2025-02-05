"use client";

import React, { useEffect } from "react";

import { useAsk } from "@/app/projects/[project-id]/hooks/useAsk";

const Page = () => {
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

   return <div>Page project</div>;
};

export default Page;
