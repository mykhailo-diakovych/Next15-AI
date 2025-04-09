import React from "react";

import { useVoiceStore } from "@features/projects/[project-id]/store/voice";
import { useSpeechRecognition } from "@features/projects/[project-id]/hooks/useSpeechRecognition";
import { AnimatedMicButton } from "@features/projects/[project-id]/components/voice/AnimatedMicButton";
import { ThinkingStars } from "@features/projects/[project-id]/components/voice/ThinkingStars";

import { AudioVisualizer } from "@components/general/audio-visualizer/AudioVisualizer";

import "./voice.css";
import { cn } from "@utils/tailwindMerge";

export const ProjectVoice = () => {
   const isVoiceOpened = useVoiceStore((state) => state.isVoiceOpened);
   const isSpeaking = useVoiceStore((state) => state.isSpeaking);
   const isAudioReady = useVoiceStore((state) => state.isAudioReady);
   const audioElement = useVoiceStore((state) => state.audioElement);

   const { isRecording, startRecording, stopRecording } =
      useSpeechRecognition();

   const handleMicClick = () => {
      if (isRecording) {
         stopRecording();
      } else {
         startRecording();
      }
   };

   return (
      <section
         className={`absolute right-0 top-0 h-full w-[37rem] transform px-4 py-2 transition-all duration-300 ease-in-out ${
            isVoiceOpened ? "translate-x-0" : "translate-x-full"
         }`}
      >
         <div className="flex flex-col gap-16">
            <div className="flex flex-col items-center justify-center">
               <div className="voice-decor h-4 w-20 bg-black-bean" />
               <div className="h-[27rem] w-full rounded-md bg-black-bean p-1">
                  <div className="relative flex h-full flex-col items-center gap-4 overflow-hidden rounded-md p-5">
                     <div
                        className={cn("malachite-blob", {
                           animate: isSpeaking,
                        })}
                     />
                     <div
                        className={cn("turquoise-blob", {
                           animate: isSpeaking,
                        })}
                     />

                     <p className="text-md flex items-center justify-center gap-2 text-white">
                        <ThinkingStars />
                        Analysing Data
                     </p>

                     {isSpeaking && (
                        <AudioVisualizer
                           audioReady={isAudioReady}
                           audioElement={audioElement}
                        />
                     )}

                     {/*<div className="relative flex items-center justify-center rounded-md border-none p-5 text-center text-white">*/}
                     {/*   <div className="absolute inset-0 z-0 rounded-md bg-black-bean/20 backdrop-blur-lg"></div>*/}

                     {/*   <p className="z-10 max-w-80">*/}
                     {/*      This initiative involves the installation of six EV*/}
                     {/*      chargers*/}
                     {/*   </p>*/}
                     {/*</div>*/}
                  </div>
               </div>
            </div>

            <div className="flex items-center justify-center">
               <AnimatedMicButton
                  isRecording={isRecording}
                  onClick={handleMicClick}
               />
            </div>
         </div>
      </section>
   );
};
