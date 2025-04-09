import { useEffect, useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";

import { useConversationStore } from "@features/projects/[project-id]/store/conversation";
import { useFeedback } from "@features/projects/[project-id]/hooks/useFeedback";

import { Button } from "@components/ui/button";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@components/ui/popover";
import { Textarea } from "@components/ui/textarea";

interface IFeedbackButtonsProps {
   assistantMessageId: string;
}

export const FeedbackButtons = ({
   assistantMessageId,
}: IFeedbackButtonsProps) => {
   const [comment, setComment] = useState("");
   const [selected, setSelected] = useState<"up" | "down" | null>(null);
   const [isPopoverOpen, setIsPopoverOpen] = useState(false);

   const conversationId = useConversationStore((state) => state.conversationId);
   const feedbacks = useConversationStore((state) => state.feedbacks);

   const { sendFeedback, isPending } = useFeedback();

   useEffect(() => {
      const feedbackItem = feedbacks?.find(
         (feedback) => feedback[assistantMessageId],
      );

      if (feedbackItem) {
         const feedback = feedbackItem[assistantMessageId];

         setSelected(feedback.isValuable ? "up" : "down");
         setComment(feedback.userComment || "");
      }
   }, [feedbacks, assistantMessageId]);

   const handleThumbsUp = () => {
      if (conversationId) {
         sendFeedback({
            isValuable: true,
            userComment: "",
            assistantMessageId,
            conversationId,
         });
         setSelected("up");
      }
   };

   const handleThumbsDown = () => {
      if (conversationId) {
         sendFeedback({
            isValuable: false,
            userComment: comment,
            assistantMessageId,
            conversationId,
         });
         setSelected("down");
         setComment("");
         setIsPopoverOpen(false); // Close popover after sending feedback
      }
   };

   return (
      <div className="flex gap-2">
         <Button
            className="flex h-7 w-7 items-center justify-center p-1"
            variant="ghost"
            onClick={handleThumbsUp}
         >
            <ThumbsUp
               fill={selected === "up" ? "currentColor" : "none"}
               stroke="currentColor"
            />
         </Button>

         <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
               <Button
                  className="flex h-7 w-7 items-center justify-center p-1"
                  variant="ghost"
                  onClick={() => setIsPopoverOpen(true)}
               >
                  <ThumbsDown
                     fill={selected === "down" ? "currentColor" : "none"}
                     stroke="currentColor"
                  />
               </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96 p-4">
               <h2 className="text-md mb-1">Provide Feedback</h2>
               <Textarea
                  placeholder="Tell us why... (optional)"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="resize-none"
               />
               <Button
                  className="mt-2 w-full bg-gray-600"
                  onClick={handleThumbsDown}
                  disabled={isPending}
               >
                  Submit
               </Button>
            </PopoverContent>
         </Popover>
      </div>
   );
};
