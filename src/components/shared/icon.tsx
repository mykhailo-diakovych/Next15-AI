import { type SVGProps } from "react";
import spriteHref from "public/sprite.svg";

export function Icon({
   name,
   ...props
}: SVGProps<SVGSVGElement> & {
   name: string;
}) {
   return (
      <svg {...props}>
         <use href={`${spriteHref.src}#${name}`} />
      </svg>
   );
}
