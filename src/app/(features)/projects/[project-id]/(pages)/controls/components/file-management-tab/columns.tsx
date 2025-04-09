"use client";

import React from "react";
import { format, parseISO } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, Settings2 } from "lucide-react";

import { IDocument } from "@features/projects/[project-id]/interfaces/docs";

import { Icon } from "@components/shared/icon";
import { Button } from "@components/ui/button";
import { Badge } from "@components/ui/badge";
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@components/ui/tooltip";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@components/ui/popover";

import { useKeywordsRandomColors } from "@hooks/useKeywordsRandomColors";

import { cn } from "@utils/tailwindMerge";

export type IDoc = Omit<IDocument, "createdDate"> & {
   dates: {
      createdAt: string;
      updatedAt?: string;
   };
};

// Filename Cell Component
const FilenameCellComponent: React.FC<{
   filename: string;
}> = ({ filename }) => {
   return (
      <div className="grid min-w-40 max-w-52 content-start overflow-hidden">
         <TooltipProvider>
            <Tooltip>
               <TooltipTrigger className="max-w-full truncate">
                  <div className="flex items-center gap-1.5">
                     <Icon name="pdf-file" className="size-5" />
                     <span className="truncate">{filename}</span>
                  </div>
               </TooltipTrigger>
               <TooltipContent>
                  <span>{filename}</span>
               </TooltipContent>
            </Tooltip>
         </TooltipProvider>
      </div>
   );
};

// Title Cell Component
const TitleCellComponent: React.FC<{ title: string }> = ({ title }) => (
   <div className="min-w-24 max-w-32 overflow-hidden">
      <TooltipProvider>
         <Tooltip>
            <TooltipTrigger className="max-w-full truncate text-sm font-medium">
               {title}
            </TooltipTrigger>
            <TooltipContent>
               <p className="min-w-24 text-sm font-medium">{title}</p>
            </TooltipContent>
         </Tooltip>
      </TooltipProvider>
   </div>
);

// Keywords Cell Component
const KeywordsCellComponent: React.FC<{ keywords: string[] }> = ({
   keywords,
}) => {
   const { getNextColor, resetColorIndex, toCapitalize } =
      useKeywordsRandomColors();

   resetColorIndex();

   return (
      <div className="flex min-w-52 max-w-60 flex-wrap items-center gap-1">
         {keywords && keywords.length > 0 && (
            <>
               {keywords.slice(0, 5).map((keyword, i) => {
                  const borderColor = getNextColor();
                  return (
                     <Badge
                        key={`${keyword}${i}`}
                        variant="outline"
                        style={{ borderColor }}
                        className="cursor-default overflow-hidden bg-white p-3 text-xs font-normal"
                        title={keyword}
                     >
                        <span>{toCapitalize(keyword)}</span>
                     </Badge>
                  );
               })}
               {keywords.length > 5 && (
                  <Popover>
                     <PopoverTrigger>
                        <Badge
                           variant="secondary"
                           className="cursor-pointer bg-gray-100 p-3 text-xs font-normal"
                        >
                           +{keywords.length - 5}
                        </Badge>
                     </PopoverTrigger>
                     <PopoverContent>
                        <div className="grid grid-cols-2 gap-1">
                           {keywords.slice(5, keywords.length).map((k, i) => {
                              const borderColor = getNextColor();
                              return (
                                 <Badge
                                    key={`${k}${i}`}
                                    variant="outline"
                                    style={{ borderColor }}
                                    className="cursor-default overflow-hidden bg-white p-3 text-center text-xs font-normal"
                                    title={k}
                                 >
                                    <span>{toCapitalize(k)}</span>
                                 </Badge>
                              );
                           })}
                        </div>
                     </PopoverContent>
                  </Popover>
               )}
            </>
         )}
      </div>
   );
};

// Description Cell Component
const DescriptionCellComponent: React.FC<{ description: string }> = ({
   description,
}) => (
   <div className="group relative">
      <p className="min-w-64 max-w-xs pr-8 text-sm">{description}</p>
   </div>
);

// Dates Cell Component
const DatesCellComponent: React.FC<{ dates: IDoc["dates"] }> = ({ dates }) => (
   <div className="flex flex-col items-start justify-center gap-1">
      <p className="max-w-xs text-sm">
         <span className="text-old-silver">Created: </span>
         {format(parseISO(dates.createdAt), "dd.MM.yyyy")}
      </p>
      <p className="max-w-xs text-sm">
         <span className="text-old-silver">Updated: </span>
         {format(parseISO(dates.updatedAt || dates.createdAt), "dd.MM.yyyy")}
      </p>
   </div>
);

// Sortable Header Component
const SortableHeader: React.FC<{
   column: any;
   title: string;
}> = ({ column, title }) => (
   <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
   >
      {title}
      <ChevronDown
         className={cn("size-3", {
            "rotate-180": column.getIsSorted() === "asc",
         })}
      />
   </Button>
);

// Main Columns Definition
export const columns: ColumnDef<IDoc>[] = [
   {
      accessorKey: "filename",
      header: ({ column }) => <SortableHeader column={column} title="File" />,
      cell: ({ row }) => (
         <FilenameCellComponent filename={row.getValue("filename")} />
      ),
   },
   {
      accessorKey: "title",
      header: ({ column }) => <SortableHeader column={column} title="Title" />,
      cell: ({ row }) => <TitleCellComponent title={row.getValue("title")} />,
   },
   {
      accessorKey: "keywords",
      header: "Keywords",
      cell: ({ row }) => (
         <KeywordsCellComponent keywords={row.getValue("keywords")} />
      ),
   },
   {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
         <DescriptionCellComponent description={row.getValue("description")} />
      ),
   },
   {
      accessorKey: "dates",
      header: ({ column }) => <SortableHeader column={column} title="Dates" />,
      cell: ({ row }) => <DatesCellComponent dates={row.getValue("dates")} />,
   },
   {
      id: "actions",
      cell: () => (
         <Button
            variant="link"
            className="flex items-center gap-1 text-lime-600"
         >
            <span className="text-sm font-normal">Edit</span>
            <Settings2 className="size-4" />
         </Button>
      ),
   },
];
