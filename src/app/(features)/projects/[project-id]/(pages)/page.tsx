"use client";

import React, { useEffect, useRef } from "react";
import { useParams } from "next/navigation";

import { Prompt } from "@features/projects/[project-id]/components/prompt/Prompt";
import { MessagesContainer } from "@features/projects/[project-id]/components/messages/MessagesContainer";
import { Banner } from "@features/projects/[project-id]/components/banner/Banner";
import { ProjectDetails } from "@features/projects/[project-id]/components/details/ProjectDetails";
import { useConversationStore } from "@features/projects/[project-id]/store/conversation";
import { useDetailsStore } from "@features/projects/[project-id]/store/details";
import { useAnalyzeStore } from "@features/projects/[project-id]/store/analyze";
import { ProjectAnalyze } from "@features/projects/[project-id]/components/analyze/ProjectAnalyze";
import { RelevantDocs } from "@features/projects/[project-id]/components/relevant-docs/RelevantDocs";
import { ProjectVoice } from "@features/projects/[project-id]/components/voice/ProjectVoice";
import { useVoiceStore } from "@features/projects/[project-id]/store/voice";
import { useProjectStore } from "@features/projects/[project-id]/store/project";
import { useFetchProject } from "@features/projects/[project-id]/hooks/useFetchProject";

import { ScrollArea } from "@components/ui/scroll-area";
import {
   ResizableHandle,
   ResizablePanel,
   ResizablePanelGroup,
} from "@components/ui/resizable";

import { cn } from "@utils/tailwindMerge";

const PANEL_SIZES = {
   DEFAULT_LEFT_WITH_PREVIEW: 55,
   DEFAULT_RIGHT_WITH_PREVIEW: 45,
   FULL_SIZE: 100,
   MIN_SIZE_WITH_PREVIEW: 35,
   MAX_SIZE_WITH_PREVIEW: 65,
};

const SIDEBAR_WIDTHS = {
   ANALYZE_OR_DETAILS: "mr-[28rem]",
   VOICE: "mr-[37rem]",
   RELEVANT_DOCS: "mr-[36rem] 2xl:mr-[48rem]",
};

interface ResizablePanelStateProps {
   documentPreviewUrl: string | null | undefined;
   isDocumentPreviewFullscreen: boolean;
}

const useResizablePanelState = ({
   documentPreviewUrl,
   isDocumentPreviewFullscreen,
}: ResizablePanelStateProps) => {
   const [leftPanelSize, setLeftPanelSize] = React.useState<number>(
      documentPreviewUrl && !isDocumentPreviewFullscreen
         ? PANEL_SIZES.DEFAULT_LEFT_WITH_PREVIEW
         : PANEL_SIZES.FULL_SIZE,
   );

   const [rightPanelSize, setRightPanelSize] = React.useState<number>(
      documentPreviewUrl && !isDocumentPreviewFullscreen
         ? PANEL_SIZES.DEFAULT_RIGHT_WITH_PREVIEW
         : 0,
   );

   React.useEffect(() => {
      if (documentPreviewUrl && !isDocumentPreviewFullscreen) {
         setLeftPanelSize(PANEL_SIZES.DEFAULT_LEFT_WITH_PREVIEW);
         setRightPanelSize(PANEL_SIZES.DEFAULT_RIGHT_WITH_PREVIEW);
      } else {
         setLeftPanelSize(PANEL_SIZES.FULL_SIZE);
         setRightPanelSize(0);
      }
   }, [documentPreviewUrl, isDocumentPreviewFullscreen]);

   return {
      leftPanelSize,
      rightPanelSize,
   };
};

const ProjectPage = () => {
   const params = useParams<{ "project-id": string }>();

   // Conversation Store
   const messages = useConversationStore((state) => state.messages);

   // Details Store
   const documentPreviewUrl = useDetailsStore(
      (state) => state.documentPreviewUrl,
   );
   const isDocumentPreviewFullscreen = useDetailsStore(
      (state) => state.isDocumentPreviewFullscreen,
   );
   const isDetailsOpened = useDetailsStore((state) => state.isDetailsOpened);

   // Analyze Store
   const isAnalyzeOpened = useAnalyzeStore((state) => state.isAnalyzeOpened);
   const isRelevantDocsOpened = useAnalyzeStore(
      (state) => state.isRelevantDocsOpened,
   );

   // Voice Store
   const isVoiceOpened = useVoiceStore((state) => state.isVoiceOpened);

   // Project Store
   const setProject = useProjectStore((state) => state.setProject);

   // Use custom hook for panel sizing state
   const { leftPanelSize, rightPanelSize } = useResizablePanelState({
      documentPreviewUrl,
      isDocumentPreviewFullscreen,
   });

   const messagesEndRef = useRef<HTMLDivElement>(null);
   const scrollAreaRef = useRef<HTMLDivElement>(null);

   const { data } = useFetchProject({ projectId: params["project-id"] });

   useEffect(() => {
      if (data) setProject(data.project);
   }, [data, setProject]);

   useEffect(() => {
      // Use requestAnimationFrame to ensure smooth scroll after DOM update
      const scrollToBottom = () => {
         if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
               behavior: "smooth",
               block: "end",
            });
         }
      };

      requestAnimationFrame(scrollToBottom);
   }, [messages]);

   // Check if document preview is active
   const isDocumentPreviewActive =
      documentPreviewUrl && !isDocumentPreviewFullscreen;

   return (
      <div className="flex h-full flex-1 flex-col overflow-hidden">
         <div className="flex h-full max-h-[calc(100dvh-6rem)]">
            <ResizablePanelGroup direction="horizontal">
               <ResizablePanel defaultSize={leftPanelSize}>
                  <div
                     className={cn(
                        "flex h-full flex-1 flex-col justify-center gap-2 p-4 transition-all duration-300 ease-in-out",
                        {
                           "justify-between": messages && messages.length > 0,
                           [SIDEBAR_WIDTHS.ANALYZE_OR_DETAILS]:
                              (isAnalyzeOpened || isDetailsOpened) &&
                              !isDocumentPreviewActive,
                           [SIDEBAR_WIDTHS.VOICE]: isVoiceOpened,
                           [SIDEBAR_WIDTHS.RELEVANT_DOCS]: isRelevantDocsOpened,
                        },
                     )}
                  >
                     {messages ? (
                        <div className="flex-1 overflow-hidden">
                           <ScrollArea
                              ref={scrollAreaRef}
                              className="h-full w-full"
                           >
                              <MessagesContainer />

                              <div ref={messagesEndRef} />
                           </ScrollArea>
                        </div>
                     ) : (
                        <Banner />
                     )}

                     <div className="flex flex-shrink-0 justify-center">
                        <Prompt />
                     </div>
                  </div>
               </ResizablePanel>

               {isDocumentPreviewActive ? (
                  <>
                     <ResizableHandle withHandle />
                     <ResizablePanel
                        defaultSize={rightPanelSize}
                        minSize={PANEL_SIZES.MIN_SIZE_WITH_PREVIEW}
                        maxSize={PANEL_SIZES.MAX_SIZE_WITH_PREVIEW}
                     >
                        <div className="relative h-full">
                           <ProjectDetails />
                        </div>
                     </ResizablePanel>
                  </>
               ) : (
                  <div className="relative h-full">
                     {isDetailsOpened && <ProjectDetails />}
                     {isAnalyzeOpened && <ProjectAnalyze />}
                     {isVoiceOpened && <ProjectVoice />}
                     {isRelevantDocsOpened && <RelevantDocs />}
                  </div>
               )}
            </ResizablePanelGroup>
         </div>
      </div>
   );
};

export default ProjectPage;
