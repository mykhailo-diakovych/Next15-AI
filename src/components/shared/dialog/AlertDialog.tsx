import React from "react";

import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from "@components/ui/alert-dialog";

interface IAppAlertDialogProps {
   title: string;
   description: string;
   isDialogOpen: boolean;
   setDialogOpen: (open: boolean) => void;
   handleCancel: () => void;
   handleConfirm: () => void;
}

export const AppAlertDialog = ({
   title,
   description,
   isDialogOpen,
   setDialogOpen,
   handleCancel,
   handleConfirm,
}: IAppAlertDialogProps) => {
   return (
      <AlertDialog open={isDialogOpen} onOpenChange={setDialogOpen}>
         <AlertDialogTrigger />
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>{title}</AlertDialogTitle>
               <AlertDialogDescription>{description}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel onClick={handleCancel}>
                  Cancel
               </AlertDialogCancel>
               <AlertDialogAction onClick={handleConfirm}>
                  Continue
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
};
