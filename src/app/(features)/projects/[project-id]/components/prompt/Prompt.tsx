"use client";

import { Textarea } from "@components/ui/textarea";
import "./prompt.css";
import { Icon } from "@components/shared/icon";
import { useEffect, useState } from "react";
import { cn } from "@utils/tailwindMerge";
import { Toolbar } from "@/app/(features)/projects/[project-id]/components/prompt/Toolbar";

export const Prompt = () => {
   const [focused, setFocused] = useState(false);
   const onFocus = () => setFocused(true);
   const onBlur = () => setFocused(false);

   useEffect(() => {
      document.querySelectorAll("textarea").forEach(function (textarea) {
         textarea.style.height = textarea.scrollHeight + "px";
         textarea.style.overflowY = "hidden";

         textarea.addEventListener("input", function () {
            this.style.height = "auto";
            this.style.height = this.scrollHeight + "px";
         });
      });
   }, []);

   return (
      <div
         className={cn(
            "grounded-radiants mx-auto flex min-h-[162px] w-full max-w-[768px] flex-col p-2",
            focused && "grounded-radiants-focused",
         )}
      >
         <div className="flex flex-1 items-start">
            <Icon name="stars" className="block size-10 shrink-0 p-2.5" />
            <Textarea
               className="text-v-grey-800/50 placeholder:text-v-grey-800/50 max-h-[200px] resize-none border-none bg-transparent p-2.5 shadow-none outline-none placeholder:leading-6"
               placeholder="Ask Synapse"
               style={{ boxShadow: "none" }}
               onFocus={onFocus}
               onBlur={onBlur}
            />
         </div>
         <Toolbar />
      </div>
   );
};
