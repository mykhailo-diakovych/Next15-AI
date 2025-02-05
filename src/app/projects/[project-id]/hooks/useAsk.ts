import { useState } from "react";

import { AskRequest, AskResponse } from "@/app/api/features/ask/interfaces";

export function useAsk() {
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const askQuestion = async (
      request: AskRequest,
   ): Promise<AskResponse | null> => {
      try {
         setIsLoading(true);
         setError(null);

         const response = await fetch("/api/ask", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
         });

         if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to get response");
         }

         return await response.json();
      } catch (err) {
         setError(
            err instanceof Error ? err.message : "An unexpected error occurred",
         );
         return null;
      } finally {
         setIsLoading(false);
      }
   };

   return {
      askQuestion,
      isLoading,
      error,
   };
}
