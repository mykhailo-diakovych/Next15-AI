import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { z } from "zod";
import { useLocalStorage } from "@uidotdev/usehooks";

import { getUser } from "@auth/utils/getUser";

import { api } from "@configs/api";
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from "@configs/constants";
import { STORAGE_KEYS } from "@configs/storage-keys";

// Define validation schema using Zod
const fileSchema = z.object({
   name: z.string(),
   size: z.number().max(MAX_FILE_SIZE, { message: "File size exceeds 16MB" }),
   type: z
      .string()
      .refine(
         (type) =>
            ALLOWED_FILE_TYPES.split(",").some((ext) =>
               type.includes(ext.replace(".", "")),
            ),
         { message: "Unsupported file type" },
      ),
});

export interface ISuccessfulFiles {
   id: string;
   filename: string;
   type: string;
   size: number;
   description: string;
   title: string;
   keywords: string[];
   documentDate: string | null;
   uploadedFileId: string;
   createdDate: string;
   organizationId: string;
   organizationName: string;
}

interface IFileUploadMetadata {
   successful: ISuccessfulFiles[];
   failed: string[];
   existing: string[];
}

interface IFileUploadResponse {
   success: boolean;
   message: string;
   metadata: IFileUploadMetadata;
}

interface IUseFileUploadOptions {
   onSuccess?: (data: IFileUploadResponse) => void;
   onError?: (error: Error) => void;
}

interface IUploadFilesParams {
   files: File[];
   projectId: string;
}

export const useFileUpload = (options?: IUseFileUploadOptions) => {
   const [storedProjectId] = useLocalStorage<string>(STORAGE_KEYS.projectId);

   const [progress, setProgress] = useState<number>(0);
   const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
   const [projectId, setProjectId] = useState(storedProjectId ?? "");
   const [validationErrors, setValidationErrors] = useState<string | null>(
      null,
   );

   const uploadFileMutation = useMutation({
      mutationFn: async ({ files, projectId }: IUploadFilesParams) => {
         const user = getUser();
         if (!user || !user.organizationId) {
            throw new Error(
               "Unauthorized. Please log in or select an organization.",
            );
         }

         if (!projectId) {
            throw new Error("No project selected. Please select a project.");
         }

         try {
            const formData = new FormData();
            files.forEach((file) => formData.append("file", file));
            formData.append("organizationId", user.organizationId);
            formData.append("userId", user.id);
            formData.append("sessionId", user.sessionId);
            formData.append("projectId", projectId);
            setProgress(5); // Initial progress

            let intervalId: NodeJS.Timeout | null = null;

            const { data } = await api.post<IFileUploadResponse>(
               "/upload",
               formData,
               {
                  headers: {
                     "Content-Type": "multipart/form-data",
                     "x-user-id": user.id,
                     "x-session-id": user.sessionId,
                  },
                  onUploadProgress: (progressEvent) => {
                     if (progressEvent.total) {
                        // Calculate upload progress and cap at 90%
                        const uploadPercent = Math.round(
                           (progressEvent.loaded * 100) / progressEvent.total,
                        );
                        const adjustedPercent = Math.min(uploadPercent, 90);
                        setProgress(adjustedPercent);

                        // Start interval when upload completes
                        if (uploadPercent === 100 && !intervalId) {
                           intervalId = setInterval(() => {
                              setProgress((prev) => {
                                 if (prev >= 90 && prev < 99) {
                                    return prev + 1;
                                 } else {
                                    if (intervalId) clearInterval(intervalId);
                                    return prev;
                                 }
                              });
                           }, 1000);
                        }
                     }
                  },
               },
            );

            if (intervalId) {
               clearInterval(intervalId);
            }

            return data;
         } catch (error) {
            throw error instanceof Error
               ? error
               : new Error("An unknown error occurred during file upload");
         }
      },
      onSuccess: (data) => {
         setProgress(100);
         setSelectedFiles([]);
         setValidationErrors(null);
         options?.onSuccess?.(data);
      },
      onError: (error) => {
         setProgress(0);
         options?.onError?.(error);
      },
   });
   // Handle file selection with validation
   const handleFileSelect = (files: File[] | null) => {
      if (!files || files.length === 0) return;

      const validatedFiles: File[] = [];
      const errors: string[] = [];

      Array.from(files).forEach((file) => {
         const validation = fileSchema.safeParse({
            name: file.name,
            size: file.size,
            type: file.type,
         });

         if (validation.success) {
            validatedFiles.push(file);
         } else {
            errors.push(
               `${file.name}: ${validation.error.issues
                  .map((issue) => issue.message)
                  .join(", ")}`,
            );
         }
      });

      if (errors.length > 0) {
         setValidationErrors(errors.join("\n"));
      } else {
         setValidationErrors(null);
         setSelectedFiles(validatedFiles);
      }
   };

   // Upload files
   const uploadFiles = () => {
      if (selectedFiles.length > 0) {
         uploadFileMutation.mutate({ files: selectedFiles, projectId });
      }
   };

   // Clear files
   const clearFiles = () => {
      setSelectedFiles([]);
      setValidationErrors(null);
   };

   return {
      uploadFiles,
      handleFileSelect,
      clearFiles,
      selectedFiles,
      setProjectId,
      projectId,
      isUploading: uploadFileMutation.isPending,
      isSuccess: uploadFileMutation.isSuccess,
      isError: uploadFileMutation.isError,
      error: uploadFileMutation.error,
      progress,
      response: uploadFileMutation.data,
      validationErrors,
   };
};
