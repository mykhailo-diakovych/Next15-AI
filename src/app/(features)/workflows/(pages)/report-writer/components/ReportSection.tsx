import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Pencil, Trash, GripVertical } from "lucide-react";

import { IReportSection } from "@features/workflows/(pages)/report-writer/interfaces/report-section";

import { Button } from "@components/ui/button";

interface IReportSectionProps extends IReportSection {
   onEdit: () => void;
   deleteSection: (id: string) => void;
}

export const ReportSection = ({
   id,
   title,
   description,
   onEdit,
   deleteSection,
}: IReportSectionProps) => {
   const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id });

   const style = {
      transition,
      transform: CSS.Transform.toString(transform),
   };

   const handleEditClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onEdit();
   };

   const handleDeleteClick = (e: React.MouseEvent, id: string) => {
      e.stopPropagation();
      deleteSection(id);
   };

   return (
      <div
         ref={setNodeRef}
         style={style}
         className="relative flex h-20 items-center rounded-lg border border-black px-5 py-12"
      >
         {/* Drag handle area */}
         <div className="mr-2 cursor-grab" {...attributes} {...listeners}>
            <GripVertical className="size-5 text-green-600" />
         </div>

         {/* Content area */}
         <div className="flex-1">
            <p className="text-sm font-medium">{title}</p>
            <p className="text-sm font-medium text-gray-500">{description}</p>
         </div>

         {/* Action buttons */}
         <div className="flex items-center gap-2.5">
            <Button
               onClick={handleEditClick}
               variant="ghost"
               className="grid size-8 place-items-center p-0"
            >
               <Pencil className="!size-5 shrink-0 text-green-600" />
            </Button>
            <Button
               variant="ghost"
               className="grid size-8 place-items-center p-0"
               onClick={(e) => handleDeleteClick(e, id)}
            >
               <Trash className="!size-5 shrink-0 text-red-600" />
            </Button>
         </div>
      </div>
   );
};
