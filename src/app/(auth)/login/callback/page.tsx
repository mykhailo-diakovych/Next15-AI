"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { getProjectId } from "@features/projects/utils/getProjectId";

import { useAuthCallback } from "@auth/hooks/useAuthCallback";

import { SmallLoader } from "@components/shared/loader/SmallLoader";

const LoginCallback = () => {
   const searchParams = useSearchParams();
   const [projectId, setProjectId] = useState<string | null>(null);

   const { mutate, isPending } = useAuthCallback({ projectId });

   const code = searchParams.get("code") || "";

   // Ensure projectId is only accessed on the client
   useEffect(() => {
      const storedProjectId = getProjectId();

      setProjectId(storedProjectId);
   }, []);

   useEffect(() => {
      if (code) {
         mutate({ code, redirectUrl: "/login/callback" });
      }
   }, [code, mutate]);

   return (
      <div className="flex flex-col items-center gap-4">
         <SmallLoader />
         <p className="text-lg font-medium">
            {isPending ? "Authenticating..." : "Redirecting..."}
         </p>
      </div>
   );
};

export default LoginCallback;
