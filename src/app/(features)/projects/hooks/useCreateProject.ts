import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@configs/api";
import { QUERY_KEYS } from "@configs/query-keys";

import { useToast } from "@/hooks/use-toast";

export const useCreateProject = () => {
   const queryClient = useQueryClient();

   const { toast } = useToast();

   const mutation = useMutation({
      mutationFn: async ({ projectName }: { projectName: string }) => {
         const { data } = await api.post(`/projects`, {
            projectName,
         });

         return data;
      },
      onSuccess: async () => {
         toast({
            title: "Project created",
         });

         await queryClient.invalidateQueries({
            queryKey: QUERY_KEYS.PROJECTS.all,
         });
      },
      onError: async (error) => {
         toast({
            variant: "destructive",
            title: "Project failed to create",
            description: error.message,
         });
      },
   });

   return {
      createProject: mutation.mutate,
   };
};
