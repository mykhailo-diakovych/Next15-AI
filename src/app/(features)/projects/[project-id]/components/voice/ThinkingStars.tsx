import React, { useRef, useEffect } from "react";

export const ThinkingStars = ({ isThinking = false }) => {
   const largeStarRef = useRef<SVGPathElement | null>(null);
   const smallStarRef = useRef<SVGPathElement | null>(null);

   useEffect(() => {
      if (!largeStarRef.current || !smallStarRef.current) return;

      const largeStarAnimations = largeStarRef.current.querySelectorAll<
         SVGAnimateElement | SVGAnimateTransformElement
      >("animate, animateTransform");
      const smallStarAnimations = smallStarRef.current.querySelectorAll<
         SVGAnimateElement | SVGAnimateTransformElement
      >("animate, animateTransform");

      const controlAnimations = (
         animations: NodeListOf<SVGAnimateElement | SVGAnimateTransformElement>,
         shouldPlay: boolean,
      ) => {
         animations.forEach((anim) => {
            if (shouldPlay) {
               anim.beginElement();
            } else {
               anim.endElement();
            }
         });
      };

      controlAnimations(largeStarAnimations, isThinking);
      controlAnimations(smallStarAnimations, isThinking);
   }, [isThinking]);

   return (
      <svg
         width="21"
         height="20"
         viewBox="0 0 21 20"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
         className="overflow-visible"
      >
         <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
               <feGaussianBlur stdDeviation="1" result="blur" />
               <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
         </defs>

         <path
            ref={largeStarRef}
            d="M12.778 0.360219C12.9073 -0.120074 13.5887 -0.120073 13.718 0.360221C14.5613 3.49217 17.0077 5.9386 20.1397 6.78187C20.62 6.91119 20.62 7.59262 20.1397 7.72194C17.0077 8.56521 14.5613 11.0116 13.718 14.1436C13.5887 14.6239 12.9073 14.6239 12.778 14.1436C11.9347 11.0116 9.48826 8.56521 6.35631 7.72194C5.87602 7.59262 5.87602 6.91119 6.35631 6.78187C9.48826 5.9386 11.9347 3.49217 12.778 0.360219Z"
            fill="#09E497"
            filter="url(#glow)"
         >
            <animate
               attributeName="opacity"
               values="1;0.4;1"
               dur="2s"
               repeatCount="indefinite"
            />
            <animateTransform
               attributeName="transform"
               type="scale"
               values="1;0.85;1"
               dur="2s"
               repeatCount="indefinite"
               additive="sum"
            />
         </path>

         <path
            ref={smallStarRef}
            d="M4.70833 11.2235C4.78858 10.9255 5.21143 10.9255 5.29167 11.2235C5.81494 13.167 7.33302 14.6851 9.27648 15.2083C9.57451 15.2886 9.57451 15.7114 9.27648 15.7917C7.33302 16.3149 5.81494 17.833 5.29167 19.7765C5.21143 20.0745 4.78858 20.0745 4.70833 19.7765C4.18506 17.833 2.66698 16.3149 0.723526 15.7917C0.425491 15.7114 0.425491 15.2886 0.723526 15.2083C2.66698 14.6851 4.18506 13.167 4.70833 11.2235Z"
            fill="#09E497"
            filter="url(#glow)"
         >
            <animate
               attributeName="opacity"
               values="0.8;1;0.5;0.8"
               dur="1.5s"
               begin="0.5s"
               repeatCount="indefinite"
            />
            <animateTransform
               attributeName="transform"
               type="scale"
               values="1;1.15;0.9;1"
               dur="1.5s"
               begin="0.5s"
               repeatCount="indefinite"
               additive="sum"
            />
         </path>
      </svg>
   );
};
