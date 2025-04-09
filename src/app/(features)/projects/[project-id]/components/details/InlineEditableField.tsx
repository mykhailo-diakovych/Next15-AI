"use client";
import React, { useState, useRef, useEffect } from "react";
import { Check, Edit, X } from "lucide-react";

import { toast } from "@/hooks/use-toast";

import { Button } from "../../../../../../components/ui/button";
import { Input } from "../../../../../../components/ui/input";
import { Textarea } from "../../../../../../components/ui/textarea";

interface InlineEditableFieldProps {
   value: string;
   onSave: (value: string) => void;
   label?: string;
   multiline?: boolean;
   maxLength?: number;
   maxWords?: number;
   className?: string;
   disabled?: boolean;
}

export const InlineEditableField: React.FC<InlineEditableFieldProps> = ({
   value,
   onSave,
   multiline = false,
   maxLength,
   maxWords,
   className = "",
   disabled = false,
}) => {
   const [isEditing, setIsEditing] = useState(false);
   const [editValue, setEditValue] = useState(value);
   const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
   useEffect(() => {
      if (isEditing && inputRef.current) {
         inputRef.current.focus();
      }
   }, [isEditing]);

   useEffect(() => {
      if (!isEditing) {
         setEditValue(value);
      }
   }, [value, isEditing]);

   const handleSave = () => {
      if (maxWords) {
         const wordCount = editValue.trim().split(/\s+/).filter(Boolean).length;
         if (wordCount > maxWords) {
            toast({
               title: "Word limit exceeded",
               description: `Please keep your response under ${maxWords} words`,
            });
            return;
         }
      }
      onSave(editValue);
      setIsEditing(false);
   };
   const handleCancel = () => {
      setEditValue(value);
      setIsEditing(false);
   };
   const wordCount = maxWords
      ? editValue.trim().split(/\s+/).filter(Boolean).length
      : 0;
   const isWordCountExceeded = maxWords ? wordCount > maxWords : false;
   return (
      <div
         className={`group relative w-full min-w-0 overflow-hidden ${className}`}
      >
         {isEditing ? (
            <div className="w-full space-y-2">
               {multiline ? (
                  <Textarea
                     ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                     value={editValue}
                     onChange={(e) => setEditValue(e.target.value)}
                     maxLength={maxLength}
                     className={`min-h-[150px] w-full ${isWordCountExceeded ? "border-red-500" : ""}`}
                     disabled={disabled}
                     name="editText"
                     style={{
                        resize: "vertical",
                        overflow: "auto",
                     }}
                     rows={Math.max(5, editValue.split("\n").length || 1)}
                  />
               ) : (
                  <Input
                     ref={inputRef as React.RefObject<HTMLInputElement>}
                     value={editValue}
                     onChange={(e) => setEditValue(e.target.value)}
                     maxLength={maxLength}
                     disabled={disabled}
                     name="editText"
                     className="w-[95%]"
                  />
               )}

               {maxWords && (
                  <div
                     className={`text-xs ${isWordCountExceeded ? "text-red-500" : "text-gray-500"}`}
                  >
                     {wordCount}/{maxWords} words
                  </div>
               )}

               <div className="flex gap-2">
                  <Button
                     size="sm"
                     onClick={handleSave}
                     disabled={isWordCountExceeded || disabled}
                  >
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
            <div className="flex w-full items-start justify-between">
               <div
                  className={`${multiline ? "" : "truncate"} ${!value ? "italic text-gray-400" : ""}`}
               >
                  {value || "Not specified"}
               </div>
               <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={() => setIsEditing(true)}
                  disabled={disabled}
               >
                  <Edit className="h-4 w-4" />
               </Button>
            </div>
         )}
      </div>
   );
};
