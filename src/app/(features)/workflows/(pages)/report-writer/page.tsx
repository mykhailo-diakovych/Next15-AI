import React from "react";

import { ReportSectionsList } from "@features/workflows/(pages)/report-writer/components/ReportSectionsList";
import { TemplateSection } from "@features/workflows/(pages)/report-writer/components/TemplateSection";
import { ReportTitle } from "@features/workflows/(pages)/report-writer/components/ReportTitle";

const AIReportWriterPage = () => {
   return (
      <div className="px-8 py-5">
         <ReportTitle />

         <div className="flex items-center justify-center gap-4">
            <ReportSectionsList />
            <TemplateSection />
         </div>
      </div>
   );
};

export default AIReportWriterPage;
