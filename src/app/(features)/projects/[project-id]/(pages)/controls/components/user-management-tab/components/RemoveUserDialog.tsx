import React, { useState } from "react";
import { UserMinus } from "lucide-react";

import { ActionButton } from "@features/projects/[project-id]/(pages)/controls/components/user-management-tab/columns";

import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@components/ui/dialog";
import { Button } from "@components/ui/button";

export const RemoveUserDialog = () => {
   const [open, setOpen] = useState(false);

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>
            <ActionButton
               icon={UserMinus}
               color="text-red-700"
               onClick={() => setOpen(true)}
            >
               Delete User from Project
            </ActionButton>
         </DialogTrigger>
         <DialogContent className="max-w-md">
            <DialogHeader>
               <DialogTitle className="text-base font-medium">
                  Delete User
               </DialogTitle>
               <DialogDescription>
                  Are you sure you want to delete this user?
               </DialogDescription>
            </DialogHeader>

            <DialogFooter className="flex w-full flex-row items-center justify-between sm:justify-between">
               <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
               >
                  Exit
               </Button>
               <Button onClick={() => setOpen(false)}>Delete</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
};
