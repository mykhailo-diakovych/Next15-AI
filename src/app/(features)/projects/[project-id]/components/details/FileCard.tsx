"use client";
import React, { forwardRef, useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { useDetailsStore } from "@features/projects/[project-id]/store/details";
import { FileTitle } from "@features/projects/[project-id]/components/details/FileTitle";
import { DocumentName } from "@features/projects/[project-id]/components/details/DocumentName";
import { FileDetails } from "@features/projects/[project-id]/components/details/FileDetails";
import { KeywordsList } from "@features/projects/[project-id]/components/details/KeywordsList";
import { IDocument } from "@features/projects/[project-id]/interfaces/docs";

import { Card, CardContent } from "@components/ui/card";
import {
   Collapsible,
   CollapsibleContent,
   CollapsibleTrigger,
} from "@components/ui/collapsible";
import { Separator } from "@components/ui/separator";

import { cn } from "@utils/tailwindMerge";

import {
   useDocumentMetadata,
   UpdateMetadataParams,
} from "@/app/(features)/hooks/useDocumentMetadata";
import { useToast } from "@/hooks/use-toast";

import ConfirmUpdateDialog from "./ConfirmUpdateDialog";

interface FileCardProps {
   file: IDocument;
   index: number;
   isOpen: boolean;
   onAnimationComplete: () => void;
   onMetadataUpdated?: () => void;
}

export const FileCard = forwardRef<HTMLDivElement, FileCardProps>(
   ({ file, index, isOpen, onAnimationComplete, onMetadataUpdated }, ref) => {
      const openSources = useDetailsStore((state) => state.openSources);
      const setOpenSources = useDetailsStore((state) => state.setOpenSources);
      const { toast } = useToast();
      const { updateMetadata, isUpdating } = useDocumentMetadata();

      const [isSubmitting, setIsSubmitting] = useState(false);

      const [dialogType, setDialogType] = useState<
         "title" | "description" | "keywords" | null
      >(null);
      const [pendingTitle, setPendingTitle] = useState("");
      const [pendingDescription, setPendingDescription] = useState("");
      const [pendingKeywords, setPendingKeywords] = useState<string[]>([]);

      useEffect(() => {
         if (file) {
            setPendingTitle(file.title || "");
            setPendingDescription(file.description || "");
            setPendingKeywords(file.keywords || []);
         }
      }, [file]);

      const handleSelectSource = () => {
         setOpenSources(
            isOpen
               ? openSources.filter((source) => source.id !== file.id)
               : [...openSources, file],
         );
      };

      const isLoading = isUpdating || isSubmitting;

      // Handle opening the dialog when a field is edited
      const handleTitleUpdate = (newTitle: string) => {
         setPendingTitle(newTitle);
         setDialogType("title");
      };

      const handleDescriptionUpdate = (newDescription: string) => {
         setPendingDescription(newDescription);
         setDialogType("description");
      };

      const handleKeywordsUpdate = (newKeywords: string[]) => {
         setPendingKeywords(newKeywords);
         setDialogType("keywords");
      };

      // Update metadata function
      const handleMetadataUpdate = async () => {
         if (isLoading || !dialogType) return;

         try {
            setIsSubmitting(true);

            // Ensure fileId is always a string
            const fileId = file?.id ?? ""; // Prevents null

            // Explicitly define updatePayload with correct type
            const updatePayload: UpdateMetadataParams = { fileId };

            if (dialogType === "title") {
               updatePayload.title = pendingTitle;
            } else if (dialogType === "description") {
               updatePayload.description = pendingDescription;
            } else if (dialogType === "keywords") {
               updatePayload.keywords = pendingKeywords;
            }

            const success = await updateMetadata(updatePayload);

            if (success && onMetadataUpdated) {
               onMetadataUpdated();
            }
         } catch (error) {
            console.error(`Error updating ${dialogType}:`, error);
            toast({
               title: "Error",
               description: `Failed to update document ${dialogType}.`,
               variant: "destructive",
            });
         } finally {
            setIsSubmitting(false);
            setDialogType(null);
         }
      };

      return (
         <Card
            ref={ref}
            className="w-full overflow-hidden rounded-md border-0 bg-sidebar shadow-sm hover:shadow-md"
         >
            <CardContent className="w-full p-6">
               <Collapsible className="flex flex-col" open={isOpen}>
                  <CollapsibleTrigger
                     className="-m-4 cursor-pointer p-4"
                     asChild
                     onClick={handleSelectSource}
                  >
                     <div className="flex flex-col gap-5">
                        <div className="flex items-center justify-between gap-2">
                           <span className="text-md font-normal">
                              Source {index + 1}
                           </span>
                           <ChevronDown
                              size={20}
                              className={cn(
                                 "transition-transform duration-300",
                                 {
                                    "rotate-180": isOpen,
                                    "rotate-0": !isOpen,
                                 },
                              )}
                           />
                        </div>
                        {isOpen && (
                           <Separator className="transition-opacity duration-300" />
                        )}
                     </div>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                     <AnimatePresence>
                        {isOpen && (
                           <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              onAnimationComplete={onAnimationComplete}
                              className="overflow-hidden"
                           >
                              <div className="flex flex-col gap-5 pt-6">
                                 <FileTitle
                                    title={file.title}
                                    onTitleUpdate={handleTitleUpdate}
                                    isEditable={!isLoading}
                                    isLoading={isLoading}
                                 />
                                 {isOpen && <Separator />}
                                 <DocumentName file={file} />
                                 {isOpen && <Separator />}

                                 <FileDetails
                                    description={file.description}
                                    onDescriptionUpdate={
                                       handleDescriptionUpdate
                                    }
                                    isEditable={!isLoading}
                                    isLoading={isLoading}
                                 />
                                 {isOpen && <Separator />}

                                 <KeywordsList
                                    keywords={file.keywords || []}
                                    onKeywordsUpdate={handleKeywordsUpdate}
                                    isEditable={!isLoading}
                                    isLoading={isLoading}
                                 />
                              </div>
                           </motion.div>
                        )}
                     </AnimatePresence>
                  </CollapsibleContent>
               </Collapsible>
            </CardContent>

            {/* Confirmation Dialog */}
            <ConfirmUpdateDialog
               isOpen={dialogType !== null}
               onClose={() => setDialogType(null)}
               onConfirm={handleMetadataUpdate}
               type={dialogType ?? "title"}
               pendingValue={
                  dialogType === "title"
                     ? pendingTitle
                     : dialogType === "description"
                       ? pendingDescription
                       : pendingKeywords.join(", ")
               }
               isLoading={isLoading}
            />
         </Card>
      );
   },
);

FileCard.displayName = "FileCard";
