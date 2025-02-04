import React from "react";

import { Icon } from "@/components/shared/icon";
import { useSidebar } from "@components/ui/sidebar";

import { cn } from "@utils/tailwindMerge";

export const Logo = () => {
   const { open } = useSidebar();

   return (
      <div className="flex h-[60px] items-center justify-center gap-[5px] border-b border-gray-200">
         <Icon name="logo" className="h-6 w-6" />

         {open && (
            <span
               className={cn("text-left text-xl font-normal leading-6", {
                  hidden: !open,
               })}
            >
               VOLTQUANT
            </span>
         )}
      </div>
   );
};
