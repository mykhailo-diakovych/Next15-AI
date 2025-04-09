import React from "react";

import { InlineEditableField } from "@/app/(features)/projects/[project-id]/components/details/InlineEditableField";

interface FileDetailsProps {
   description: string;
   onDescriptionUpdate?: (newDescription: string) => void;
   isEditable?: boolean;
   isLoading?: boolean;
}

export const FileDetails: React.FC<FileDetailsProps> = ({
   description,
   onDescriptionUpdate,
   isEditable = false,
   isLoading = false,
}) => {
   if (isEditable && onDescriptionUpdate) {
      return (
         <div className="flex flex-col gap-2">
            <InlineEditableField
               label="Details"
               value={description || ""}
               onSave={onDescriptionUpdate}
               maxLength={500}
               disabled={isLoading}
               multiline
               className="w-full"
            />
         </div>
      );
   }

   return (
      <div className="flex flex-col gap-2">
         <p className="text-md font-normal">Details</p>
         <div className="rounded bg-white p-3.5 text-sm font-normal text-black-bean/90">
            {description || "No description available"}
         </div>
      </div>
   );
};
