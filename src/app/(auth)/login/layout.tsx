import React from "react";

import { Icon } from "@components/shared/icon";

export default function FeaturesLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <div className="flex h-dvh w-full flex-col items-center justify-center gap-12">
         <div className="flex flex-col items-center justify-center gap-8">
            <Icon name="logo" className="h-36 w-36" />
            <h1 className="text-7xl font-medium">VOLTQUANT</h1>
         </div>
         {children}
      </div>
   );
}
