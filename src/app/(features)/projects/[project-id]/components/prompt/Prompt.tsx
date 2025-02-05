"use client";

import { useState } from "react";

import { Icon } from "@components/shared/icon";
import { Textarea } from "@components/ui/textarea";
import { Toolbar } from "@features/projects/[project-id]/components/prompt/Toolbar";

import { useAutoResizeTextarea } from "@features/projects/[project-id]/hooks/useAutoResizeTextarea";
import { useAsk } from "@features/projects/[project-id]/hooks/useAsk";

import { usePromptStore } from "@features/projects/[project-id]/store/prompt";
import { useConversationStore } from "@features/projects/[project-id]/store/conversation";

import { cn } from "@utils/tailwindMerge";

import "./prompt.css";

export const Prompt = () => {
   const [focused, setFocused] = useState(false);

   const prompt = usePromptStore((state) => state.prompt);
   const updatePrompt = usePromptStore((state) => state.updatePrompt);
   const updateMessages = useConversationStore((state) => state.updateMessages);

   const { askQuestion, isLoading, error } = useAsk();

   const handleAsk = async (prompt: string) => {
      updateMessages([
         {
            id: "",
            messageDateTime: "",
            body: { content: prompt, role: "user" },
         },
      ]);
      await askQuestion({
         question: prompt,
      });
   };

   const onFocus = () => setFocused(true);
   const onBlur = () => setFocused(false);

   useAutoResizeTextarea();

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
               className="max-h-[200px] resize-none border-none bg-transparent p-2.5 text-v-grey-800/50 shadow-none outline-none placeholder:leading-6 placeholder:text-v-grey-800/50"
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
