import { useState } from "react";
import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk";

import { usePromptStore } from "@features/projects/[project-id]/store/prompt";

interface UseSpeechRecognitionReturn {
   isRecording: boolean;
   startRecording: () => void;
   stopRecording: () => void;
   error: string | null;
}

export const useSpeechRecognition = (): UseSpeechRecognitionReturn => {
   const [isRecording, setIsRecording] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const [recognizer, setRecognizer] =
      useState<SpeechSDK.SpeechRecognizer | null>(null);

   const updatePrompt = usePromptStore((state) => state.updatePrompt);

   const startRecording = () => {
      try {
         const subscriptionKey =
            process.env.NEXT_PUBLIC_SPEECH_SUBSCRIPTION_KEY;
         const serviceRegion = process.env.NEXT_PUBLIC_SPEECH_REGION;

         if (!subscriptionKey || !serviceRegion) {
            throw new Error("Speech service configuration is missing");
         }

         const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
            subscriptionKey,
            serviceRegion,
         );
         speechConfig.speechRecognitionLanguage = "en-US";

         // Enable noise suppression
         speechConfig.setProperty("3202", "true");

         // Configure auto-stop
         speechConfig.setProperty(
            SpeechSDK.PropertyId.SpeechServiceConnection_EndSilenceTimeoutMs,
            "3000",
         );

         const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
         const newRecognizer = new SpeechSDK.SpeechRecognizer(
            speechConfig,
            audioConfig,
         );

         newRecognizer.recognized = (s, e) => {
            if (e.result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
               updatePrompt(e.result.text);
            }
         };

         // Auto-stop on silence
         newRecognizer.sessionStopped = () => {
            setIsRecording(false);
         };

         newRecognizer.startContinuousRecognitionAsync(
            () => {
               setIsRecording(true);
               setError(null);
            },
            (error) => {
               setError(`Error starting recognition: ${error}`);
               setIsRecording(false);
            },
         );

         setRecognizer(newRecognizer);
      } catch (err) {
         setError(
            err instanceof Error ? err.message : "Failed to start recording",
         );
         setIsRecording(false);
      }
   };

   const stopRecording = () => {
      if (recognizer) {
         recognizer.stopContinuousRecognitionAsync(
            () => {
               setIsRecording(false);
               recognizer.close();
               setRecognizer(null);
            },
            (error) => {
               setError(`Error stopping recognition: ${error}`);
            },
         );
      }
   };

   return {
      isRecording,
      startRecording,
      stopRecording,
      error,
   };
};
