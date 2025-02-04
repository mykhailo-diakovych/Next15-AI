"use client";

import React from "react";
import { AudioWaveform, Command, GalleryVerticalEnd } from "lucide-react";

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
import { Switcher } from "@/components/general/sidebar/Switcher";
import { Separator } from "@components/ui/separator";
import { NewThreadButton } from "@components/general/sidebar/NewThreadButton";
import { HeaderLogo } from "@components/general/header-logo/HeaderLogo";

// This is sample data.
const data = {
   teams: [
      {
         name: "Acme Inc",
         logo: GalleryVerticalEnd,
         plan: "Enterprise",
      },
      {
         name: "Acme Corp.",
         logo: AudioWaveform,
         plan: "Startup",
      },
      {
         name: "Evil Corp.",
         logo: Command,
         plan: "Free",
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
         <SidebarHeader>
            <HeaderLogo />
            <Switcher teams={data.teams} />
         </SidebarHeader>

         <SidebarContent>
            <NewThreadButton />

            <SidebarMenu>
               {data.navMain[0].items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                     <SidebarMenuButton asChild>
                        <a href={item.url}>
                           <span>{item.title}</span>
                        </a>
                     </SidebarMenuButton>
                  </SidebarMenuItem>
               ))}

               <Separator />

               {data.navMain[1].items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                     <SidebarMenuButton asChild>
                        <a href={item.url}>
                           <span>{item.title}</span>
                        </a>
                     </SidebarMenuButton>
                  </SidebarMenuItem>
               ))}
            </SidebarMenu>
         </SidebarContent>

         <Separator />

         <SidebarFooter>
            <SidebarMenu>
               <SidebarMenuItem key="settings">
                  <SidebarMenuButton asChild>
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
