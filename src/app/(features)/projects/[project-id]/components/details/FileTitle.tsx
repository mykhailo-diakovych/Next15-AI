import React from "react";

import { InlineEditableField } from "@/app/(features)/projects/[project-id]/components/details/InlineEditableField";

interface FileTitleProps {
   title: string;
   onTitleUpdate?: (newTitle: string) => void;
   isEditable?: boolean;
   isLoading?: boolean;
}

export const FileTitle: React.FC<FileTitleProps> = ({
   title,
   onTitleUpdate,
   isEditable = false,
   isLoading = false,
}) => {
   if (isEditable && onTitleUpdate) {
      return (
         <div className="flex flex-col gap-2">
            <InlineEditableField
               label="Title"
               value={title || ""}
               onSave={onTitleUpdate}
               maxLength={200}
               disabled={isLoading}
               className="w-full"
            />
         </div>
      );
   }

   return (
      <div className="flex flex-col gap-2">
         <p className="text-md font-normal">Title</p>
         <div className="rounded bg-white p-3.5 text-sm font-normal text-black-bean/90">
            {title || "Untitled Document"}
         </div>
      </div>
   );
};
