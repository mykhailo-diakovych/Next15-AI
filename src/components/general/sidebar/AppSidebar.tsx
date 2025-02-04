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
} from "@/components/ui/sidebar";
import { ModelSwitcher } from "@components/general/sidebar/ModelSwitcher";
import { Separator } from "@components/ui/separator";
import { NewThreadButton } from "@components/general/sidebar/NewThreadButton";
import { Logo } from "../logo/HeaderLogo";

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
               title: "History",
               url: "#",
            },
            {
               title: "Starred",
               url: "#",
            },
         ],
      },
      {
         items: [
            {
               title: "Threads",
               url: "#",
            },
         ],
      },
   ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
                     <SidebarMenuButton asChild size="lg">
                        <Link href={item.url}>
                           <span>{item.title}</span>
                        </Link>
                     </SidebarMenuButton>
                  </SidebarMenuItem>
               ))}

               <Separator />

               {data.navMain[1].items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                     <SidebarMenuButton asChild size="lg">
                        <Link href={item.url}>
                           <span>{item.title}</span>
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
                  <SidebarMenuButton asChild size="lg">
                     <a href="#">
                        <span>Settings</span>
                     </a>
                  </SidebarMenuButton>
               </SidebarMenuItem>
            </SidebarMenu>
         </SidebarFooter>

         <SidebarRail />
      </Sidebar>
   );
}
