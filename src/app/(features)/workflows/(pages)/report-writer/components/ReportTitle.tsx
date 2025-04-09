"use client";

import React, { useState } from "react";
import { Pencil } from "lucide-react";

import { useReportSectionsStore } from "@features/workflows/(pages)/report-writer/store/reports";

import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";

export const ReportTitle = () => {
   const [isEditing, setIsEditing] = useState(false);

   const reportName = useReportSectionsStore((state) => state.reportName);
   const setReportName = useReportSectionsStore((state) => state.setReportName);

   return (
      <div className="mb-3 flex max-w-64 items-center gap-4">
         {isEditing ? (
            <Input
               value={reportName}
               onChange={(e) => setReportName(e.target.value)}
            />
         ) : (
            <h2 className="text-base font-medium">{reportName}</h2>
         )}

         <Button
            onClick={() => setIsEditing((prevState) => !prevState)}
            variant="ghost"
            className="grid size-9 place-items-center p-0"
         >
            <Pencil className="!size-5 shrink-0 text-green-600" />
         </Button>
      </div>
   );
};
