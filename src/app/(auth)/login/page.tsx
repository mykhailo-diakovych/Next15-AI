"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { LoginButton } from "@auth/components/LoginButton";
import { getUser } from "@auth/utils/getUser";

import { SmallLoader } from "@components/shared/loader/SmallLoader";

const Login = () => {
   const [loading, setLoading] = useState(true);
   const router = useRouter();

   useEffect(() => {
      const user = getUser();
      if (user) {
         router.push("/");
      } else {
         setLoading(false);
      }
   }, [router]);

   if (loading) {
      return (
         <div className="flex flex-col items-center gap-4">
            <SmallLoader />
            <p className="text-lg font-medium">Checking...</p>
         </div>
      );
   }

   return <LoginButton />;
};

export default Login;
