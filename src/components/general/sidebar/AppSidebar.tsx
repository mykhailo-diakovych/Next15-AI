"use client";

import React from "react";
import Link from "next/link";

import {
   Sidebar,
   SidebarContent,
   SidebarFooter,
   SidebarHeader,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
   SidebarRail,
   useSidebar,
} from "@/components/ui/sidebar";
import { ModelSwitcher } from "@components/general/sidebar/ModelSwitcher";
import { Separator } from "@components/ui/separator";
import { NewThreadButton } from "@components/general/sidebar/NewThreadButton";
import { Icon } from "@components/shared/icon";
import { Logo } from "@components/general/logo/HeaderLogo";
import { cn } from "@utils/tailwindMerge";

// This is sample data.
const data = {
   models: [
      {
         name: "Gen AI",
      },
      {
         name: "Volt Ai",
      },
   ],
   navMain: [
      {
         items: [
            {
               title: "Home",
               icon: "home",
               url: "#",
            },
            {
               title: "Projects",
               icon: "projects",
               url: "#",
            },
         ],
      },
      {
         items: [
            {
               title: "Threads",
               icon: "threads",
               url: "#",
            },
         ],
      },
   ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
   const { open } = useSidebar();

   return (
      <Sidebar collapsible="icon" {...props}>
         <SidebarHeader className="gap-0 p-0">
            <Logo />

            <ModelSwitcher models={data.models} />
         </SidebarHeader>

         <SidebarContent className="gap-0 px-2 py-3">
            <NewThreadButton />

            <SidebarMenu className="gap-1 py-3">
               {data.navMain[0].items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                     <SidebarMenuButton
                        asChild
                        size="lg"
                        className={cn({
                           "justify-center": !open,
                        })}
                     >
                        <Link href={item.url}>
                           <Icon name={item.icon} />
                           <span
                              className={cn({
                                 hidden: !open,
                              })}
                           >
                              {item.title}
                           </span>
                        </Link>
                     </SidebarMenuButton>
                  </SidebarMenuItem>
               ))}

               <Separator />

               {data.navMain[1].items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                     <SidebarMenuButton
                        asChild
                        size="lg"
                        className={cn({
                           "justify-center": !open,
                        })}
                     >
                        <Link href={item.url}>
                           <Icon name={item.icon} />
                           <span
                              className={cn({
                                 hidden: !open,
                              })}
                           >
                              {item.title}
                           </span>
                        </Link>
                     </SidebarMenuButton>
                  </SidebarMenuItem>
               ))}
            </SidebarMenu>
         </SidebarContent>

         <div className="px-2 py-3">
            <Separator />
         </div>

         <SidebarFooter className="gap-0 px-2 py-3">
            <SidebarMenu>
               <SidebarMenuItem key="settings">
                  <SidebarMenuButton
                     asChild
                     size="lg"
                     className={cn({
                        "justify-center": !open,
                     })}
                  >
                     <Link href="#">
                        <Icon name="settings" />
                        <span
                           className={cn({
                              hidden: !open,
                           })}
                        >
                           Settings
                        </span>
                     </Link>
                  </SidebarMenuButton>
               </SidebarMenuItem>
            </SidebarMenu>
         </SidebarFooter>

         <SidebarRail />
      </Sidebar>
   );
}
