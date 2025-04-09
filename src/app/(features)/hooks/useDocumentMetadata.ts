"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { getUser } from "@auth/utils/getUser";

import { getApiUrl } from "@utils/getApiUrl";

import { useToast } from "@/hooks/use-toast";

export interface UpdateMetadataParams {
   fileId: string;
   title?: string;
   description?: string;
   keywords?: string[];
}

export const useDocumentMetadata = () => {
   const { toast } = useToast();
   const [isUpdating, setIsUpdating] = useState(false);
   const queryClient = useQueryClient();

   const mutation = useMutation<boolean, Error, UpdateMetadataParams>({
      mutationFn: async ({
         fileId,
         title,
         description,
         keywords,
      }: UpdateMetadataParams): Promise<boolean> => {
         setIsUpdating(true);

         const user = getUser();
         if (!user) {
            throw new Error("Unauthorized. Please log in.");
         }

         if (!fileId) {
            throw new Error("Missing file ID");
         }

         try {
            const baseUrl = getApiUrl();
            const apiUrl = `${baseUrl}/updateMetadata?fileId=${fileId}&userId=${user.id}&sessionId=${user.sessionId}`;
            const response = await fetch(apiUrl, {
               method: "PATCH",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({
                  ...(title !== undefined && { title }),
                  ...(description !== undefined && { description }),
                  ...(keywords !== undefined && { keywords }),
               }),
            });

            if (!response.ok) {
               const errorData = await response.json();
               throw new Error(
                  errorData.message ||
                     `Request failed with status ${response.status}`,
               );
            }

            return true;
         } catch (error) {
            console.error("Error updating metadata:", error);
            throw error;
         } finally {
            setIsUpdating(false);
         }
      },

      onSuccess: (_, variables) => {
         queryClient.invalidateQueries({
            queryKey: ["relevantDocs", variables.fileId],
         });
         toast({
            title: "Success",
            description: "Metadata updated successfully",
            variant: "default",
         });
      },
      onError: (error: Error) => {
         toast({
            title: "Error",
            description: error.message || "Failed to update metadata",
            variant: "destructive",
         });
      },
   });

   const updateMetadata = async (
      params: UpdateMetadataParams,
   ): Promise<boolean> => {
      try {
         await mutation.mutateAsync(params);
         return true;
      } catch (error) {
         console.error("Error in updateMetadata:", error);
         return false;
      }
   };

   return {
      updateMetadata,
      isUpdating: mutation.isPending || isUpdating,
   };
};
