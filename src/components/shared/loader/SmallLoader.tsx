import { clsx } from "clsx";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import loaderAnimation from "public/animations/loader.json";

export const SmallLoader = ({ className = "" }) => {
   return (
      <div className="flex h-full max-h-20 max-w-20 items-center justify-center overflow-hidden">
         <Lottie
            animationData={loaderAnimation}
            loop
            autoPlay
            className={clsx("h-full w-full", className)}
         />
      </div>
   );
};
