"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

import {
   constructMicrosoftOAuthUrl,
   MICROSOFT_AUTH_CONFIG,
} from "@auth/utils/microsoftAuth";
import { AuthError } from "@auth/types/auth";

import { ToastAction } from "@components/ui/toast";

import { useToast } from "@/hooks/use-toast";

export const useMicrosoftAuth = () => {
   const router = useRouter();
   const searchParams = useSearchParams();
   const { toast } = useToast();

   const validateConfig = useCallback(() => {
      const missingConfigs: string[] = [];
      if (!MICROSOFT_AUTH_CONFIG.tenantId) missingConfigs.push("Tenant ID");
      if (!MICROSOFT_AUTH_CONFIG.clientId) missingConfigs.push("Client ID");
      if (!MICROSOFT_AUTH_CONFIG.baseUrl) missingConfigs.push("Base URL");

      if (missingConfigs.length > 0) {
         toast({
            variant: "destructive",
            title: "Configuration Error",
            description: `Missing required configuration: ${missingConfigs.join(", ")}`,
         });
         return false;
      }
      return true;
   }, [toast]);

   const handleAuthError = useCallback(
      (error: AuthError) => {
         toast({
            variant: "destructive",
            title: "Authentication Failed",
            description: error.description || "An unexpected error occurred",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
         });
      },
      [toast],
   );

   const handleLogin = useCallback(() => {
      try {
         if (!validateConfig()) return;
         window.location.href = constructMicrosoftOAuthUrl(
            MICROSOFT_AUTH_CONFIG,
         );
      } catch (error) {
         handleAuthError(error as AuthError);
      }
   }, [validateConfig, handleAuthError]);

   const handleAuthErrorWithRetry = useCallback(
      (error: AuthError) => {
         toast({
            variant: "destructive",
            title: "Authentication Failed",
            description: error.description || "An unexpected error occurred",
            action: (
               <ToastAction altText="Try again" onClick={handleLogin}>
                  Try again
               </ToastAction>
            ),
         });
      },
      [toast, handleLogin],
   );

   useEffect(() => {
      const code = searchParams.get("code");
      if (code) {
         const handleAuthCallback = async () => {
            try {
               router.push(`/auth/callback?code=${code}`);
            } catch (error) {
               handleAuthErrorWithRetry(error as AuthError);
            }
         };

         handleAuthCallback();
      }
   }, [router, searchParams, handleAuthErrorWithRetry]);

   return { handleLogin };
};
