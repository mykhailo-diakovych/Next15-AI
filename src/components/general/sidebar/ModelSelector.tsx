import React from "react";

import {
   SidebarMenuButton,
   SidebarMenuItem,
   useSidebar,
} from "@components/ui/sidebar";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { Icon } from "@components/shared/icon";

import { cn } from "@utils/tailwindMerge";

import { SIDEBAR } from "@configs/constants";

export const ModelSelector = () => {
   const { open } = useSidebar();

   return (
      <SidebarMenuItem>
         <SidebarMenuButton
            asChild
            size="lg"
            className={cn("relative rounded bg-white", {
               "flex items-center justify-center": !open,
            })}
         >
            <DropdownMenu>
               <DropdownMenuTrigger
                  className={cn(
                     "relative flex h-12 w-full items-center gap-2 rounded bg-white p-2",
                     { "flex size-12 items-center justify-center": !open },
                  )}
               >
                  <Icon
                     className={cn("ml-4 size-4", { "ml-0": !open })}
                     name={SIDEBAR.projects[0].icon}
                  />
                  <span className={cn({ hidden: !open })}>
                     {SIDEBAR.projects[0].title}
                  </span>
                  <Icon
                     name="arrow"
                     className={cn("absolute right-3.5 h-1.5 w-3", {
                        hidden: !open,
                     })}
                  />
               </DropdownMenuTrigger>
               <DropdownMenuContent className="cursor-pointer">
                  {SIDEBAR.models.map((model, i) => (
                     <div key={`${model.name}${i}`}>
                        <DropdownMenuItem>
                           <span>{model.name}</span>
                        </DropdownMenuItem>
                        {SIDEBAR.models.length - 1 !== i && (
                           <DropdownMenuSeparator />
                        )}
                     </div>
                  ))}
               </DropdownMenuContent>
            </DropdownMenu>
         </SidebarMenuButton>
      </SidebarMenuItem>
   );
};
