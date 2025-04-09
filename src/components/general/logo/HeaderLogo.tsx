import React from "react";

import { useSidebar } from "@components/ui/sidebar";

import { cn } from "@utils/tailwindMerge";

import { Icon } from "@/components/shared/icon";

export const Logo = () => {
   const { open } = useSidebar();

   return (
      <div
         className={cn("flex items-center gap-1.5", {
            hidden: !open,
         })}
      >
         <Icon name="logo" className="h-6 w-6" />

         {open && (
            <span
               className={cn("text-lg font-medium uppercase tracking-wider", {
                  hidden: !open,
               })}
            >
               VOLTQUANT
            </span>
         )}
      </div>
   );
};
