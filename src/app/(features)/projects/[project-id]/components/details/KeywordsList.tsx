"use client";

import React from "react";

import { Badge } from "@components/ui/badge";

import { useKeywordsRandomColors } from "@hooks/useKeywordsRandomColors";

import { InlineEditableKeywords } from "@/app/(features)/projects/[project-id]/components/details/InlineEditableKeywords";

interface KeywordsListProps {
   keywords: string[];
   onKeywordsUpdate: (newKeywords: string[]) => void;
   isEditable?: boolean;
   isLoading?: boolean;
}

export const KeywordsList: React.FC<KeywordsListProps> = ({
   keywords,
   onKeywordsUpdate,
   isEditable,
   isLoading,
}) => {
   const { getNextColor, resetColorIndex, toCapitalize } =
      useKeywordsRandomColors();

   resetColorIndex();

   if (isEditable) {
      return (
         <div className="flex flex-col gap-2">
            <InlineEditableKeywords
               label="Keywords"
               keywords={keywords || []}
               onSave={onKeywordsUpdate}
               maxKeywords={10}
               maxKeywordLength={100}
               disabled={isLoading}
               className="w-full"
            />
         </div>
      );
   }

   return (
      <div className="flex flex-col gap-2">
         <p className="text-md font-normal">Keywords</p>
         <div className="flex flex-wrap gap-2">
            {keywords && keywords.length > 0 ? (
               keywords.map((keyword) => {
                  const borderColor = getNextColor();
                  return (
                     <Badge
                        key={keyword}
                        variant="outline"
                        style={{ borderColor }}
                        className="overflow-hidden bg-white text-sm font-normal capitalize"
                        title={toCapitalize(keyword)}
                     >
                        <span className="truncate">
                           {toCapitalize(keyword)}
                        </span>
                     </Badge>
                  );
               })
            ) : (
               <span className="text-xs italic text-gray-400">
                  No keywords added
               </span>
            )}
         </div>
      </div>
   );
};
