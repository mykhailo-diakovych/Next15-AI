import { IProject } from "@features/projects/interfaces/projects";

export type Role = "admin" | "superAdmin" | "reader";
type User = { roles: Role[]; id: string };

type PermissionCheck<Key extends keyof Permissions> =
   | boolean
   | ((user: User, data: Permissions[Key]["dataType"]) => boolean);

type RolesWithPermissions = {
   [R in Role]: Partial<{
      [Key in keyof Permissions]: Partial<{
         [Action in Permissions[Key]["action"]]: PermissionCheck<Key>;
      }>;
   }>;
};

type Permissions = {
   projectControls: {
      dataType: IProject;
      action: "view" | "create" | "update";
   };
};

const ROLES = {
   superAdmin: {
      projectControls: {
         view: true,
      },
   },
   admin: {
      projectControls: {
         view: true,
      },
   },
   reader: {
      projectControls: {
         view: false,
      },
   },
} as const satisfies RolesWithPermissions;

export function hasPermission<Resource extends keyof Permissions>(
   user: User,
   resource: Resource,
   action: Permissions[Resource]["action"],
   data?: Permissions[Resource]["dataType"],
) {
   return user.roles.some((role) => {
      const permission = (ROLES as RolesWithPermissions)[role][resource]?.[
         action
      ];
      if (permission == null) return false;

      if (typeof permission === "boolean") return permission;
      return data != null && permission(user, data);
   });
}
