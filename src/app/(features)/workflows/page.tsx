import React from "react";

import { WorkflowCard } from "@features/workflows/components/WorkflowCard";

import { ROUTES } from "@configs/routes";

const WorkflowsPage = () => {
   return (
      <div className="flex flex-1 items-center justify-center gap-6">
         <WorkflowCard
            iconName="notebook"
            title="AI Report Writer"
            text="Write technical documentation with ease, powered by AI."
            link={ROUTES.AI_REPORT_WRITER.path}
         />
         <WorkflowCard
            iconName="crust"
            title="Engineering Fact Extractor"
            text="Extract technical detail from reports, images and CAD files using AI."
            label="Coming Soon"
            disabled
         />
      </div>
   );
};

export default WorkflowsPage;
