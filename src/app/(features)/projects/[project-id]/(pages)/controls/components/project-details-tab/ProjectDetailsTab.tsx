import React from "react";
import Image from "next/image";
import { ImagePlus, Image as ImageIcon, TrashIcon } from "lucide-react";
import { useParams } from "next/navigation";

import { useFetchProject } from "@features/projects/[project-id]/hooks/useFetchProject";

import { Input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";
import { Button } from "@components/ui/button";

export const ProjectDetailsTab = () => {
   const params = useParams<{ "project-id": string }>();
   const { data } = useFetchProject({ projectId: params["project-id"] });

   return (
      <div className="px-10 pb-8 pt-12">
         <div className="mb-10 grid grid-cols-[10rem_30rem] gap-x-2 gap-y-3.5">
            <p className="text-base font-medium tracking-wide">Project Name</p>
            <Input
               className="m-0 h-10 w-full"
               defaultValue={data?.project.name}
            />

            <div>
               <p className="mb-1 text-base font-medium tracking-wide">
                  Project Description
               </p>
               <p className="text-sm text-gray-400">Max. 200 words.</p>
            </div>
            <Textarea className="!focus:border min-h-60 resize-none" />

            <div>
               <p className="mb-1 text-base font-medium tracking-wide">
                  Edit Feature Image
               </p>
               <p className="text-sm text-gray-400">
                  View or update your project image.
               </p>
            </div>
            <div className="max-w-80 rounded-md border">
               <div className="flex items-center justify-between gap-1 px-2 py-1">
                  <p>Current</p>
                  <ImagePlus className="size-4" />
               </div>
               <div className="relative h-56">
                  <Image
                     src="/project-placeholder.webp"
                     alt={"Project image"}
                     fill
                  />
               </div>
               <div className="flex items-center justify-between gap-1 px-2 py-1">
                  <div className="flex items-center gap-1">
                     <ImageIcon color="#84cc16" />
                     <p className="text-xs text-lime-500">feature_image.png</p>
                  </div>

                  <TrashIcon className="size-4" />
               </div>
            </div>
         </div>

         <div className="flex items-center gap-3">
            <Button disabled type="button" variant="outline">
               Clear
            </Button>
            <Button disabled type="submit">
               Update
            </Button>
         </div>
      </div>
   );
};
