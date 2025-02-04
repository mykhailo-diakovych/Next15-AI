"use client";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/shared/icon";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AppHeader() {
   return (
      <div className="flex h-[60px] items-center justify-end border-b border-v-grey-200 px-8 py-2.5">
         <div className="flex items-center gap-6">
            <Button className="size-5 shrink-0 bg-transparent p-0 shadow-none transition-all duration-300 hover:scale-110 hover:bg-transparent">
               <Icon name="info" />
            </Button>
            <Button className="size-5 shrink-0 bg-transparent p-0 shadow-none transition-all duration-300 hover:scale-110 hover:bg-transparent">
               <Icon name="bell" />
            </Button>
            <DropdownMenu>
               <DropdownMenuTrigger className="flex items-center gap-x-3 rounded-[2px] border border-v-grey-200 p-1 focus-within:outline-none">
                  <Avatar className="flex size-8 items-center justify-center rounded-[2px] bg-gradient-to-r from-v-grey-800 to-v-grey-600/70">
                     <AvatarImage
                        src="https://github.com/shadcn.pngf"
                        alt="@shadcn"
                     />
                     <AvatarFallback className="flex size-4 items-start justify-center bg-transparent">
                        <Icon name="user" className="size-4" />
                     </AvatarFallback>
                  </Avatar>
                  <div className="flex items-center gap-x-2">
                     Voltquant
                     <Icon name="arrow" className="h-1 w-2" />
                  </div>
               </DropdownMenuTrigger>
               <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                     <Link href="/">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                     <Link href="/">Billing</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                     <Link href="/">Team</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                     <Link href="/">Subscription</Link>
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         </div>
      </div>
   );
}
