import { IMessage } from "@/app/(features)/projects/[project-id]/interfaces/message";

export interface ConversationResponse {
   success: boolean;
   conversation: Conversation;
}

export interface Conversation {
   id: string;
   createdDate: string;
   updatedDate: string;
   title: string;
   files: string[];
   messages: IMessage[];
}
