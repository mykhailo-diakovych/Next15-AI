export interface MessageBody {
   role: string;
   content: string;
}

export interface Message {
   id: string;
   messageDateTime: string;
   body: MessageBody;
}
