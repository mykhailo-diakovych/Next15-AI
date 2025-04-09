import React from "react";

import { Icon } from "@components/shared/icon";

export default function WorkflowsLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <div className="relative flex h-full flex-col px-7 py-5">
         <h2 className="absolute -top-16 mb-4 ml-2 flex items-center gap-2 text-[2rem]">
            <Icon name="workflows" className="size-10" />
            Workflows
         </h2>
         {children}
      </div>
   );
}
