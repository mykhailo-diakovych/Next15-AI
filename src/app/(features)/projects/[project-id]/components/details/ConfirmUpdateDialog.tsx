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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface ConfirmUpdateDialogProps {
   isOpen: boolean;
   onClose: () => void;
   onConfirm: () => void;
   type: "title" | "description" | "keywords";
   pendingValue: string;
   isLoading: boolean;
}

const ConfirmUpdateDialog: React.FC<ConfirmUpdateDialogProps> = ({
   isOpen,
   onClose,
   onConfirm,
   type,
   pendingValue,
   isLoading,
}) => {
   if (!type) return null;

   const getTypeDisplay = () => {
      switch (type) {
         case "title":
            return "Title";
         case "description":
            return "Description";
         case "keywords":
            return "Keywords";
         default:
            return type;
      }
   };

   return (
      <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>
                  Confirm {getTypeDisplay()} Update
               </AlertDialogTitle>
               <AlertDialogDescription>
                  The <strong>{getTypeDisplay()}</strong>{" "}
                  {pendingValue.length > 50
                     ? `will be updated`
                     : `"${pendingValue}"`}{" "}
                  for all users in the organization. Are you sure you want to
                  proceed?
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel asChild>
                  <Button
                     variant="outline"
                     onClick={onClose}
                     disabled={isLoading}
                  >
                     Cancel
                  </Button>
               </AlertDialogCancel>
               <AlertDialogAction asChild>
                  <Button onClick={onConfirm} disabled={isLoading}>
                     {isLoading ? "Updating..." : "Confirm"}
                  </Button>
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
};

export default ConfirmUpdateDialog;
