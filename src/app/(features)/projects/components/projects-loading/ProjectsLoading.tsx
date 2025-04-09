import React from "react";

import { SmallLoader } from "@components/shared/loader/SmallLoader";

export const ProjectsLoading = () => {
   return (
      <div className="flex w-full flex-col items-center justify-center py-8 text-center">
         <SmallLoader className="scale-[1.1]" />
         <span>Loading projects...</span>
      </div>
   );
};
