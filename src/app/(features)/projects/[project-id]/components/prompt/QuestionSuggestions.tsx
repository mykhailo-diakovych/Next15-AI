import React, { useMemo } from "react";

import { usePromptStore } from "@features/projects/[project-id]/store/prompt";

import { getUser } from "@auth/utils/getUser";

import { Button } from "@components/ui/button";

import { cn } from "@utils/tailwindMerge";

import { ORGANIZATION_CONFIGS, ORGANIZATIONS } from "@configs/constants";

interface QuestionSuggestionsProps {
   isNewConversation: boolean;
   collapsed: boolean;
}

export const QuestionSuggestions = ({
   isNewConversation,
   collapsed,
}: QuestionSuggestionsProps) => {
   const prompt = usePromptStore((state) => state.prompt);
   const followups = usePromptStore((state) => state.followups);
   const updatePrompt = usePromptStore((state) => state.updatePrompt);
   const setIsFocused = usePromptStore((state) => state.setIsFocused);

   const sessionUser = getUser();

   const { prompts: defaultQuestions } =
      ORGANIZATION_CONFIGS[sessionUser?.organizationId] ??
      ORGANIZATION_CONFIGS[ORGANIZATIONS.OCEANEERING];

   // Determine which questions to show
   const questions = isNewConversation
      ? followups.length > 0
         ? followups // Show followups if they exist in new conversation
         : defaultQuestions // Show defaults in new conversation
      : followups; // In existing conversations, only show followups

   // Generate random angles once per question
   const randomAngles = useMemo(() => {
      return questions.map(() => Math.random() * 360);
   }, [questions]);

   const handleClick = (question: string) => {
      updatePrompt(`${prompt} ${question}`);
      setIsFocused(true);
   };

   return (
      <div
         className={cn(
            "no-scrollbar flex max-w-2xl animate-fade-in gap-2 overflow-y-auto",
            { "max-w-[46rem]": collapsed },
         )}
         key={followups.length}
      >
         {questions.map((question, i) => {
            const randomX = randomAngles[i];

            return (
               <Button
                  key={i}
                  variant="ghost"
                  className={cn(
                     "rounded bg-white/20 px-6 py-4 text-xs font-normal text-white backdrop-blur-3xl",
                     {
                        "h-auto py-3 text-white hover:text-white": collapsed,
                     },
                  )}
                  style={{
                     background: collapsed
                        ? `linear-gradient(${randomX}deg, #1ba19f 0%, #121512 20%, #131512 80%, #3aa11b 100%)`
                        : undefined,
                  }}
                  onClick={() => handleClick(question)}
               >
                  <span>{question}</span>
               </Button>
            );
         })}
      </div>
   );
};
