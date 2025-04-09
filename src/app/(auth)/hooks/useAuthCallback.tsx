import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { useToast } from "@hooks/use-toast";

import { api } from "@configs/api";
import { ROUTES } from "@configs/routes";
import { STORAGE_KEYS } from "@configs/storage-keys";

interface IMicrosoftCallbackRequest {
   code: string;
   redirectUrl: string;
}

interface IUseAuthCallbackResponse {
   success: boolean;
   user: {
      id: string;
      name: string;
      user: string;
      sessionId: string;
      email: string;
      projectIds?: string[];
      organizationId: string;
      lastSignedIn: string;
   };
}

interface IUseAuthCallbackParams {
   projectId: string | null;
}

export const useAuthCallback = ({ projectId }: IUseAuthCallbackParams) => {
   const router = useRouter();
   const { toast } = useToast();

   return useMutation({
      mutationFn: async ({ code, redirectUrl }: IMicrosoftCallbackRequest) => {
         const { data } = await api.post<IUseAuthCallbackResponse>(
            "/msoauth",
            JSON.stringify({
               code,
               redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}${redirectUrl}`,
            }),
            {
               headers: { "Content-Type": "application/json" },
            },
         );

         return data;
      },
      onSuccess: (data) => {
         if (!data?.user) return;

         sessionStorage.setItem(STORAGE_KEYS.user, JSON.stringify(data.user));

         if (
            projectId &&
            Array.isArray(data.user.projectIds) &&
            data.user.projectIds.length > 0
         ) {
            const firstProjectId = data.user.projectIds[0];

            if (data.user.projectIds.includes(projectId)) {
               return router.replace(ROUTES.PROJECT.path(projectId));
            }

            localStorage.setItem(
               STORAGE_KEYS.projectId,
               JSON.stringify(firstProjectId),
            );
            return router.replace(ROUTES.PROJECT.path(firstProjectId));
         }

         router.replace(ROUTES.PROJECTS.path);
      },
      onError: (error) => {
         toast({
            variant: "destructive",
            title: "Authentication Failed",
            description: error.message,
         });

         router.replace(ROUTES.LOGIN.path);
      },
   });
};
