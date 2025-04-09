import { create } from "zustand";

interface State {
   isVoiceOpened: boolean;
   isSpeaking: boolean;
   isAudioReady: boolean;
   audioElement: HTMLAudioElement | null;
}

interface Action {
   setIsVoiceOpened: (isVoiceOpen: boolean) => void;
   setIsSpeaking: (isSpeaking: boolean) => void;
   setIsAudioReady: (isAudioReady: boolean) => void;
   setAudioElement: (audioElement: HTMLAudioElement) => void;
}

export const useVoiceStore = create<State & Action>((set) => ({
   isVoiceOpened: false,
   isSpeaking: false,
   isAudioReady: false,
   audioElement: null,
   setIsVoiceOpened: (isVoiceOpen) =>
      set(() => ({ isVoiceOpened: isVoiceOpen })),
   setIsSpeaking: (isSpeaking) => set(() => ({ isSpeaking: isSpeaking })),
   setIsAudioReady: (isAudioReady) =>
      set(() => ({ isAudioReady: isAudioReady })),
   setAudioElement: (audioElement) =>
      set(() => ({ audioElement: audioElement })),
}));
