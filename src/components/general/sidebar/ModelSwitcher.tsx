"use client";

import React from "react";

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuShortcut,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
   SidebarTrigger,
   useSidebar,
} from "@/components/ui/sidebar";
import { Icon } from "@/components/shared/icon";

export const ModelSwitcher = ({ models }: { models: { name: string }[] }) => {
   const { isMobile } = useSidebar();
   const [activeModel, setActiveModel] = React.useState(models[0]);

   return (
      <SidebarMenu>
         <SidebarMenuItem className="flex h-14 items-center justify-between border-b border-gray-200 p-2">
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <div className="flex w-40">
                     <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                        <div className="grid flex-1 text-left text-sm leading-tight">
                           <span className="text-left text-sm font-normal leading-5 tracking-[-0.02em]">
                              {activeModel.name}
                           </span>
                        </div>
                        <Icon name="chevrons-up-down" className="h-6 w-6" />
                     </SidebarMenuButton>
                  </div>
               </DropdownMenuTrigger>
               <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  align="start"
                  side={isMobile ? "bottom" : "right"}
                  sideOffset={4}
               >
                  <DropdownMenuLabel className="text-xs text-muted-foreground">
                     Models
                  </DropdownMenuLabel>
                  {models.map((model, index) => (
                     <DropdownMenuItem
                        key={model.name}
                        onClick={() => setActiveModel(model)}
                        className="gap-2 p-2"
                     >
                        {model.name}
                        <DropdownMenuShortcut>
                           ⌘{index + 1}
                        </DropdownMenuShortcut>
                     </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
               </DropdownMenuContent>
            </DropdownMenu>

            <SidebarTrigger />
         </SidebarMenuItem>
      </SidebarMenu>
   );
};
