"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

import { useAnalyzeStore } from "@features/projects/[project-id]/store/analyze";

import { Card, CardContent } from "@components/ui/card";
import { Button } from "@components/ui/button";
import { Icon } from "@components/shared/icon";

import {
   ANALYSE_CARDS,
   ANALYSE_CARDS_ID,
   ANALYSE_CATEGORIES,
} from "@configs/constants";

import "./analyze.css";

export const ProjectAnalyze = () => {
   const isAnalyzeOpened = useAnalyzeStore((state) => state.isAnalyzeOpened);

   const setIsRelevantDocsOpened = useAnalyzeStore(
      (state) => state.setIsRelevantDocsOpened,
   );

   const setIsComparingDocuments = useAnalyzeStore(
      (state) => state.setIsComparingDocsOpened,
   );

   const setCategory = useAnalyzeStore((state) => state.setCategory);

   const onClickAnalyzeFile = () => {
      setIsRelevantDocsOpened(true);
      setIsComparingDocuments(false);
      setCategory(ANALYSE_CATEGORIES.ANALYSE);
   };

   const onClickCompareDocuments = () => {
      setIsRelevantDocsOpened(true);
      setIsComparingDocuments(true);
      setCategory(ANALYSE_CATEGORIES.COMPARE);
   };

   const onClickCustomerMeeting = () => {
      setIsRelevantDocsOpened(true);
      setIsComparingDocuments(false);
      setCategory(ANALYSE_CATEGORIES.MEETINGS);
   };

   const onClickHandler = (id: ANALYSE_CARDS_ID) => {
      const clickHandlerMapping: Record<ANALYSE_CARDS_ID, () => void> = {
         [ANALYSE_CARDS_ID.ANALYZE_FILE]: onClickAnalyzeFile,
         [ANALYSE_CARDS_ID.COMPARE_DOCUMENTS]: onClickCompareDocuments,
         [ANALYSE_CARDS_ID.CUSTOMER_MEETING]: onClickCustomerMeeting,
      };

      const handler = clickHandlerMapping[id];

      if (handler) {
         handler();
      }
   };

   return (
      <section
         className={`absolute right-0 top-0 h-full w-[28rem] transform transition-all duration-300 ease-in-out ${
            isAnalyzeOpened ? "translate-x-0" : "translate-x-full"
         }`}
      >
         <div className="flex h-full w-full flex-col items-center justify-center gap-8 overflow-y-auto border-l-2 border-gray-100 bg-white p-3">
            <div className="flex w-full flex-col justify-center gap-4 rounded-xl border border-gray-200 bg-sidebar p-5">
               {ANALYSE_CARDS.map((card) => (
                  <Card
                     key={card.id}
                     className="relative w-full rounded-xl border-0 p-5"
                  >
                     {/* Icon Button */}
                     <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 p-2">
                        <Icon
                           name={card.iconName}
                           className="h-[24px] w-[24px]"
                        />
                     </div>

                     <CardContent className="mb-8 mt-3 p-0">
                        <h6 className="font-medium text-gray-900">
                           {card.title}
                        </h6>
                        <p className="mt-1 text-sm text-gray-600">
                           {card.text}
                        </p>
                     </CardContent>

                     <div className="inverted-borders-container absolute bottom-0 right-0 rounded-br-lg rounded-tl-lg border-b-0 border-l border-r-0 border-t border-gray-200 bg-sidebar">
                        <Button
                           variant="outline"
                           size="icon"
                           className="ml-1 mt-1 h-10 w-20 rounded-lg border-gray-200 bg-white shadow-inner transition hover:bg-v-green-500"
                           onClick={() => onClickHandler(card.id)}
                        >
                           <ArrowRight className="h-5 w-5 text-gray-900" />
                        </Button>
                     </div>
                  </Card>
               ))}
            </div>
         </div>
      </section>
   );
};
