"use client";

import React from "react";

import { Message } from "@features/projects/[project-id]/components/messages/Message";
import { useConversationStore } from "@features/projects/[project-id]/store/conversation";

export const MessagesContainer = () => {
   const messages = useConversationStore((state) => state.messages);

   return (
      <div className="mx-auto flex w-full justify-center py-6">
         <div className="flex w-full max-w-3xl flex-col gap-8">
            {messages?.map((message) => (
               <Message message={message} key={message.id} />
            ))}
         </div>
      </div>
   );
};
