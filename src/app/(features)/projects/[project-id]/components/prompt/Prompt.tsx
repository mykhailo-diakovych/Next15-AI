"use client";

import { KeyboardEvent } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";

import { Toolbar } from "@features/projects/[project-id]/components/prompt/Toolbar";
import { QuestionSuggestions } from "@features/projects/[project-id]/components/prompt/QuestionSuggestions";
import { useAsk } from "@features/projects/[project-id]/hooks/useAsk";
import { usePromptStore } from "@features/projects/[project-id]/store/prompt";
import { useConversationStore } from "@features/projects/[project-id]/store/conversation";
import { useAnalyzeStore } from "@features/projects/[project-id]/store/analyze";
import { RelevantDocsCounter } from "@features/projects/[project-id]/components/relevant-docs/RelevantDocsCounter";

import { getUser } from "@auth/utils/getUser";

import { Textarea } from "@components/ui/textarea";

import { cn } from "@utils/tailwindMerge";

import { STORAGE_KEYS } from "@configs/storage-keys";
import { ORGANIZATION_CONFIGS, ORGANIZATIONS } from "@configs/constants";

import "./prompt.css";

export const Prompt = () => {
   const [projectId] = useLocalStorage<string>(STORAGE_KEYS.projectId);

   const prompt = usePromptStore((state) => state.prompt);
   const updatePrompt = usePromptStore((state) => state.updatePrompt);
   const followups = usePromptStore((state) => state.followups);
   const isFocused = usePromptStore((state) => state.isFocused);
   const setIsFocused = usePromptStore((state) => state.setIsFocused);

   const addMessages = useConversationStore((state) => state.addMessages);
   const messages = useConversationStore((state) => state.messages);
   const isLoading = useConversationStore((state) => state.isLoading);

   const isComparingDocsOpened = useAnalyzeStore(
      (state) => state.isComparingDocsOpened,
   );
   const selectedDocs = useAnalyzeStore((state) => state.selectedDocs);
   const comparingDocsDisablingRule =
      isComparingDocsOpened &&
      (selectedDocs.length < 2 || selectedDocs.length > 5);

   const isNewConversation = !(messages?.length && messages.length >= 2);

   const user = getUser();

   const { project } =
      ORGANIZATION_CONFIGS[user?.organizationId] ??
      ORGANIZATION_CONFIGS[ORGANIZATIONS.OCEANEERING];

   const { askQuestion } = useAsk({ projectId });

   const handleAsk = async () => {
      addMessages([
         {
            id: new Date().toDateString(),
            messageDateTime: "",
            body: { content: prompt, role: "user" },
         },
         {
            id: new Date().toDateString() + "assistant",
            messageDateTime: "",
            body: { content: "", role: "assistant" },
         },
      ]);

      askQuestion({ question: prompt });
   };

   const handleTextareaKeyDown = async (
      e: KeyboardEvent<HTMLTextAreaElement>,
   ) => {
      // Handle Cmd+Enter/Ctrl+Enter for new line
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
         e.preventDefault();
         const textarea = e.currentTarget;

         // Fallback to manual insertion
         const { selectionStart, selectionEnd, value } = textarea;
         textarea.value =
            value.substring(0, selectionStart) +
            "\n" +
            value.substring(selectionEnd);
         textarea.selectionStart = textarea.selectionEnd = selectionStart + 1;

         // Ensure focus remains on textarea
         textarea.focus();

         return;
      }

      // Handle plain Enter for sending
      if (e.key === "Enter" && !e.shiftKey) {
         e.preventDefault(); // Prevent new line

         if (!prompt.trim() || isLoading || comparingDocsDisablingRule) return;

         await handleAsk();
      }
   };

   return (
      <div
         className={cn(
            "textarea-wrapper flex h-full w-full items-center justify-center overflow-hidden rounded bg-black-bean",
            {
               focused: isFocused && !messages,
               collapsed: !!messages && followups.length > 0,
               "collapsed-no-followups": !!messages && followups.length === 0,
            },
         )}
      >
         {/* SVG filter for the goo effect */}
         <svg className="svg-filter" xmlns="http://www.w3.org/2000/svg">
            <defs>
               <filter id="goo">
                  <feGaussianBlur
                     in="SourceGraphic"
                     stdDeviation="10"
                     result="blur"
                  />
                  <feColorMatrix
                     in="blur"
                     mode="matrix"
                     values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                     result="goo"
                  />
                  <feBlend in="SourceGraphic" in2="goo" />
               </filter>
            </defs>
         </svg>

         {/* Only show the gradient animation when there are no messages */}
         {!messages && (
            <div className="gradients-container">
               <div className="g1"></div>
               <div className="g2"></div>
               <div className="g3"></div>
               <div className="g4"></div>
            </div>
         )}

         <div
            className={cn(
               "flex w-full max-w-[44rem] flex-col items-center justify-center gap-5",
               {
                  "max-w-3xl gap-3": !!messages,
               },
            )}
         >
            {!(isFocused && !messages) && (
               <QuestionSuggestions
                  key={followups.length}
                  isNewConversation={isNewConversation}
                  collapsed={!!messages}
               />
            )}

            <div
               className={cn("textarea diagonal-corners rounded", {
                  "flex justify-between": !!messages,
               })}
            >
               <Textarea
                  value={prompt}
                  onChange={(e) => updatePrompt(e.target.value)}
                  className={cn(
                     "no-scrollbar w-full max-w-[44rem] resize-none overflow-y-auto rounded border-0 bg-white px-6 pb-0.5 pt-5 shadow-none outline-none",
                     "focus:!border-0 focus:!shadow-none focus:!outline-none focus:!ring-0 focus:!ring-offset-0",
                     {
                        "max-w-3xl bg-white-smoke pr-3.5 pt-3": !!messages,
                     },
                  )}
                  placeholder={
                     comparingDocsDisablingRule
                        ? "Please select a minimum of two files to compare"
                        : `Ask ${project}`
                  }
                  onFocus={() => setIsFocused(true)}
                  onKeyDown={handleTextareaKeyDown}
               />

               {selectedDocs.length > 0 && (
                  <div
                     className={cn("absolute bottom-3.5 right-14", {
                        "flex items-center bg-white-smoke pr-2": !!messages,
                     })}
                  >
                     <RelevantDocsCounter />
                  </div>
               )}

               <Toolbar
                  onSubmit={handleAsk}
                  collapsed={!!messages}
                  comparingDocsDisablingRule={comparingDocsDisablingRule}
               />
            </div>
         </div>
      </div>
   );
};
