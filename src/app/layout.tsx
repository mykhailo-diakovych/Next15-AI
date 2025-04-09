import React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";

import QueryProvider from "@components/providers/QueryProvider";
import { Toaster } from "@components/ui/toaster";

import "@/styles/globals.css";

export const metadata: Metadata = {
   title: "Voltquant",
   description: "Voltquant AI Assistant",
};

const NeueMontreal = localFont({
   src: [
      {
         path: "../../public/fonts/NeueMontreal-Light.woff2",
         weight: "300",
         style: "normal",
      },
      {
         path: "../../public/fonts/NeueMontreal-LightItalic.woff2",
         weight: "300",
         style: "italic",
      },
      {
         path: "../../public/fonts/NeueMontreal-Regular.woff2",
         weight: "400",
         style: "normal",
      },
      {
         path: "../../public/fonts/NeueMontreal-Italic.woff2",
         weight: "400",
         style: "italic",
      },
      {
         path: "../../public/fonts/NeueMontreal-Medium.woff2",
         weight: "500",
         style: "normal",
      },
      {
         path: "../../public/fonts/NeueMontreal-MediumItalic.woff2",
         weight: "500",
         style: "italic",
      },
      {
         path: "../../public/fonts/NeueMontreal-Bold.woff2",
         weight: "700",
         style: "normal",
      },
      {
         path: "../../public/fonts/NeueMontreal-BoldItalic.woff2",
         weight: "700",
         style: "italic",
      },
   ],
});

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body className={NeueMontreal.className}>
            <QueryProvider>
               <>
                  {children}
                  <Toaster />
               </>
            </QueryProvider>
         </body>
      </html>
   );
}
