import React from "react";

import { Prompt } from "@/app/(features)/projects/[project-id]/components/prompt/Prompt";
import { MessagesContainer } from "@/app/(features)/projects/[project-id]/components/messages/MessagesContainer";

const ProjectPage = () => {
   return (
      <div className="flex flex-1 flex-col items-center justify-center px-5">
         <MessagesContainer />
         <Prompt />
      </div>
   );
};

export default ProjectPage;
