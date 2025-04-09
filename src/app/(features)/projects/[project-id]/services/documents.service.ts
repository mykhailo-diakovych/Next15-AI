import { api } from "@configs/api";

import { getUser } from "@/app/(auth)/utils/getUser";

export class DocumentsService {
   constructor() {}

   static async getDocument(id: string) {
      const user = getUser();
      if (!user) {
         throw new Error("Unauthorized. Please log in.");
      }

      const { data: document } = await api.get<any>("/getDocument", {
         headers: {
            "x-user-id": user.id,
            "x-session-id": user.sessionId,
         },
         params: {
            fileId: id,
         },
         responseType: "blob",
      });

      return URL.createObjectURL(document);
   }
}
