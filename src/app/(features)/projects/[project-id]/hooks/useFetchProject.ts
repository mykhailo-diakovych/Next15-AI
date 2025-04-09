import { useQuery } from "@tanstack/react-query";

import { IProject } from "@features/projects/interfaces/projects";

import { api } from "@configs/api";
import { QUERY_KEYS } from "@configs/query-keys";

interface IUseFetchProjectResponse {
   success: boolean;
   project: IProject;
}

export const useFetchProject = ({ projectId }: { projectId: string }) => {
   return useQuery({
      queryKey: QUERY_KEYS.PROJECTS.detail(projectId),
      queryFn: async (): Promise<IUseFetchProjectResponse> => {
         const { data } = await api.get(`/projects/${projectId}`);

         return data;
      },
      enabled: !!projectId,
   });
};
