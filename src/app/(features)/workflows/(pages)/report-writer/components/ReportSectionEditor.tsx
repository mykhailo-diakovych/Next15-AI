import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
   Dialog,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@components/ui/dialog";
import { Separator } from "@components/ui/separator";
import { Label } from "@components/ui/label";
import { Input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";
import { Button } from "@components/ui/button";

// Define the validation schema using Zod
const ReportSectionSchema = z.object({
   title: z
      .string()
      .min(1, "Title is required")
      .max(100, "Title cannot exceed 100 characters"),
   description: z
      .string()
      .min(10, "Description must be at least 10 characters")
      .max(1000, "Description cannot exceed 1000 characters"),
});

type ReportSectionData = z.infer<typeof ReportSectionSchema>;

interface IReportSectionEditorProps {
   editorOpen: boolean;
   setEditorOpen: (open: boolean) => void;
   onSave?: (data: ReportSectionData) => void;
   defaultValues?: Partial<ReportSectionData>;
}

export const ReportSectionEditor = ({
   editorOpen,
   setEditorOpen,
   onSave,
   defaultValues = { title: "", description: "" },
}: IReportSectionEditorProps) => {
   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      setValue,
   } = useForm<ReportSectionData>({
      resolver: zodResolver(ReportSectionSchema),
      defaultValues,
   });

   // Handle form submission
   const onSubmit = (data: ReportSectionData) => {
      if (onSave) {
         onSave(data);
      }
      reset();
      setEditorOpen(false);
   };

   // Reset form when dialog closes
   const handleOpenChange = (open: boolean) => {
      if (!open) {
         reset();
      }
      setEditorOpen(open);
   };

   useEffect(() => {
      if (defaultValues && editorOpen) {
         setValue("title", defaultValues.title || "");
         setValue("description", defaultValues.description || "");
      }
   }, [defaultValues, editorOpen, setValue]);

   return (
      <Dialog open={editorOpen} onOpenChange={handleOpenChange}>
         <DialogContent className="max-w-3xl">
            <DialogHeader>
               <DialogTitle className="text-base font-medium">
                  Report Section Editor
               </DialogTitle>
            </DialogHeader>

            <Separator />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
               <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="title">Section Title</Label>
                  <Input
                     id="title"
                     placeholder="Give your section a title..."
                     className={errors.title ? "border-red-500" : ""}
                     {...register("title")}
                  />
                  <div className="h-5">
                     {errors.title && (
                        <p className="text-sm text-red-500">
                           {errors.title.message}
                        </p>
                     )}
                  </div>
               </div>

               <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="description">Section Description</Label>
                  <Textarea
                     id="description"
                     placeholder="Describe the intent behind your report and if there are any sources that are of interest..."
                     className={`h-56 resize-none ${errors.description ? "border-red-500" : ""}`}
                     {...register("description")}
                  />
                  <div className="h-5">
                     {errors.description && (
                        <p className="text-sm text-red-500">
                           {errors.description.message}
                        </p>
                     )}
                  </div>
               </div>

               <Separator />

               <DialogFooter>
                  <Button type="submit" className="gradient-button h-12 w-full">
                     Save
                  </Button>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   );
};
