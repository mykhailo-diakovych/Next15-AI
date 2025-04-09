import { type SVGProps } from "react";

export function Icon({
   name,
   ...props
}: SVGProps<SVGSVGElement> & {
   name: string;
}) {
   return (
      <svg {...props}>
         <use href={`/sprite.svg#${name}`} />
      </svg>
   );
}
