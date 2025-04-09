import { useRef } from "react";

export const useKeywordsRandomColors = () => {
   const tagsColors = ["#28A989", "#CC9D36", "#B750BD", "#7083DF"];
   const colorIndexRef = useRef(-1);

   const getNextColor = () => {
      colorIndexRef.current = (colorIndexRef.current + 1) % tagsColors.length;
      return tagsColors[colorIndexRef.current];
   };

   const resetColorIndex = () => {
      colorIndexRef.current = -1;
   };

   const toCapitalize = (str: string) => {
      return str
         .split(" ")
         .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
         .join(" ");
   };

   return { getNextColor, resetColorIndex, toCapitalize };
};
