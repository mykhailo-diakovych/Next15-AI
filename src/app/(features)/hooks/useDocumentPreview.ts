import { useMutation } from "@tanstack/react-query";

import { DocumentsService } from "@features/projects/[project-id]/services/documents.service";
import { useDetailsStore } from "@features/projects/[project-id]/store/details";

interface Document {
   id: string;
   pages?: number[];
}

export const useDocumentPreview = (file: Document) => {
   const setDocumentPreviewUrl = useDetailsStore(
      (state) => state.setDocumentPreviewUrl,
   );
   const setDocumentPreviewPage = useDetailsStore(
      (state) => state.setDocumentPreviewPage,
   );

   const { mutateAsync: getDocument, isPending: isDocumentLoading } =
      useMutation({
         mutationFn: (fileId: string) => DocumentsService.getDocument(fileId),
      });

   const handleOpenDocument = async () => {
      if (isDocumentLoading) return;

      const document = await getDocument(file.id);

      setDocumentPreviewUrl(document);
      setDocumentPreviewPage(file.pages?.length ? file.pages[0] : 0);
   };

   return {
      handleOpenDocument,
      isDocumentLoading,
   };
};
