import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@components/ui/dialog";
import { Label } from "@components/ui/label";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@components/ui/select";

import { cn } from "@utils/tailwindMerge";

import { ROLES } from "@configs/constants";

// Define the validation schema using Zod
const AddUserSchema = z.object({
   email: z.string().email("Email is required"),
   role: z.string().min(1, "Role is required"),
});

type AddUserData = z.infer<typeof AddUserSchema>;

interface IUserEditorProps {
   open: boolean;
   setOpen: (open: boolean) => void;
   defaultValues?: Partial<AddUserData>;
}

export const UserEditor = ({
   open,
   setOpen,
   defaultValues = {
      email: "",
      role: "",
   },
}: IUserEditorProps) => {
   const {
      register,
      handleSubmit,
      control,
      formState: { errors },
      reset,
   } = useForm<AddUserData>({
      resolver: zodResolver(AddUserSchema),
      defaultValues,
   });

   // Handle form submission
   const onSubmit = () => {
      reset();
      setOpen(false);
   };

   const handleClose = () => {
      reset();
      setOpen(false);
   };

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogContent className="max-w-md">
            <DialogHeader>
               <DialogTitle className="text-base font-medium">
                  Add User
               </DialogTitle>
               <DialogDescription>
                  Input user details here. Click save when you&#39;re done.
               </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
               <div className="grid grid-cols-6 items-baseline gap-4">
                  <Label htmlFor="email" className="text-right">
                     Email
                  </Label>
                  <div className="col-span-5">
                     <Input
                        id="email"
                        placeholder="Provide user email..."
                        className={cn("col-span-5", {
                           "border-red-500": errors.email,
                        })}
                        {...register("email")}
                     />
                     <div className="mt-0.5 h-5">
                        {errors.email && (
                           <p className="text-sm text-red-500">
                              {errors.email.message}
                           </p>
                        )}
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-6 items-baseline gap-4">
                  <Label className="text-right">Role</Label>
                  <div className="col-span-5">
                     <Controller
                        name="role"
                        control={control}
                        render={({ field }) => (
                           <Select
                              onValueChange={field.onChange}
                              value={field.value}
                           >
                              <SelectTrigger
                                 className={cn("col-span-5", {
                                    "border-red-500": errors.role,
                                 })}
                              >
                                 <SelectValue placeholder="Select a role..." />
                              </SelectTrigger>
                              <SelectContent>
                                 {ROLES.map((role) => (
                                    <SelectItem
                                       key={role.value}
                                       value={role.value}
                                       className="cursor-pointer"
                                    >
                                       {role.name}
                                    </SelectItem>
                                 ))}
                              </SelectContent>
                           </Select>
                        )}
                     />
                     <div className="mt-0.5 h-5">
                        {errors.role && (
                           <p className="text-sm text-red-500">
                              {errors.role.message}
                           </p>
                        )}
                     </div>
                  </div>
               </div>

               <DialogFooter className="flex w-full flex-row items-center justify-between sm:justify-between">
                  <Button type="button" variant="outline" onClick={handleClose}>
                     Clear & Exit
                  </Button>
                  <Button type="submit">Save changes</Button>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   );
};
