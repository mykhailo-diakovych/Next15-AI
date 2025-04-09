import React from "react";
import Image from "next/image";

import { getUser } from "@auth/utils/getUser";

import { ORGANIZATION_CONFIGS, ORGANIZATIONS } from "@configs/constants";

export const Banner = () => {
   const sessionUser = getUser();

   const { title, description, logo } =
      ORGANIZATION_CONFIGS[sessionUser?.organizationId] ??
      ORGANIZATION_CONFIGS[ORGANIZATIONS.OCEANEERING];

   return (
      <section className="mb-24 flex w-full justify-center">
         <div className="flex w-full max-w-lg flex-col items-center gap-6">
            <div className="relative flex h-[90px] w-[90px] items-center justify-center rounded bg-white-smoke">
               <Image src={logo} alt={title} width={40} height={44} />
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
               <h2 className="text-3xl font-normal">{title}</h2>
               <p className="text-sm font-normal text-old-silver">
                  {description}
               </p>
            </div>
         </div>
      </section>
   );
};
