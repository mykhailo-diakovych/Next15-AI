'use client'

import { Textarea } from "@/components/ui/textarea";
import "./prompt.css";
import { Icon } from "@/components/shared/icon";
import { useEffect, useState } from "react";
import { cn } from "@/utils/tailwindMerge";
import { Toolbar } from "@/app/projects/[project-id]/components/prompt/Toolbar";

export const Prompt = () => {

   const [focused, setFocused] = useState(false)
   const onFocus = () => setFocused(true)
   const onBlur = () => setFocused(false)

   useEffect(() => {
      document.querySelectorAll("textarea").forEach(function (textarea) {
         textarea.style.height = textarea.scrollHeight + "px";
         textarea.style.overflowY = "hidden";

         textarea.addEventListener("input", function () {
            this.style.height = "auto";
            this.style.height = this.scrollHeight + "px";
         });
      });
   }, [])

   return <div
      className={cn('max-w-[768px] w-full mx-auto min-h-[162px] flex flex-col p-2 grounded-radiants', focused && 'grounded-radiants-focused')}
   >
      <div className="flex items-start flex-1">
         <Icon name="stars" className="size-10 block p-2.5 shrink-0" />
         <Textarea
            className="bg-transparent p-2.5 max-h-[200px] border-none text-v-grey-800/50 outline-none shadow-none resize-none placeholder:text-v-grey-800/50 placeholder:leading-6"
            placeholder="Ask Synapse"
            style={{ boxShadow: "none" }}
            onFocus={onFocus}
            onBlur={onBlur}
         />
      </div>
      <Toolbar />
   </div>;
};
