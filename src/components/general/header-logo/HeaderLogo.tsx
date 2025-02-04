import React from "react";

import { Icon } from "@components/ui/icon";

export const HeaderLogo = () => {
   return (
      <div className="flex h-[60px] items-center justify-center gap-[5px] border-b border-gray-200">
         <Icon name="logo" className="h-6 w-6" />

         <span className="text-left text-xl font-normal leading-6">
            VOLTQUANT
         </span>
      </div>
   );
};
