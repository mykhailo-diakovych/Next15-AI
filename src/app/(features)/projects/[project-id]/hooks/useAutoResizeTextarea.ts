import { useEffect } from "react";

export function useAutoResizeTextarea() {
   useEffect(() => {
      const textAreas = document.querySelectorAll("textarea");

      textAreas.forEach((textarea) => {
         const adjustHeight = () => {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
         };

         // Initial adjustment
         adjustHeight();

         // Add event listener
         textarea.addEventListener("input", adjustHeight);

         return () => {
            textarea.removeEventListener("input", adjustHeight);
         };
      });
   }, []);
}
