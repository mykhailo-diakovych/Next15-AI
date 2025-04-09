"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Cog } from "lucide-react";

import { tabs } from "@features/projects/[project-id]/(pages)/controls/tabs";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";

const ProjectControlsPage = () => {
   const params = useParams<{ "project-id": string }>();

   return (
      <div className="px-7 py-5">
         <h2 className="absolute top-7 mb-4 ml-2 flex items-center gap-2 text-[2rem] text-black">
            <Cog size={40} /> Project Controls
         </h2>
         <p className="mb-12 ml-2 text-sm font-medium text-gray-500">
            ID: {params["project-id"]}
         </p>
         <Tabs defaultValue={tabs[0].value} className="w-full">
            <TabsList className="mb-2 w-full justify-start gap-2 rounded-none bg-background p-0">
               {tabs.map((tab) => (
                  <TabsTrigger
                     key={tab.value}
                     value={tab.value}
                     className="h-full border border-transparent bg-background data-[state=active]:border-lime-500 data-[state=active]:bg-lime-50 data-[state=active]:shadow-none"
                  >
                     <p className="text-sm tracking-wider">{tab.name}</p>
                  </TabsTrigger>
               ))}
            </TabsList>

            {tabs.map((tab) => (
               <TabsContent
                  key={tab.value}
                  value={tab.value}
                  className="border-t-2"
               >
                  {tab.content}
               </TabsContent>
            ))}
         </Tabs>
      </div>
   );
};

export default ProjectControlsPage;
