import React from "react";

import withVoltquantLogo from "@components/shared/withVoltquantLogo";
import { SmallLoader } from "@components/shared/loader/SmallLoader";

const LoaderScreen = () => {
   return (
      <div className="flex flex-col items-center gap-4">
         <SmallLoader />
         <p className="text-lg font-medium">Checking...</p>
      </div>
   );
};

export default withVoltquantLogo(LoaderScreen);
