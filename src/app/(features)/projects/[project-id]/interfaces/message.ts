export interface IMessageBody {
   role: string;
   content: string;
}

export interface IMessage {
   id: string;
   messageDateTime: string;
   body: IMessageBody;
}
