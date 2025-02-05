import { Icon } from "@/components/shared/icon";
import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export const Toolbar = () => {
   return <div className="flex items-center justify-between">
      <DropdownMenu>
         <DropdownMenuTrigger className="flex min-w-52 items-center justify-between gap-x-3 h-10 rounded-sm border border-v-grey-300 py-2 px-4 focus-within:outline-none">
            <span className="text-sm">Project Puffin</span>
            <div className="flex items-center gap-x-2">
               <span className="size-6 border flex items-center justify-center border-v-grey-300 rounded-full">
                  <Icon name="prompt-select" className="size-3" />
               </span>
               <Icon name="arrow" className="h-1 w-2" />
            </div>
         </DropdownMenuTrigger>
         <DropdownMenuContent className="min-w-52">
            <DropdownMenuLabel>Select a model</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
               <Link href="/">o3</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
               <Link href="/">o4</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
               <Link href="/">o5</Link>
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex items-center gap-x-2">
         <Button className="bg-transparent p-0 size-10 flex items-center justify-center shadow-none h-auto hover:bg-transparent">
            <Icon name="micro" className="!size-5 shrink-0" />
         </Button>
         <Button className="bg-transparent p-0 size-10 flex items-center justify-center shadow-none h-auto hover:bg-transparent">
            <Icon name="web" className="!size-5 shrink-0" />
         </Button>
         <label>
            <div className="bg-transparent flex items-center cursor-pointer justify-center size-10 p-0 shadow-none h-auto hover:bg-transparent">
               <Icon name="attachment" className="size-5" />
            </div>
            <Input type="file" className="hidden" />
         </label>
         <Button className="bg-v-green-500 p-0 rounded-md size-10 shadow-none hover:bg-v-green-500/80">
            <Icon name="send" className="size-5" />
         </Button>
      </div>
   </div>
}
