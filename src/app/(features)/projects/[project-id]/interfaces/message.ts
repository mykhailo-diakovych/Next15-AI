export interface IMessageBody {
   role: string;
   content: string;
}

export interface IFile {
   id: string;
   filename: string;
}

export interface IMessage {
   id: string;
   messageDateTime: string;
   body: IMessageBody;
   usedFiles?: IFile[];
}

export interface IFeedback {
   isValuable: boolean;
   userComment: string;
   feedbackDate: string;
}

export interface IFeedbackItem {
   [key: string]: IFeedback;
}

export interface IFeedbacks {
   feedbacks: IFeedbackItem[];
}
