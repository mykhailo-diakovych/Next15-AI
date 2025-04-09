import React from "react";
import { Copy, Volume2, CircleStop } from "lucide-react";
import { useCopyToClipboard } from "@uidotdev/usehooks";

import { MarkdownRenderer } from "@features/projects/[project-id]/components/messages/MarkdownRenderer";
import { MessageFileTile } from "@features/projects/[project-id]/components/messages/MessageFileTile";
import { FeedbackButtons } from "@features/projects/[project-id]/components/messages/FeedbackButtons";
import { useConversationStore } from "@features/projects/[project-id]/store/conversation";
import { useTextToSpeech } from "@features/projects/[project-id]/hooks/useTextToSpeech";
import { IMessage } from "@features/projects/[project-id]/interfaces/message";
import { useVoiceStore } from "@features/projects/[project-id]/store/voice";

import { Icon } from "@components/shared/icon";
import { SmallLoader } from "@components/shared/loader/SmallLoader";
import { Button } from "@components/ui/button";

import { useToast } from "@hooks/use-toast";

import "./message.css";

interface IMessageProps {
   message: IMessage;
}

const AdminMessage = ({ message }: IMessageProps) => {
   const isLoading = useConversationStore((state) => state.isLoading);
   const isLastMessage = useConversationStore((state) => {
      const messages = state.messages ?? [];
      const lastAdminMessage = [...messages]
         .reverse()
         .find((msg) => msg.body.role === "assistant");
      return lastAdminMessage?.id === message.id;
   });

   const setIsVoiceOpened = useVoiceStore((state) => state.setIsVoiceOpened);

   const [, copyToClipboard] = useCopyToClipboard();

   const { speak, stopSpeaking, isSpeaking } = useTextToSpeech();

   const { toast } = useToast();

   const handleCopy = async () => {
      await copyToClipboard(message.body.content);
      toast({
         title: "Copied to clipboard!",
      });
   };

   const handleSpeak = () => {
      setIsVoiceOpened(true);
      speak(message.body.content);
   };

   return (
      <div className="relative flex w-full justify-start gap-4">
         <div className="flex size-12 shrink-0 items-center justify-center rounded-md bg-white-smoke">
            {isLoading && message.body.content.length === 0 ? (
               <SmallLoader className="scale-[1.75]" />
            ) : (
               <Icon name="logo" className="size-6" />
            )}
         </div>
         {message.body.content.length > 0 && (
            <div className="flex w-full max-w-[700px] flex-col gap-4">
               <div className="flex pt-3">
                  <MarkdownRenderer content={message.body.content} />
               </div>
               {(!isLoading || !isLastMessage) &&
                  message.body.content.length !== 0 && (
                     <div className="flex items-center gap-1">
                        <Button
                           onClick={handleCopy}
                           className="flex h-7 w-7 items-center justify-center p-1"
                           variant="ghost"
                        >
                           <Copy />
                        </Button>
                        <FeedbackButtons assistantMessageId={message.id} />
                        {isSpeaking ? (
                           <Button
                              onClick={() => stopSpeaking()}
                              className="flex h-7 w-7 items-center justify-center p-1"
                              variant="ghost"
                           >
                              <CircleStop />
                           </Button>
                        ) : (
                           <Button
                              onClick={handleSpeak}
                              className="flex h-7 w-7 items-center justify-center p-1"
                              variant="ghost"
                           >
                              <Volume2 />
                           </Button>
                        )}
                     </div>
                  )}
               {message?.usedFiles && (
                  <div className="no-scrollbar flex w-full items-center gap-2 overflow-hidden overflow-x-auto">
                     {message.usedFiles.map((file) => (
                        <MessageFileTile key={file.id} file={file} />
                     ))}
                  </div>
               )}
            </div>
         )}
      </div>
   );
};

const UserMessage = ({ message }: IMessageProps) => {
   return (
      <div className="relative flex w-full justify-start gap-4">
         <div className="flex size-12 shrink-0 items-center justify-center rounded-md bg-charcoal">
            <span className="text-gradient text-xl">VQ</span>
         </div>
         <div className="flex max-w-[700px] pt-3 text-base font-normal text-black-bean/90">
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
