import Link from "next/link";

import { Icon } from "@components/shared/icon";
import { Button } from "@components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { Input } from "@components/ui/input";

import { usePromptStore } from "@/app/(features)/projects/[project-id]/store/prompt";

interface IToolbarProps {
   onSubmit: (inputText: string) => void;
}

export const Toolbar = ({ onSubmit }: IToolbarProps) => {
   const prompt = usePromptStore((state) => state.prompt);

   return (
      <div className="flex items-center justify-between">
         <DropdownMenu>
            <DropdownMenuTrigger className="border-v-grey-300 flex h-10 min-w-52 items-center justify-between gap-x-3 rounded-sm border px-4 py-2 focus-within:outline-none">
               <span className="text-sm">Project Puffin</span>
               <div className="flex items-center gap-x-2">
                  <span className="border-v-grey-300 flex size-6 items-center justify-center rounded-full border">
                     <Icon name="prompt-select" className="size-3" />
                  </span>
                  <Icon name="arrow" className="h-1 w-2" />
               </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-52">
               <DropdownMenuLabel>Select a model</DropdownMenuLabel>
               <DropdownMenuSeparator />
               <DropdownMenuItem>
                  <Link href="/public">o3</Link>
               </DropdownMenuItem>
               <DropdownMenuItem>
                  <Link href="/public">o4</Link>
               </DropdownMenuItem>
               <DropdownMenuItem>
                  <Link href="/public">o5</Link>
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
         <div className="flex items-center gap-x-2">
            <Button className="flex size-10 h-auto items-center justify-center bg-transparent p-0 shadow-none hover:bg-transparent">
               <Icon name="micro" className="!size-5 shrink-0" />
            </Button>
            <Button className="flex size-10 h-auto items-center justify-center bg-transparent p-0 shadow-none hover:bg-transparent">
               <Icon name="web" className="!size-5 shrink-0" />
            </Button>
            <label>
               <div className="flex size-10 h-auto cursor-pointer items-center justify-center bg-transparent p-0 shadow-none hover:bg-transparent">
                  <Icon name="attachment" className="size-5" />
               </div>
               <Input type="file" className="hidden" />
            </label>
            <Button
               onClick={() => onSubmit(prompt)}
               disabled={!prompt.trim()}
               className="bg-v-green-500 hover:bg-v-green-500/80 size-10 rounded-md p-0 shadow-none"
            >
               <Icon name="send" className="size-5" />
            </Button>
         </div>
      </div>
   );
};
