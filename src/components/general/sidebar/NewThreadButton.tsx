import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

interface NewThreadButtonProps {
   onClick?: () => void;
}

export function NewThreadButton({ onClick }: NewThreadButtonProps) {
   return (
      <Button
         onClick={onClick}
         className="w-full justify-start border-gray-200"
         variant="outline"
      >
         <Plus className="mr-2 h-4 w-4" />
         New Thread
      </Button>
   );
}
