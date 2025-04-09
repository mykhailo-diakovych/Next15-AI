import { useQuery } from "@tanstack/react-query";

import { api } from "@configs/api";
import { QUERY_KEYS } from "@configs/query-keys";

export const useVerifyUser = () => {
   const { isLoading } = useQuery({
      queryKey: QUERY_KEYS.USERS.current(),
      queryFn: async () => api.get("/verifyUser"),
      refetchInterval: 600000,
      retry: false, // Prevent automatic retries
   });

   return { isLoading };
};
