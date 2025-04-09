import React from "react";
import { UploadCloud } from "lucide-react";

import { MAX_FILE_SIZE, MAX_FILES_COUNT } from "@configs/constants";

interface FileUploadZoneProps {
   getRootProps: () => React.HTMLAttributes<HTMLDivElement>;
   getInputProps: () => React.InputHTMLAttributes<HTMLInputElement>;
   isDragActive: boolean;
}

export const FileUploadZone: React.FC<FileUploadZoneProps> = ({
   getRootProps,
   getInputProps,
   isDragActive,
}) => (
   <div
      {...getRootProps()}
      className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 text-center transition ${
         isDragActive ? "bg-green-100 text-green-500" : "border-gray-300"
      }`}
   >
      <input {...getInputProps()} />
      <UploadCloud className="h-8 w-8 text-gray-500" />
      {isDragActive ? (
         <p className="text-sm text-green-500">Drop files here...</p>
      ) : (
         <div className="flex flex-col gap-px">
            <p className="font-medium text-muted-foreground">
               Drag and drop files here, or click to select files
            </p>
            <p className="text-sm text-muted-foreground/70">
               You can upload a maximum of {MAX_FILES_COUNT} PDF files (up to{" "}
               {MAX_FILE_SIZE / (1024 * 1024)}MB each)
            </p>
         </div>
      )}
   </div>
);
