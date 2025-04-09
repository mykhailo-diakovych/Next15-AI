import * as React from "react";

import { cn } from "@/utils/tailwindMerge";

const Textarea = React.forwardRef<
   HTMLTextAreaElement,
   React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
   return (
      <textarea
         className={cn(
            "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus:!border focus:!border-solid focus:!border-ring focus:!ring-0 focus:!ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className,
         )}
         ref={ref}
         {...props}
      />
   );
});
Textarea.displayName = "Textarea";

export { Textarea };
