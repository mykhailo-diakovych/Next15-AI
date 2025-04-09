import React, { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Button } from "@components/ui/button";
import { useSidebar } from "@components/ui/sidebar";
import { Icon } from "@components/shared/icon";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { FilesUploadDialog } from "@components/general/files-upload/FilesUploadDialog";

import { useUser } from "@hooks/useUser";

import { cn } from "@utils/tailwindMerge";

export const UserProfile = () => {
   const [openUploadFileDialog, setOpenUploadFileDialog] = useState(false);

   const user = useUser();
   const username = user?.name.split(" ")[0];

   const { open } = useSidebar();

   return (
      <div
         className={cn("flex items-center justify-between", {
            "flex-col-reverse justify-center gap-3": !open,
         })}
      >
         <div
            className={cn("flex cursor-pointer items-center gap-2", {
               "gap-0": !open,
            })}
         >
            <Avatar className="flex size-8 items-center justify-center rounded-full bg-gradient-to-r from-v-grey-800 to-v-grey-600/70">
               <AvatarImage src="/puffiQ.png" alt="User Avatar" />
               <AvatarFallback className="flex size-4 items-start justify-center bg-transparent">
                  <Icon name="user" className="size-4" />
               </AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-x-2">
               <span
                  className={cn("max-w-14 truncate text-sm", { hidden: !open })}
               >
                  {username}
               </span>
            </div>
         </div>

         <div
            className={cn("flex items-center gap-2", {
               "flex-col-reverse": !open,
            })}
         >
            <Button variant="ghost" className="size-6 p-0">
               <Icon className="size-5" name="bell" />
            </Button>
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="size-6 p-0">
                     <Icon className="size-5" name="settings" />
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel className="text-base font-medium">
                     Settings
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                     <DropdownMenuItem
                        onSelect={(e) => {
                           e.preventDefault();
                           setOpenUploadFileDialog(true);
                        }}
                        className="cursor-pointer"
                     >
                        <p className="h-full w-full">Upload Files</p>
                     </DropdownMenuItem>
                  </DropdownMenuGroup>
               </DropdownMenuContent>
            </DropdownMenu>

            <FilesUploadDialog
               open={openUploadFileDialog}
               setOpen={setOpenUploadFileDialog}
            />
         </div>
      </div>
   );
};
