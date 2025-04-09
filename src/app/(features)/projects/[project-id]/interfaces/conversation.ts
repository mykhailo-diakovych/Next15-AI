import {
   IFile,
   IMessage,
} from "@features/projects/[project-id]/interfaces/message";

export interface Conversation {
   id: string;
   createdDate: string;
   updatedDate: string;
   title: string;
   files: IFile[];
   messages: IMessage[];
}
