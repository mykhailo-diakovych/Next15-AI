import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Icon } from "@components/shared/icon";
import { Card, CardContent } from "@components/ui/card";
import { Button } from "@components/ui/button";
import { Badge } from "@components/ui/badge";

import { ROUTES } from "@configs/routes";

interface IWorkflowCardProps {
   iconName: string;
   label?: string;
   title: string;
   text: string;
   disabled?: boolean;
   link?: string;
}

export const WorkflowCard = ({
   iconName,
   label,
   title,
   text,
   link,
   disabled = false,
}: IWorkflowCardProps) => {
   return (
      <Card className="relative flex w-80 flex-col gap-1 border-0 shadow-none">
         <div className="flex flex-col gap-3 rounded-t-lg border border-black p-4">
            <div className="flex justify-between gap-2.5">
               <div className="flex size-12 items-center justify-center rounded-full border border-lime-500 bg-lime-50 p-1">
                  <Icon name={iconName} className="size-7" />
               </div>
               {label && (
                  <Badge className="h-5 cursor-default border-lime-500 bg-lime-50 px-3 text-xs font-medium text-black hover:bg-lime-50">
                     {label}
                  </Badge>
               )}
            </div>

            <CardContent className="m-0 p-0">
               <h6 className="text-base font-medium text-gray-900">{title}</h6>
               <p className="mt-1 text-sm text-gray-500">{text}</p>
            </CardContent>
         </div>

         <div className="flex h-10 w-full items-center justify-between gap-1">
            <div className="h-full flex-1 rounded-bl-lg border border-black"></div>
            <Link
               className="h-full w-20"
               href={link ? link : ROUTES.WORKFLOWS.path}
            >
               <div className="clip-corner h-full w-20 bg-black p-px">
                  <Button
                     variant="outline"
                     size="icon"
                     className="clip-corner h-full w-full rounded-none border-none bg-lime-50 disabled:opacity-100"
                     disabled={disabled}
                  >
                     <ArrowRight className="h-5 w-5 text-gray-900" />
                  </Button>
               </div>
            </Link>
         </div>
      </Card>
   );
};
