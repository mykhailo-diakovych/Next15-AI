"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useIntersectionObserver, useLocalStorage } from "@uidotdev/usehooks";
import { format, isToday, isYesterday, parseISO } from "date-fns";

import { useFetchThreads } from "@features/hooks/useFetchThreads";
import { useFetchConversation } from "@features/hooks/useFetchConversation";
import { useDeleteThread } from "@features/hooks/useDeleteThread";
import { useConversationStore } from "@features/projects/[project-id]/store/conversation";
import { usePromptStore } from "@features/projects/[project-id]/store/prompt";
import { useDetailsStore } from "@features/projects/[project-id]/store/details";

import { Separator } from "@components/ui/separator";
import { NewThreadButton } from "@components/general/sidebar/NewThreadButton";
import { Logo } from "@components/general/logo/HeaderLogo";
import {
   Sidebar,
   SidebarContent,
   SidebarFooter,
   SidebarHeader,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
   SidebarRail,
   SidebarTrigger,
   useSidebar,
} from "@components/ui/sidebar";
import { Icon } from "@components/shared/icon";
import { AppAlertDialog } from "@components/shared/dialog/AlertDialog";
// import { ModelSelector } from "@components/general/sidebar/ModelSelector";
import { UserProfile } from "@components/general/sidebar/UserProfile";
import { ThreadItem } from "@components/general/sidebar/ThreadItem";

import { cn } from "@utils/tailwindMerge";
import { getUniqueSources } from "@utils/getUniqueSources";

import { SIDEBAR } from "@configs/constants";
import { STORAGE_KEYS } from "@configs/storage-keys";
import { ROUTES } from "@configs/routes";

const DateSeparator = ({ date, open }: { date: string; open: boolean }) => (
   <div className={cn("mt-7 flex items-center gap-2 pl-2", { hidden: !open })}>
      <span className="text-xs font-normal text-old-silver">{date}</span>
      <div className="h-px flex-grow bg-gray-200" />
   </div>
);

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
   const { open } = useSidebar();
   const pathname = usePathname();
   const [projectId] = useLocalStorage<string>(STORAGE_KEYS.projectId);

   // State
   const [selectedConversationId, setSelectedConversationId] = useState<
      string | null
   >(null);
   const [hoveredThreadId, setHoveredThreadId] = useState<string | null>(null);
   const [deleteThreadId, setDeleteThreadId] = useState<string>("");
   const [isDialogOpen, setDialogOpen] = useState(false);

   const isWorkflowsPage = pathname === ROUTES.WORKFLOWS.path;

   const isProjectSelected =
      !!projectId && pathname === ROUTES.PROJECT.path(projectId);

   // Stores
   const setConversationState = useConversationStore(
      (state) => state.setConversationState,
   );
   const updateFollowups = usePromptStore((state) => state.updateFollowups);
   const setOpenSources = useDetailsStore((state) => state.setOpenSources);

   // API hooks
   const {
      data: threads,
      isLoading,
      error,
      hasNextPage: hasNextThreadsPage,
      fetchNextPage,
      isFetchingNextPage,
   } = useFetchThreads({ projectId });

   const { deleteConversation } = useDeleteThread();
   const { data: conversationData } = useFetchConversation({
      conversationId: selectedConversationId ?? "",
   });

   // Intersection observer for infinite scrolling
   const [ref, entry] = useIntersectionObserver({
      threshold: 0.1,
   });

   // Handlers
   const handleThreadClick = (conversationId: string) => {
      setSelectedConversationId(conversationId);
      setOpenSources([]);
      updateFollowups([]);
   };

   const handleDeleteClick = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      threadId: string,
   ) => {
      e.stopPropagation();
      setDeleteThreadId(threadId);
      setDialogOpen(true);
   };

   const handleDeleteConfirm = () => {
      deleteConversation({ threadId: deleteThreadId });
      setDialogOpen(false);
      setDeleteThreadId("");
   };

   const handleDeleteCancel = () => {
      setDialogOpen(false);
      setDeleteThreadId("");
   };

   // Process threads data
   const threadsItems = threads?.pages.flatMap((page) => page.items) || [];

   // Format date label using date-fns
   const formatDateLabel = (dateStr: string) => {
      const date = parseISO(dateStr);
      if (isToday(date)) return "Today";
      if (isYesterday(date)) return "Yesterday";
      return format(date, "MMMM d, yyyy");
   };

   // Group threads by date
   const getGroupedThreads = () => {
      if (!threadsItems.length)
         return {} as Record<string, typeof threadsItems>;

      // Sort threads by updatedDate (newest first)
      const sortedThreads = [...threadsItems].sort(
         (a, b) =>
            parseISO(b.updatedDate).getTime() -
            parseISO(a.updatedDate).getTime(),
      );

      // Group threads by date
      return sortedThreads.reduce<Record<string, typeof threadsItems>>(
         (groups, thread) => {
            const parsedDate = parseISO(thread.updatedDate);
            const dateKey = format(parsedDate, "yyyy-MM-dd");

            if (!groups[dateKey]) {
               groups[dateKey] = [];
            }

            groups[dateKey].push(thread);
            return groups;
         },
         {},
      );
   };

   // Effects
   useEffect(() => {
      if (conversationData) {
         setConversationState({
            conversationId: conversationData.conversation.id,
            title: conversationData.conversation.title.replace(/"/g, ""),
            feedbacks: conversationData.conversation.feedbacks,
            messages: conversationData.conversation.messages,
            files: getUniqueSources(conversationData.conversation.messages),
            isLoading: false,
         });
      }
   }, [conversationData, setConversationState, updateFollowups]);

   useEffect(() => {
      if (entry?.isIntersecting && hasNextThreadsPage) {
         fetchNextPage();
      }
   }, [entry, fetchNextPage, hasNextThreadsPage]);

   // Render grouped threads
   const renderThreadGroups = () => {
      const groupedThreads = getGroupedThreads();

      return Object.entries(groupedThreads).map(([date, threads]) => (
         <React.Fragment key={date}>
            <DateSeparator date={formatDateLabel(date)} open={open} />

            {/* Threads for this date */}
            {threads.map((thread) => (
               <ThreadItem
                  key={thread.id}
                  thread={thread}
                  isHovered={hoveredThreadId === thread.id}
                  onMouseEnter={() => setHoveredThreadId(thread.id)}
                  onMouseLeave={() => setHoveredThreadId(null)}
                  onClick={() => handleThreadClick(thread.id)}
                  onDelete={(e) => handleDeleteClick(e, thread.id)}
               />
            ))}
         </React.Fragment>
      ));
   };

   // Render nav items
   const renderNavItems = () => (
      <>
         {SIDEBAR.navMain.map((item) => {
            const url =
               typeof item.url === "function"
                  ? projectId
                     ? item.url(projectId)
                     : ""
                  : item.url;

            const isActive = pathname === url;

            return (
               <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                     asChild
                     size="lg"
                     className={cn(
                        "relative rounded bg-white hover:bg-whisper/75",
                        {
                           "flex items-center justify-center": !open,
                        },
                     )}
                  >
                     <Link href={url}>
                        {isActive && (
                           <div
                              className={cn(
                                 "absolute left-3 h-8 w-0.5 bg-atlantis",
                                 {
                                    "bottom-2 left-1/2 h-0.5 w-8 -translate-x-1/2":
                                       !open,
                                 },
                              )}
                           />
                        )}
                        <Icon
                           className={cn("ml-4", { "ml-0": !open })}
                           name={item.icon}
                        />
                        <span className={cn({ hidden: !open })}>
                           {item.title}
                        </span>
                     </Link>
                  </SidebarMenuButton>
               </SidebarMenuItem>
            );
         })}
      </>
   );

   return (
      <Sidebar collapsible="icon" className="!border-0" {...props}>
         <SidebarHeader
            className={cn("gap-7 px-7 pb-0 pt-9", {
               "items-center gap-6 px-5 pt-7": !open,
            })}
         >
            <div
               className={cn("flex items-center justify-between", {
                  "justify-center": !open,
               })}
            >
               <Logo />
               <SidebarTrigger />
            </div>
            <Separator />
            {isProjectSelected && !isWorkflowsPage && (
               <>
                  <NewThreadButton
                     setSelectedConversationIdAction={setSelectedConversationId}
                  />
                  <Separator />
               </>
            )}
         </SidebarHeader>

         <SidebarContent
            className={cn("px-7 pb-0 pt-7", {
               "items-center gap-6 px-5 pt-7": !open,
            })}
         >
            <SidebarMenu
               className={cn({
                  "items-center": !open,
               })}
            >
               {/* Navigation items */}
               {renderNavItems()}

               {/* Model selector */}
               {/*<ModelSelector />*/}

               {/* Thread list with infinite scroll - only show if project is selected */}
               {isProjectSelected && !isWorkflowsPage && (
                  <div className="no-scrollbar mt-3.5 h-full max-h-[calc(100dvh-26rem)] overflow-y-auto">
                     {isLoading && open && (
                        <p className="text-center text-gray-500">Loading...</p>
                     )}

                     {error && (
                        <p className="text-center text-red-500">
                           Failed to load threads
                        </p>
                     )}

                     {!isLoading && !error && open && renderThreadGroups()}

                     {hasNextThreadsPage && (
                        <div ref={ref} className="h-1 w-full opacity-0" />
                     )}

                     {isFetchingNextPage && open && (
                        <p className="text-center text-gray-500">Loading...</p>
                     )}
                  </div>
               )}

               {/* Show a message if no project is selected */}
               {!isProjectSelected && open && !isWorkflowsPage && (
                  <div className="mt-8 flex flex-col items-center justify-center text-center">
                     <Icon
                        name="folder"
                        className="mb-4 size-12 text-gray-300"
                     />
                     <p className="mb-2 text-sm font-medium text-gray-600">
                        No Project Selected
                     </p>
                     <p className="text-xs text-gray-400">
                        Please select a project to view conversations
                     </p>
                  </div>
               )}
            </SidebarMenu>
         </SidebarContent>

         <SidebarFooter className="px-7">
            <SidebarMenu>
               <SidebarMenuItem>
                  <UserProfile />
               </SidebarMenuItem>
            </SidebarMenu>
         </SidebarFooter>

         <SidebarRail />

         <AppAlertDialog
            title="This action cannot be undone."
            description="Are you sure you want to delete this thread?"
            isDialogOpen={isDialogOpen}
            setDialogOpen={setDialogOpen}
            handleCancel={handleDeleteCancel}
            handleConfirm={handleDeleteConfirm}
         />
      </Sidebar>
   );
}
