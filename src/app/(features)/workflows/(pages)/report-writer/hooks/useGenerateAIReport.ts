import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { useReportSectionsStore } from "@features/workflows/(pages)/report-writer/store/reports";

import { useToast } from "@hooks/use-toast";

import { api } from "@configs/api";

interface IGenerateAIReportParams {
   projectId: string;
}

export function useGenerateAIReport() {
   const { toast } = useToast();

   const [reportBlob, setReportBlob] = useState<Blob | null>(null);
   const [fileName, setFileName] = useState<string>("");

   const sections = useReportSectionsStore((state) => state.sections).map(
      (section) => ({ title: section.title, description: section.description }),
   );
   const reportName = useReportSectionsStore((state) => state.reportName);

   const mutation = useMutation({
      mutationFn: async ({ projectId }: IGenerateAIReportParams) => {
         if (!projectId) {
            toast({
               variant: "destructive",
               title: "Select project",
            });
            return null;
         }

         try {
            const response = await api.post(
               "/reports",
               {
                  reportTitle: reportName,
                  projectId,
                  sections,
               },
               {
                  responseType: "blob",
               },
            );

            const contentDisposition = response.headers["content-disposition"];
            const extractedFileName = contentDisposition
               ? contentDisposition.split("filename=")[1].replace(/"/g, "")
               : `${reportName || "Generated_Report"}.docx`;

            setReportBlob(new Blob([response.data]));
            setFileName(extractedFileName);

            toast({
               title: "Report generated",
               description: "Your report is ready to download",
            });

            return true;
         } catch (error) {
            console.error("Error generating report:", error);
            toast({
               variant: "destructive",
               title: "Failed to generate report",
               description: "Please try again later",
            });
            return null;
         }
      },
   });

   const downloadReport = () => {
      if (!reportBlob) {
         toast({
            variant: "destructive",
            title: "No report to download",
            description: "Please generate a report first",
         });
         return;
      }

      const url = window.URL.createObjectURL(reportBlob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast({
         title: "Report downloaded",
      });
   };

   return {
      generateAIReport: mutation.mutate,
      isPending: mutation.isPending,
      downloadReport,
      fileName,
      hasReport: !!reportBlob,
   };
}
