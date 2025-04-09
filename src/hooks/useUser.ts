import { useEffect, useState } from "react";

import { getUser } from "@auth/utils/getUser";
import { User } from "@auth/types/auth";

export const useUser = () => {
   const [user, setUser] = useState<null | User>(null);

   useEffect(() => {
      setUser(getUser());
   }, []);

   return user;
};
