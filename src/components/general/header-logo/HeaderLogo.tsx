import React from "react";

import { Icon } from "@components/ui/icon";

export const HeaderLogo = () => {
   return (
      <div>
         <Icon name="logo" />

         <span className="text-left text-xl font-normal leading-6">
            VOLTQUANT
         </span>
      </div>
   );
};
