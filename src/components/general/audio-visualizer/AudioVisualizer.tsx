import React, { useCallback, useEffect, useRef } from "react";

interface IAudioVisualizerProps {
   audioElement: HTMLAudioElement | null;
   audioReady: boolean;
}

// Global cache to store MediaElementSourceNodes keyed by the HTMLMediaElement
const mediaElementSourceCache = new WeakMap<
   HTMLMediaElement,
   MediaElementAudioSourceNode
>();

let audioContext: AudioContext | null = null;

export const AudioVisualizer = ({
   audioElement,
   audioReady,
}: IAudioVisualizerProps) => {
   const canvasRef = useRef<HTMLCanvasElement>(null);
   const analyserRef = useRef<AnalyserNode | null>(null);
   const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
   const animationRef = useRef<number | null>(null);
   const dataArrayRef = useRef<Uint8Array | null>(null);

   const visualize = useCallback(() => {
      if (!analyserRef.current || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const canvasCtx = canvas.getContext("2d");
      const width = canvas.width;
      const height = canvas.height;

      if (!canvasCtx || !dataArrayRef.current) return;

      const renderFrame = () => {
         analyserRef.current!.getByteTimeDomainData(dataArrayRef.current!);
         canvasCtx.clearRect(0, 0, width, height);

         drawWaveVisualization(canvasCtx, width, height);

         animationRef.current = requestAnimationFrame(renderFrame);
      };

      renderFrame();
   }, []);

   useEffect(() => {
      if (!audioElement || !audioReady) return;

      // Create or reuse the AudioContext
      if (!audioContext) {
         audioContext = new AudioContext();
      }
      const audioCtx = audioContext;

      if (audioCtx.state === "suspended") {
         audioCtx.resume();
      }

      // Retrieve or create the MediaElementSource
      if (!mediaElementSourceCache.has(audioElement)) {
         mediaElementSourceCache.set(
            audioElement,
            audioCtx.createMediaElementSource(audioElement),
         );
      }
      sourceRef.current = mediaElementSourceCache.get(audioElement)!;

      // Set up analyser within the same context
      if (!analyserRef.current || analyserRef.current.context !== audioCtx) {
         analyserRef.current = audioCtx.createAnalyser();
         analyserRef.current.fftSize = 2048;
      }

      // Disconnect any existing connections
      sourceRef.current.disconnect();
      analyserRef.current.disconnect();

      // Connect nodes in the shared AudioContext
      sourceRef.current.connect(analyserRef.current);
      analyserRef.current.connect(audioCtx.destination);

      const bufferLength = analyserRef.current.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufferLength);

      visualize();

      return () => {
         if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
         }
         sourceRef.current?.disconnect();
         analyserRef.current?.disconnect();
      };
   }, [audioElement, audioReady, visualize]);

   const drawWaveVisualization = (
      canvasCtx: CanvasRenderingContext2D,
      width: number,
      height: number,
   ) => {
      if (!dataArrayRef.current) return;

      // Center line (vertical midpoint)
      const centerY = height / 2;

      // Set up the glowing green effect
      canvasCtx.strokeStyle = "#00FF80"; // Bright green color
      canvasCtx.lineWidth = 2;
      canvasCtx.shadowBlur = 10;
      canvasCtx.shadowColor = "#00FF80";

      // Horizontal spacing between samples
      const sliceWidth = width / (dataArrayRef.current.length - 1);

      // Begin drawing the waveform
      canvasCtx.beginPath();

      // Start the path from the left edge at the center
      canvasCtx.moveTo(0, centerY);

      // Draw the actual waveform
      for (let i = 0; i < dataArrayRef.current.length; i++) {
         // Convert the byte data (0-255) to a centered value (-1 to 1)
         const value = (dataArrayRef.current[i] - 128) / 128;

         // Calculate the y-position, centered at the middle
         const y = centerY + value * (height / 3); // Reduced amplitude to match image
         const x = i * sliceWidth;

         canvasCtx.lineTo(x, y);
      }

      // End the path at the right edge at the center
      canvasCtx.lineTo(width, centerY);

      // Render the stroke
      canvasCtx.stroke();
   };

   return (
      <div className="flex flex-col items-center">
         <canvas ref={canvasRef} width={500} height={200} />
      </div>
   );
};
