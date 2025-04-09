import React, { useEffect, useState } from "react";
import { Pause } from "lucide-react";

import { Button } from "@components/ui/button";
import { Icon } from "@components/shared/icon";

import { cn } from "@utils/tailwindMerge";

interface AnimatedMicButtonProps {
   isRecording: boolean;
   onClick: () => void;
}

export const AnimatedMicButton = ({
   isRecording,
   onClick,
}: AnimatedMicButtonProps) => {
   const [volume, setVolume] = useState(0); // State to store the random volume value

   // Simulate random volume changes while recording
   useEffect(() => {
      let interval: NodeJS.Timeout;

      if (isRecording) {
         interval = setInterval(() => {
            // Generate a random volume value between 0 and 150
            const randomVolume = Math.floor(Math.random() * 150);
            setVolume(randomVolume);
         }, 100); // Update every 100ms for smooth animation
      } else {
         setVolume(0); // Reset volume when not recording
      }

      // Cleanup interval on unmount or when recording stops
      return () => clearInterval(interval);
   }, [isRecording]);

   return (
      <Button
         variant="ghost"
         onClick={onClick}
         className={cn(
            "relative flex size-[5rem] items-center justify-center rounded-full bg-transparent bg-gradient-to-b from-[#1CB240] to-[#13A19B] shadow-none",
            { "text-v-green-500": isRecording },
         )}
      >
         {/* Animated volume rings */}
         {isRecording && (
            <>
               {/* Ping ring with gradient */}
               <div
                  className="absolute h-full w-full animate-ping rounded-full opacity-20"
                  style={{
                     background:
                        "linear-gradient(180deg, #1CB240 0%, #13A19B 100%)",
                     maskImage:
                        "radial-gradient(circle, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)",
                     WebkitMaskImage:
                        "radial-gradient(circle, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)",
                  }}
               />

               {/* Scaling ring with gradient */}
               <div
                  className="absolute h-full w-full rounded-full transition-transform duration-150"
                  style={{
                     background:
                        "linear-gradient(180deg, #1CB240 0%, #13A19B 100%)",
                     maskImage:
                        "radial-gradient(circle, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)",
                     WebkitMaskImage:
                        "radial-gradient(circle, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)",
                     transform: `scale(${1 + Math.min(volume / 150, 1)})`,
                     opacity: 0.5,
                  }}
               />
            </>
         )}

         {/* Gradient border container */}
         <div className="relative flex size-[4.85rem] shrink-0 items-center justify-center rounded-full bg-white">
            <Icon
               name="micro"
               className={cn("!size-9 shrink-0 transition-all duration-300", {
                  "scale-0 opacity-0": isRecording,
                  "scale-100 opacity-100": !isRecording,
               })}
            />
            <Pause
               className={cn(
                  "absolute left-1/2 top-1/2 !size-9 shrink-0 -translate-x-1/2 -translate-y-1/2 transition-all duration-300",
                  {
                     "scale-100 opacity-100": isRecording,
                     "scale-0 opacity-0": !isRecording,
                  },
               )}
            />
         </div>
      </Button>
   );
};
