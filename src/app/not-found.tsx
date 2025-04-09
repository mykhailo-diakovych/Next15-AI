"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { getUser } from "@auth/utils/getUser";

import { Icon } from "@components/shared/icon";

export default function NotFound() {
   const [isLoggedIn, setIsLoggedIn] = useState(false);

   useEffect(() => {
      const userSession = getUser();
      setIsLoggedIn(!!userSession);
   }, []);

   return (
      <div className="flex h-dvh w-full flex-col items-center justify-center gap-8">
         <div className="flex flex-col items-center justify-center gap-8">
            <Icon name="logo" className="h-36 w-36" />
            <h1 className="text-7xl font-medium">VOLTQUANT</h1>
         </div>
         <div className="flex flex-col items-center justify-center">
            <h2 className="text-4xl font-medium">404 - Page Not Found</h2>
            <p className="mt-2 text-gray-500">
               The page you are looking for does not exist.
            </p>
         </div>
         <Link
            href={isLoggedIn ? "/" : "/login"}
            className="mt-4 rounded-lg bg-gray-500 px-6 py-3 text-white transition"
         >
            {isLoggedIn ? "Go to Home" : "Login"}
         </Link>
      </div>
   );
}
