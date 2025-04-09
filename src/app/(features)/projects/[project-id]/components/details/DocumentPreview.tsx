import React from "react";
import { Expand } from "lucide-react";

import { useDetailsStore } from "@features/projects/[project-id]/store/details";

import { Icon } from "@components/shared/icon";
import { Button } from "@components/ui/button";

export const DocumentPreview = () => {
   const documentPreviewUrl = useDetailsStore(
      (state) => state.documentPreviewUrl,
   );
   const setDocumentPreviewUrl = useDetailsStore(
      (state) => state.setDocumentPreviewUrl,
   );
   const setDocumentPreviewPage = useDetailsStore(
      (state) => state.setDocumentPreviewPage,
   );
   const setDocumentPreviewFullscreen = useDetailsStore(
      (state) => state.setDocumentPreviewFullscreen,
   );
   const documentPreviewPage = useDetailsStore(
      (state) => state.documentPreviewPage,
   );

   const handleClose = () => {
      setDocumentPreviewUrl(null);
      setDocumentPreviewPage(0);
   };

   return (
      <div className="no-scrollbar relative h-full w-full overflow-y-auto border-l-2 border-gray-100 bg-white pt-2">
         <div className="flex items-center justify-between p-4">
            <h5 className="text-lg font-medium">PDF Viewer</h5>
            <div className="flex items-center gap-2">
               <Button
                  variant="outline"
                  onClick={() => setDocumentPreviewFullscreen(true)}
               >
                  <Expand />
               </Button>
               <Button variant="outline" onClick={handleClose}>
                  <Icon name="close" />
               </Button>
            </div>
         </div>
         {documentPreviewUrl && (
            <iframe
               src={`${documentPreviewUrl}#page=${documentPreviewPage}`}
               className="h-[90%] w-full"
               title="Document Preview"
            />
         )}
      </div>
   );
};
