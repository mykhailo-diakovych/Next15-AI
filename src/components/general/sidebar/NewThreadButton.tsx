import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { cn } from "@utils/tailwindMerge";
import { useSidebar } from "@components/ui/sidebar";

interface NewThreadButtonProps {
   onClick?: () => void;
}

export function NewThreadButton({ onClick }: NewThreadButtonProps) {
   const { open } = useSidebar();

   return (
      <Button
         onClick={onClick}
         className={cn("flex w-full justify-start gap-2 border-gray-200", {
            "justify-center p-0": !open,
         })}
         variant="outline"
      >
         <Plus className="h-4 w-4" />
         <span
            className={cn({
               hidden: !open,
            })}
         >
            New Thread
         </span>
      </Button>
   );
}
