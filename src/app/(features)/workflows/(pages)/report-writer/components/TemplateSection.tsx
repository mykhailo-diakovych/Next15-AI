"use client";

import React, { Suspense, useState } from "react";
import { Database, Sparkles, FileDown } from "lucide-react";
import dynamic from "next/dynamic";

import { ProjectsLoading } from "@features/projects/components/projects-loading/ProjectsLoading";
import { useFetchProjects } from "@features/projects/hooks/useFetchProjects";
import { useGenerateAIReport } from "@features/workflows/(pages)/report-writer/hooks/useGenerateAIReport";
import { useReportSectionsStore } from "@features/workflows/(pages)/report-writer/store/reports";

import { Separator } from "@components/ui/separator";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@components/ui/select";
import { Icon } from "@components/shared/icon";
import { Button } from "@components/ui/button";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import generateReportAnimation from "public/animations/generate-report.json";

import "./reports.css";

export const TemplateSection = () => {
   const [projectId, setProjectId] = useState("");

   const reportName = useReportSectionsStore((state) => state.reportName);

   const { data } = useFetchProjects();

   const { generateAIReport, isPending, downloadReport, fileName, hasReport } =
      useGenerateAIReport();

   const handleGenerateAIReport = () => {
      generateAIReport({ projectId });
   };

   return (
      <div className="h-[calc(100dvh-11.5rem)] max-h-[49.75rem] max-w-2xl flex-1">
         {isPending ? (
            <div className="h-full w-full overflow-hidden rounded-lg border border-black p-4">
               <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-black p-4">
                  <div className="malachite-blob" />
                  <div className="turquoise-blob" />

                  <Lottie
                     animationData={generateReportAnimation}
                     loop
                     autoPlay
                  />
                  <p className="text-xl text-white">
                     Structuring technical report content...
                  </p>
               </div>
            </div>
         ) : (
            <div className="no-scrollbar grid h-full content-start gap-4 overflow-auto rounded-lg border border-black p-7">
               <h6 className="font-medium uppercase text-gray-500">TEMPLATE</h6>
               <p className="font-medium capitalize text-black">Report</p>

               <Separator />

               <ul className="mb-5 list-inside list-disc space-y-4">
                  <li>Reorder the report sections by dragging them.</li>
                  <li>
                     Add any missing sections if you&#39;re confident
                     they&#39;re present in the data.
                  </li>
                  <li>Remove any unnecessary sections.</li>
               </ul>

               <div className="flex items-center justify-between gap-3 rounded-lg border border-gray-400 bg-gray-50 px-4 py-2">
                  <div className="flex items-center gap-2">
                     <Database className="size-7 text-gray-400" />
                     <p className="font-medium capitalize text-gray-400">
                        Select AI Project Knowledge
                     </p>
                  </div>

                  <Select onValueChange={(value) => setProjectId(value)}>
                     <SelectTrigger className="flex max-w-44 items-center border-lime-500 bg-lime-50 [&>svg]:shrink-0">
                        <Icon name="project-title" className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Project Example" />
                     </SelectTrigger>
                     <SelectContent>
                        <Suspense fallback={<ProjectsLoading />}>
                           {data?.items?.map((project) => (
                              <SelectItem
                                 key={project.id}
                                 value={project.id}
                                 className="cursor-pointer"
                              >
                                 {project.name}
                              </SelectItem>
                           ))}
                        </Suspense>
                     </SelectContent>
                  </Select>
               </div>

               <Separator />

               <div className="grid gap-2">
                  <Button
                     onClick={handleGenerateAIReport}
                     className="gradient-button h-12 flex-1"
                     disabled={isPending}
                  >
                     <Sparkles className="size-6" />
                     {isPending ? "Generating..." : "Generate AI Report"}
                  </Button>

                  {hasReport && (
                     <div className="flex items-center justify-between rounded-lg border border-gray-400 bg-gray-50 px-4 py-2">
                        <div className="grid gap-1">
                           <p className="text-sm font-medium">
                              Report on {reportName}
                           </p>
                           <p className="text-sm text-gray-400">{fileName}</p>
                        </div>
                        <Button
                           variant="outline"
                           onClick={downloadReport}
                           className="size-11 bg-transparent"
                        >
                           <FileDown className="!size-6" />
                        </Button>
                     </div>
                  )}
               </div>
            </div>
         )}
      </div>
   );
};
