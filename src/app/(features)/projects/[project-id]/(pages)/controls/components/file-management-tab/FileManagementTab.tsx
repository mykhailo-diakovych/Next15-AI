import React, { Suspense, useState } from "react";
import { useParams } from "next/navigation";
import { FilePlus2 } from "lucide-react";

import { useFetchDocuments } from "@features/hooks/useFetchDocuments";
import { columns } from "@features/projects/[project-id]/(pages)/controls/components/file-management-tab/columns";
import { DataTable } from "@features/projects/[project-id]/(pages)/controls/components/file-management-tab/data-table";

import { SmallLoader } from "@components/shared/loader/SmallLoader";
import { Button } from "@components/ui/button";
import { FilesUploadDialog } from "@components/general/files-upload/FilesUploadDialog";

export const FileManagementTab = () => {
   const [openUploadFileDialog, setOpenUploadFileDialog] = useState(false);

   const params = useParams<{ "project-id": string }>();

   const { data } = useFetchDocuments({ projectId: params["project-id"] });

   const files = data.items.map((item) => ({
      ...item,
      dates: { createdAt: item.createdDate },
   }));

   return (
      <div className="relative p-6">
         <Button
            variant="outline"
            className="absolute -top-12 right-0 flex items-center gap-1 border-lime-500 bg-lime-50"
            onClick={() => setOpenUploadFileDialog(true)}
         >
            <FilePlus2 className="size-4" />
            <span>Add File</span>
         </Button>
         <Suspense fallback={<SmallLoader className="scale-125" />}>
            <DataTable columns={columns} data={files} />
         </Suspense>

         <FilesUploadDialog
            open={openUploadFileDialog}
            setOpen={setOpenUploadFileDialog}
            showProjectDropdown={false}
         />
      </div>
   );
};
