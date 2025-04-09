import { useSuspenseQuery } from "@tanstack/react-query";

import { IProjectItem } from "@features/projects/interfaces/projects";

import { api } from "@configs/api";
import { QUERY_KEYS } from "@configs/query-keys";

interface IUseFetchProjectsResponse {
   success: boolean;
   items: IProjectItem[];
}

export const useFetchProjects = () => {
   return useSuspenseQuery({
      queryKey: QUERY_KEYS.PROJECTS.list(),
      queryFn: async (): Promise<IUseFetchProjectsResponse> => {
         const { data } = await api.get("/projects");

         return data;
      },
   });
};
