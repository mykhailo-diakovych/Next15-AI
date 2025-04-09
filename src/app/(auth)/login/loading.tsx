"use client";

import React from "react";

import { SmallLoader } from "@/components/shared/loader/SmallLoader";

export default function LoginCallbackLoading() {
   return (
      <div className="flex flex-col items-center gap-4">
         <SmallLoader />
         <p className="text-lg font-medium">Loading...</p>
      </div>
   );
}
