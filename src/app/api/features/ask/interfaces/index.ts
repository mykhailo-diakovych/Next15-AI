export interface AskRequest {
   question: string;
   conversationId?: string;
}

export interface AskResponse {
   answer: string;
   conversationId: string;
}
