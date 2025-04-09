import React from "react";

interface SelectedFilesListProps {
   files: File[];
}

export const SelectedFilesList: React.FC<SelectedFilesListProps> = ({
   files,
}) => (
   <div className="mt-2">
      <p className="text-sm text-gray-500">{files.length} file(s) selected</p>
      <ul className="mt-1 max-h-24 overflow-y-auto text-xs text-gray-500">
         {files.map((file, index) => (
            <li key={index} className="truncate">
               {file.name} ({Math.round(file.size / 1024)} KB)
            </li>
         ))}
      </ul>
   </div>
);
