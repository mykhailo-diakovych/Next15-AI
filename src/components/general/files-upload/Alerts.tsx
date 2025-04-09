import React from "react";
import { AlertCircle, Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert";

import { ISuccessfulFiles } from "@hooks/useFileUpload";

interface ErrorAlertProps {
   title: string;
   errors: string[] | string;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ title, errors }) => (
   <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
         {Array.isArray(errors) ? (
            errors.map((error, index) => <p key={index}>{error}</p>)
         ) : (
            <p>{errors}</p>
         )}
      </AlertDescription>
   </Alert>
);

interface FileStatusAlertProps {
   title: string;
   files: (ISuccessfulFiles | string)[];
   variant?: "default" | "destructive";
   textColorClass: string;
}

export const FileStatusAlert: React.FC<FileStatusAlertProps> = ({
   title,
   files,
   variant = "default",
   textColorClass,
}) => (
   <Alert variant={variant}>
      <Terminal className="h-4 w-4" />
      <AlertTitle className={textColorClass}>{title}</AlertTitle>
      <AlertDescription>
         {files.map((file, index) => (
            <p
               className={textColorClass}
               key={typeof file === "object" ? file.id : index}
            >
               {typeof file === "object" ? file.filename : file}
            </p>
         ))}
      </AlertDescription>
   </Alert>
);
