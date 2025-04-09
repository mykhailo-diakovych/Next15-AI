import React, { useMemo, useCallback, useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import { useLocalStorage } from "@uidotdev/usehooks";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import { IProjectItem } from "@features/projects/interfaces/projects";

import { Card, CardDescription, CardTitle } from "@components/ui/card";
import { Button } from "@components/ui/button";

import { useUser } from "@hooks/useUser";

import { ROUTES } from "@configs/routes";
import { STORAGE_KEYS } from "@configs/storage-keys";
import { hasPermission } from "@configs/auth-permissions";

type IProjectCardProps = IProjectItem;

export const ProjectCard = ({ id, name, createdDate }: IProjectCardProps) => {
   const user = useUser();
   const router = useRouter();
   const searchParams = useSearchParams();

   const [showFeatureButton, setShowFeatureButton] = useState(false);
   const [, setProjectId] = useLocalStorage(STORAGE_KEYS.projectId);

   useEffect(() => {
      // Check if projectFeature=true exists in URL parameters
      const hasProjectFeature = searchParams.get("projectFeature") === "true";
      setShowFeatureButton(hasProjectFeature);
   }, [searchParams]);

   const canAccessControls = useMemo(
      () =>
         hasPermission(
            { roles: [user?.user || "reader"], id: user?.id || "" },
            "projectControls",
            "view",
         ),
      [user],
   );

   const handleNavigation = useCallback(
      (path: string) => {
         setProjectId(id);
         router.push(path);
      },
      [id, setProjectId, router],
   );

   return (
      <div className="h-[300px] w-[250px] flex-none">
         <Card className="group relative h-[300px] w-[250px] flex-none overflow-hidden rounded-lg border border-[#E8E8E8] shadow-sm transition-colors duration-300">
            {/* Image Section - Fixed dimensions */}
            <div className="relative h-[180px] w-[250px] flex-none overflow-hidden">
               <Image
                  src="/project-placeholder.webp"
                  alt="Project image"
                  fill
                  className="object-cover"
               />
               <div className="absolute inset-0 grid place-items-center gap-2.5 bg-gradient-to-br from-[#18752E] via-[#131613] to-[#139E99] px-4 py-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Button
                     variant="outline"
                     className="w-full bg-transparent text-white"
                     onClick={() => handleNavigation(ROUTES.PROJECT.path(id))}
                  >
                     Access Chat
                  </Button>
                  {showFeatureButton && (
                     <Button
                        variant="outline"
                        className="w-full bg-transparent text-white"
                        onClick={() =>
                           handleNavigation(
                              canAccessControls
                                 ? ROUTES.PROJECT_CONTROLS.path(id)
                                 : ROUTES.PROJECT_DOCUMENT_FINDER.path(id),
                           )
                        }
                     >
                        {canAccessControls
                           ? "Project Controls"
                           : "Access Documents"}
                     </Button>
                  )}
               </div>
            </div>

            {/* Content Section */}
            <div className="h-[120px] w-[250px] flex-none p-4">
               <CardTitle className="text-md max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-normal">
                  {name}
               </CardTitle>
               <CardDescription>
                  <p>{format(parseISO(createdDate), "dd/MM/yyyy")}</p>
                  <p>147 files</p>
               </CardDescription>
            </div>
         </Card>
      </div>
   );
};
