import React, { useRef, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

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
import { Progress } from "@components/ui/progress";
import { FileUploadZone } from "@components/general/files-upload/FileUploadZone";
import { SelectedFilesList } from "@components/general/files-upload/SelectedFilesList";
import {
   ErrorAlert,
   FileStatusAlert,
} from "@components/general/files-upload/Alerts";
import { ProjectsIdDropdown } from "@components/general/files-upload/ProjectsIdDropdown";

import { ISuccessfulFiles, useFileUpload } from "@hooks/useFileUpload";
import { useToast } from "@hooks/use-toast";

import {
   ALLOWED_DROPZONE_FILE_TYPES,
   ALLOWED_FILE_TYPES,
   MAX_FILE_SIZE,
   MAX_FILES_COUNT,
} from "@configs/constants";

interface UploadResults {
   successfulFiles: ISuccessfulFiles[];
   failedFiles: string[];
   existingFiles: string[];
}

interface ErrorState {
   fileErrors: string[];
   fileLimitError: string | null;
}

interface IFilesUploadDialogProps {
   open: boolean;
   setOpen: (open: boolean) => void;
   showProjectDropdown?: boolean;
}

export const FilesUploadDialog = ({
   open = false,
   setOpen,
   showProjectDropdown = true,
}: IFilesUploadDialogProps) => {
   // State management
   const [uploadResults, setUploadResults] = useState<UploadResults>({
      successfulFiles: [],
      failedFiles: [],
      existingFiles: [],
   });
   const [errors, setErrors] = useState<ErrorState>({
      fileErrors: [],
      fileLimitError: null,
   });

   const fileInputRef = useRef<HTMLInputElement>(null);

   const { toast } = useToast();

   // File upload hook
   const {
      handleFileSelect,
      uploadFiles,
      clearFiles,
      selectedFiles,
      isUploading,
      progress,
      validationErrors,
      projectId,
      setProjectId,
   } = useFileUpload({
      onSuccess: (data) => {
         setUploadResults({
            successfulFiles: data.metadata.successful || [],
            failedFiles: data.metadata.failed || [],
            existingFiles: data.metadata.existing || [],
         });
      },
      onError: (error) => {
         toast({
            title: "Upload failed",
            description: error.message,
            variant: "destructive",
         });
      },
   });

   // Check if adding files would exceed the maximum count
   const wouldExceedFileLimit = useCallback(
      (newFilesCount: number): boolean => {
         return newFilesCount + selectedFiles.length > MAX_FILES_COUNT;
      },
      [selectedFiles.length],
   );

   // Handle file size validation
   const validateFileSize = (files: File[]): File[] => {
      const validFiles = files.filter((file) => file.size <= MAX_FILE_SIZE);
      const oversizeFiles = files.filter((file) => file.size > MAX_FILE_SIZE);

      if (oversizeFiles.length > 0) {
         setErrors((prev) => ({
            ...prev,
            fileErrors: oversizeFiles.map(
               (file) =>
                  `${file.name} exceeds the ${MAX_FILE_SIZE / (1024 * 1024)}MB limit (${(file.size / 1024 / 1024).toFixed(2)}MB)`,
            ),
         }));
      } else {
         setErrors((prev) => ({ ...prev, fileErrors: [] }));
      }

      return validFiles;
   };

   // Handle dropzone file drop
   const onDrop = useCallback(
      (acceptedFiles: File[]) => {
         if (wouldExceedFileLimit(acceptedFiles.length)) {
            setErrors((prev) => ({
               ...prev,
               fileLimitError: `You can upload a maximum of ${MAX_FILES_COUNT} files.`,
            }));
            return;
         }

         setErrors((prev) => ({ ...prev, fileLimitError: null }));
         setUploadResults({
            successfulFiles: [],
            failedFiles: [],
            existingFiles: [],
         });
         const validFiles = validateFileSize(acceptedFiles);

         if (validFiles.length > 0) {
            handleFileSelect(validFiles);
         }
      },
      [handleFileSelect, wouldExceedFileLimit],
   );

   // Dropzone configuration
   const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: ALLOWED_DROPZONE_FILE_TYPES,
      multiple: true,
      maxSize: MAX_FILE_SIZE,
   });

   // Handle conventional file input change
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
         if (wouldExceedFileLimit(e.target.files.length)) {
            setErrors((prev) => ({
               ...prev,
               fileLimitError: `You can upload a maximum of ${MAX_FILES_COUNT} files.`,
            }));
            return;
         }

         setErrors((prev) => ({ ...prev, fileLimitError: null }));
         handleFileSelect(Array.from(e.target.files));
         setUploadResults({
            successfulFiles: [],
            failedFiles: [],
            existingFiles: [],
         });
      }
   };

   // Handle file upload submission
   const handleUpload = () => {
      if (selectedFiles.length === 0) {
         toast({
            title: "No files selected",
            description: "Please select at least one file to upload.",
            variant: "destructive",
         });
         return;
      }
      uploadFiles();
   };

   // Handle clearing files and errors
   const handleClear = () => {
      if (fileInputRef.current) {
         fileInputRef.current.value = "";
      }
      clearFiles();
      setErrors({ fileErrors: [], fileLimitError: null });
   };

   const { successfulFiles, failedFiles, existingFiles } = uploadResults;
   const { fileErrors, fileLimitError } = errors;

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogContent className="max-w-3xl">
            <DialogHeader>
               <DialogTitle className="text-base font-medium">
                  Upload Files
               </DialogTitle>
               <DialogDescription>
                  Select the files you would like to upload.
               </DialogDescription>
               {showProjectDropdown && (
                  <ProjectsIdDropdown
                     projectId={projectId}
                     setProjectId={setProjectId}
                  />
               )}
            </DialogHeader>
            <div className="grid gap-4 py-4">
               <div className="space-y-2">
                  <Label>Files</Label>

                  {/* Drag-and-Drop Zone */}
                  <FileUploadZone
                     getRootProps={getRootProps}
                     getInputProps={getInputProps}
                     isDragActive={isDragActive}
                  />

                  {/* Classic File Input */}
                  <Input
                     id="files"
                     type="file"
                     multiple
                     accept={ALLOWED_FILE_TYPES}
                     ref={fileInputRef}
                     onChange={handleChange}
                     disabled={isUploading}
                     className="hidden"
                  />

                  {/* Selected Files List */}
                  {selectedFiles.length > 0 && (
                     <SelectedFilesList files={selectedFiles} />
                  )}

                  {/* Error Displays */}
                  {fileErrors.length > 0 && (
                     <ErrorAlert title="File Size Error" errors={fileErrors} />
                  )}

                  {fileLimitError && (
                     <ErrorAlert
                        title="File Limit Error"
                        errors={fileLimitError}
                     />
                  )}

                  {/* Upload Progress */}
                  {isUploading && (
                     <div className="mt-2">
                        <Label className="text-xs">Upload Progress</Label>
                        <Progress value={progress} className="h-2 w-full" />
                        <p className="mt-1 text-xs text-gray-500">
                           {progress}%
                        </p>
                     </div>
                  )}

                  {/* Validation Errors */}
                  {validationErrors && (
                     <ErrorAlert
                        title="Validation Error"
                        errors={validationErrors.split("\n")}
                     />
                  )}

                  {/* Success and Failure Alerts */}
                  {successfulFiles.length > 0 && (
                     <FileStatusAlert
                        title="Successfully uploaded files:"
                        files={successfulFiles}
                        textColorClass="text-green-500"
                     />
                  )}

                  {failedFiles.length > 0 && (
                     <FileStatusAlert
                        title="Failed to upload files:"
                        files={failedFiles}
                        variant="destructive"
                        textColorClass="text-red-500"
                     />
                  )}

                  {existingFiles.length > 0 && (
                     <FileStatusAlert
                        title="Files already exist:"
                        files={existingFiles}
                        textColorClass="text-yellow-500"
                     />
                  )}
               </div>
            </div>
            <DialogFooter className="flex flex-row justify-between sm:justify-between">
               <Button
                  type="button"
                  variant="outline"
                  onClick={handleClear}
                  disabled={isUploading || selectedFiles.length === 0}
               >
                  Clear
               </Button>
               <Button
                  type="submit"
                  onClick={handleUpload}
                  disabled={isUploading || selectedFiles.length === 0}
               >
                  {isUploading ? "Uploading..." : "Upload"}
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
};
