import { Role } from "@configs/auth-permissions";

export interface AuthError {
   code?: string;
   description?: string;
}

export interface User {
   id: string;
   name: string;
   user: Role;
   sessionId: string;
   email: string;
   projectIds: string[];
   organizationId: string;
   lastSignedIn: string;
}
