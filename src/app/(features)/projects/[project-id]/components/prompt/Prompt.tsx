"use client";

import { useEffect, useState } from "react";

import { Icon } from "@components/shared/icon";
import { Textarea } from "@components/ui/textarea";
import { Toolbar } from "@/app/(features)/projects/[project-id]/components/prompt/Toolbar";

import { usePromptStore } from "@/app/(features)/projects/[project-id]/store/prompt";

import { cn } from "@utils/tailwindMerge";

import "./prompt.css";

interface IPromptProps {
   handleAsk: (prompt: string) => Promise<void>;
}

export const Prompt = ({ handleAsk }: IPromptProps) => {
   const [focused, setFocused] = useState(false);

   const prompt = usePromptStore((state) => state.prompt);
   const updatePrompt = usePromptStore((state) => state.updatePrompt);

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
            "grounded-radiance mx-auto flex min-h-[162px] w-full max-w-[768px] flex-col p-2",
            focused && "grounded-radiance-focused",
         )}
      >
         <div className="flex flex-1 items-start">
            <Icon name="stars" className="block size-10 shrink-0 p-2.5" />
            <Textarea
               value={prompt}
               onChange={(e) => updatePrompt(e.target.value)}
               className="text-v-grey-800/50 placeholder:text-v-grey-800/50 max-h-[200px] resize-none border-none bg-transparent p-2.5 shadow-none outline-none placeholder:leading-6"
               placeholder="Ask Synapse"
               style={{ boxShadow: "none" }}
               onFocus={onFocus}
               onBlur={onBlur}
            />
         </div>
         <Toolbar onSubmit={() => handleAsk(prompt)} />
      </div>
   );
};
