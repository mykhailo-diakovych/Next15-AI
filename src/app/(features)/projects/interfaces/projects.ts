export interface IProjectUser {
   id: string;
   email: string;
   name: string;
}

export interface IProjectOrganization {
   id: string;
   name: string;
}

export interface IProjectItem {
   id: string;
   name: string;
   createdDate: string;
   createdBy: { id: string; email: string; name: string };
}

export interface IProject {
   id: string;
   name: string;
   createdDate: string;
   createdBy: IProjectUser;
   organization: IProjectOrganization;
   type: string;
   _rid: string;
   _self: string;
   _etag: string;
   _attachments: string;
   isDeleted: boolean;
   deletedAt: string;
   _ts: number;
}
