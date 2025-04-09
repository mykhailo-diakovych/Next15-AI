import { usePromptStore } from "@features/projects/[project-id]/store/prompt";
import { useConversationStore } from "@features/projects/[project-id]/store/conversation";

import { Button } from "@components/ui/button";
// import { Input } from "@components/ui/input";
import { Icon } from "@components/shared/icon";

import { cn } from "@utils/tailwindMerge";

interface IToolbarProps {
   onSubmit: () => void;
   collapsed: boolean;
   comparingDocsDisablingRule: boolean;
}

export const Toolbar = ({
   onSubmit,
   collapsed,
   comparingDocsDisablingRule,
}: IToolbarProps) => {
   const prompt = usePromptStore((state) => state.prompt);

   const isLoading = useConversationStore((state) => state.isLoading);

   return (
      <div
         className={cn(
            "flex w-full items-center justify-between px-3.5 pb-3.5 pt-1",
            { "w-auto justify-end bg-white-smoke p-0 pr-3.5": collapsed },
         )}
      >
         {!collapsed && (
            <div className="flex items-center justify-center gap-2.5">
               {/*<Button*/}
               {/*   variant="ghost"*/}
               {/*   className="flex size-8 items-center justify-center bg-gray-100 p-0"*/}
               {/*>*/}
               {/*   <Icon name="web" className="!size-5 shrink-0" />*/}
               {/*</Button>*/}
               {/*<label>*/}
               {/*   <Button*/}
               {/*      variant="ghost"*/}
               {/*      className="flex size-8 items-center justify-center bg-gray-100 p-0"*/}
               {/*   >*/}
               {/*      <Icon name="attachment" className="!size-5 shrink-0" />*/}
               {/*   </Button>*/}
               {/*   <Input type="file" className="hidden" />*/}
               {/*</label>*/}
            </div>
         )}

         <Button
            variant="ghost"
            onClick={onSubmit}
            disabled={!prompt.trim() || isLoading || comparingDocsDisablingRule}
            className="prompt-button size-8 rounded-none"
         >
            <div
               className={cn(
                  "flex size-6 items-center justify-center bg-white p-0",
                  { "bg-white-smoke": collapsed },
               )}
            >
               <Icon name="send" className="!size-3 shrink-0" />
            </div>
         </Button>
      </div>
   );
};
