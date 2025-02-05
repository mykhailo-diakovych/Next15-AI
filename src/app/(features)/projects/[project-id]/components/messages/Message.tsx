import React from "react";

import { Button } from "@components/ui/button";
import { Icon } from "@components/shared/icon";

import { IMessage } from "@/app/(features)/projects/[project-id]/interfaces/message";

interface IMessageProps {
   message: IMessage;
}

const AdminMessage = ({ message }: IMessageProps) => {
   return (
      <div className="flex w-full justify-start gap-4">
         <div className="flex size-8 flex-shrink-0 items-center justify-center rounded-[2px] border-[1px] border-gray-400 bg-white">
            <Icon name="logo" className="h-4 w-4" />
         </div>
         <div className="flex w-full flex-col gap-4">
            <div className="flex w-full items-center justify-between gap-4">
               <span>Results</span>

               <div className="flex items-center gap-2">
                  <Icon name="magic-wand" className="h-5 w-5" />
                  <Button variant="outline">Show steps</Button>
               </div>
            </div>
            <div className="text-v-grey-900 flex text-base font-normal">
               {message.body.content}
            </div>
         </div>
      </div>
   );
};

const UserMessage = ({ message }: IMessageProps) => {
   return (
      <div className="flex w-full justify-start gap-4">
         <div className="flex size-8 flex-shrink-0 items-center justify-center rounded-[2px] bg-gradient-to-r from-v-grey-800 to-v-grey-600/70">
            <span className="text-[12px] font-medium leading-[20px] tracking-[-0.01em] text-white">
               VQ
            </span>
         </div>
         <div className="text-v-grey-900 flex text-base font-normal">
            {message.body.content}
         </div>
      </div>
   );
};

export const Message = ({ message }: IMessageProps) => {
   return message.body.role === "user" ? (
      <UserMessage message={message} />
   ) : (
      <AdminMessage message={message} />
   );
};
