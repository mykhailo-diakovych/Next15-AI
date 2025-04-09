import React from "react";

import { Icon } from "@components/shared/icon";

const withFeaturesLayout = <P extends object>(
   Component: React.ComponentType<P>,
) => {
   return function WrappedComponent(props: P) {
      return (
         <div className="flex h-dvh w-full flex-col items-center justify-center gap-12">
            <div className="flex flex-col items-center justify-center gap-8">
               <Icon name="logo" className="h-36 w-36" />
               <h1 className="text-7xl font-medium">VOLTQUANT</h1>
            </div>
            <Component {...props} />
         </div>
      );
   };
};

export default withFeaturesLayout;
