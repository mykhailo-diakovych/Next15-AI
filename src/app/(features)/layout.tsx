"use client";

import React from "react";

import { useVerifyUser } from "@features/hooks/useVerifyUser";
import { useDetailsStore } from "@features/projects/[project-id]/store/details";

import { AppHeader } from "@components/general/header/AppHeader";
import { SidebarProvider } from "@components/ui/sidebar";
import { AppSidebar } from "@components/general/sidebar/AppSidebar";
import LoaderScreen from "@components/general/loader-screen/LoaderScreen";
import { Button } from "@components/ui/button";
import { Icon } from "@components/shared/icon";

import "@/styles/globals.css";

export default function FeaturesLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   const { isLoading } = useVerifyUser();

   const documentPreviewUrl = useDetailsStore(
      (state) => state.documentPreviewUrl,
   );
   const isDocumentPreviewFullscreen = useDetailsStore(
      (state) => state.isDocumentPreviewFullscreen,
   );
   const documentPreviewPage = useDetailsStore(
      (state) => state.documentPreviewPage,
   );
   const setDocumentPreviewUrl = useDetailsStore(
      (state) => state.setDocumentPreviewUrl,
   );
   const setDocumentPreviewFullscreen = useDetailsStore(
      (state) => state.setDocumentPreviewFullscreen,
   );
   const setDocumentPreviewPage = useDetailsStore(
      (state) => state.setDocumentPreviewPage,
   );

   const handleClose = () => {
      setDocumentPreviewUrl(null);
      setDocumentPreviewFullscreen(false);
      setDocumentPreviewPage(0);
   };

   if (isLoading) {
      return <LoaderScreen />;
   }

   return (
      <SidebarProvider>
         <AppSidebar />
         <main className="flex w-full flex-col">
            <AppHeader />
            {children}
         </main>

         {documentPreviewUrl && isDocumentPreviewFullscreen && (
            <div className="no-scrollbar fixed z-50 h-full w-full overflow-y-auto border-l-2 border-gray-100 bg-white">
               <div className="flex items-center justify-between p-4">
                  <h5 className="text-lg font-medium">PDF Viewer</h5>
                  <Button variant="outline" onClick={handleClose}>
                     <Icon name="close" />
                  </Button>
               </div>
               <iframe
                  src={`${documentPreviewUrl}#page=${documentPreviewPage}`}
                  className="h-full w-full"
               />
            </div>
         )}
      </SidebarProvider>
   );
}
