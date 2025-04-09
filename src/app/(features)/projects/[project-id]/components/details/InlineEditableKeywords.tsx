"use client";

import React, { useState, useEffect } from "react";
import { Check, Edit, Plus, X } from "lucide-react";

import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Badge } from "@components/ui/badge";

import { useKeywordsRandomColors } from "@hooks/useKeywordsRandomColors";

interface InlineEditableKeywordsProps {
   keywords: string[];
   onSave: (keywords: string[]) => void;
   label?: string;
   maxKeywords?: number;
   maxKeywordLength?: number;
   className?: string;
   disabled?: boolean;
}

export const InlineEditableKeywords: React.FC<InlineEditableKeywordsProps> = ({
   keywords,
   onSave,
   label = "Keywords",
   maxKeywords = 10,
   maxKeywordLength = 30,
   className = "",
   disabled = false,
}) => {
   const [isEditing, setIsEditing] = useState(false);
   const [keywordsList, setKeywordsList] = useState<string[]>(keywords || []);
   const [newKeyword, setNewKeyword] = useState("");

   const { getNextColor, resetColorIndex, toCapitalize } =
      useKeywordsRandomColors();

   resetColorIndex();

   // Update keywords list when props change and not in edit mode
   useEffect(() => {
      if (!isEditing) {
         setKeywordsList(keywords || []);
      }
   }, [keywords, isEditing]);

   const handleStartEditing = () => {
      setKeywordsList(keywords || []);
      setIsEditing(true);
   };

   const handleSave = () => {
      onSave(keywordsList);
      setIsEditing(false);
   };

   const handleCancel = () => {
      setKeywordsList(keywords || []);
      setIsEditing(false);
   };

   const handleAddKeyword = () => {
      if (newKeyword.trim() && keywordsList.length < maxKeywords) {
         // Check if keyword already exists (case insensitive)
         const exists = keywordsList.some(
            (kw) => kw.toLowerCase() === newKeyword.trim().toLowerCase(),
         );

         if (!exists) {
            setKeywordsList([...keywordsList, newKeyword.trim()]);
            setNewKeyword("");
         }
      }
   };

   const handleRemoveKeyword = (index: number) => {
      const updatedKeywords = [...keywordsList];
      updatedKeywords.splice(index, 1);
      setKeywordsList(updatedKeywords);
   };

   const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
         e.preventDefault();
         handleAddKeyword();
      }
   };

   return (
      <div className={`group relative ${className}`}>
         {label && <div className="text-md mb-2 font-normal">{label}</div>}
         {isEditing ? (
            <div className="space-y-3">
               <div className="flex min-h-10 flex-wrap gap-2 rounded bg-white p-2">
                  {keywordsList.map((keyword, index) => {
                     const borderColor = getNextColor();
                     return (
                        <Badge
                           key={index}
                           variant="outline"
                           style={{ borderColor }}
                           className="flex items-center gap-1 overflow-hidden bg-white text-sm font-normal capitalize"
                        >
                           {toCapitalize(keyword)}
                           <Button
                              variant="ghost"
                              size="sm"
                              className="ml-1 h-4 w-4 p-0"
                              onClick={() => handleRemoveKeyword(index)}
                              disabled={disabled}
                           >
                              <X className="h-3 w-3" />
                           </Button>
                        </Badge>
                     );
                  })}
                  {keywordsList.length === 0 && (
                     <span className="text-xs italic text-gray-400">
                        No keywords added
                     </span>
                  )}
               </div>
               <div className="flex items-center gap-2">
                  <Input
                     value={newKeyword}
                     onChange={(e) => setNewKeyword(e.target.value)}
                     onKeyDown={handleKeyDown}
                     placeholder="Add keyword"
                     maxLength={maxKeywordLength}
                     disabled={keywordsList.length >= maxKeywords || disabled}
                     className="flex-1"
                  />
                  <Button
                     onClick={handleAddKeyword}
                     disabled={
                        !newKeyword.trim() ||
                        keywordsList.length >= maxKeywords ||
                        disabled
                     }
                     size="sm"
                  >
                     <Plus className="mr-1 h-4 w-4" /> Add
                  </Button>
               </div>
               {keywordsList.length >= maxKeywords && (
                  <p className="text-xs text-amber-600">
                     Maximum of {maxKeywords} keywords reached
                  </p>
               )}
               <div className="flex gap-2">
                  <Button size="sm" onClick={handleSave} disabled={disabled}>
                     <Check className="mr-1 h-4 w-4" /> Save
                  </Button>
                  <Button
                     size="sm"
                     variant="outline"
                     onClick={handleCancel}
                     disabled={disabled}
                  >
                     <X className="mr-1 h-4 w-4" /> Cancel
                  </Button>
               </div>
            </div>
         ) : (
            <div className="flex items-start justify-between">
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
                     <span className="italic text-gray-400">No keywords</span>
                  )}
               </div>
               <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={handleStartEditing}
                  disabled={disabled}
               >
                  <Edit className="h-4 w-4" />
               </Button>
            </div>
         )}
      </div>
   );
};
