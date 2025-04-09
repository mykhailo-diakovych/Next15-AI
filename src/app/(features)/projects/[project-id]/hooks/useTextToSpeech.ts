import { useRef, useState } from "react";
import * as speechSdk from "microsoft-cognitiveservices-speech-sdk";

import { useVoiceStore } from "@features/projects/[project-id]/store/voice";

export const useTextToSpeech = (voice: string = "en-US-GuyNeural") => {
   const synthesizerRef = useRef<speechSdk.SpeechSynthesizer | null>(null);
   const audioElementRef = useRef<HTMLAudioElement>(new Audio());

   const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
   const [audioReady, setAudioReady] = useState<boolean>(false);

   const setSpeaking = useVoiceStore((state) => state.setIsSpeaking);
   const setIsAudioReady = useVoiceStore((state) => state.setIsAudioReady);
   const setAudioElement = useVoiceStore((state) => state.setAudioElement);

   const subscriptionKey = process.env.NEXT_PUBLIC_SPEECH_SUBSCRIPTION_KEY;
   const serviceRegion = process.env.NEXT_PUBLIC_SPEECH_REGION;

   const getSynthesizer = () => {
      if (!synthesizerRef.current) {
         const speechConfig = speechSdk.SpeechConfig.fromSubscription(
            subscriptionKey!,
            serviceRegion!,
         );
         speechConfig.speechSynthesisVoiceName = voice;
         synthesizerRef.current = new speechSdk.SpeechSynthesizer(
            speechConfig,
            null,
         );
      }
      return synthesizerRef.current;
   };

   const speak = (text: string) => {
      if (!text.trim()) return;

      if (isSpeaking) {
         stopSpeaking();
      }
      setIsSpeaking(true);
      setSpeaking(true);

      // Reset audioReady
      setAudioReady(false);
      setIsAudioReady(false);

      const audio = audioElementRef.current;
      setAudioElement(audioElementRef.current);
      const synthesizer = getSynthesizer();

      synthesizer.speakTextAsync(
         text,
         async (result) => {
            const audioData = result.audioData;
            const audioBlob = new Blob([audioData], { type: "audio/wav" });
            const url = URL.createObjectURL(audioBlob);

            audio.src = url;
            audio.addEventListener("loadeddata", () => {
               audio.play();

               // Signal audio is ready
               setAudioReady(true);
               setIsAudioReady(true);
               audio.onended = () => {
                  setIsSpeaking(false);

                  URL.revokeObjectURL(url);

                  //Reset audioReady
                  setAudioReady(false);
                  setIsAudioReady(false);
               };
            });
         },
         (error) => {
            console.error("Error during speech synthesis:", error);
            setIsSpeaking(false);
            setSpeaking(false);
            setAudioReady(false);
            setIsAudioReady(false);
         },
      );
   };

   const stopSpeaking = () => {
      const audio = audioElementRef.current;
      setAudioElement(audioElementRef.current);
      audio.pause();
      audio.currentTime = 0;
      setIsSpeaking(false);
      setSpeaking(false);
      setAudioReady(false);
      setIsAudioReady(false);
   };

   return { speak, stopSpeaking, isSpeaking, audioElementRef, audioReady };
};
