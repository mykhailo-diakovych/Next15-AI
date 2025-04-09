"use client";

import React from "react";

import { useMicrosoftAuth } from "@auth/hooks/useMicrosoftAuth";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/shared/icon";

interface LoginButtonProps {
   iconName?: string;
   buttonText?: string;
   variant?: "outline" | "default" | "ghost";
   className?: string;
}

export const LoginButton = ({
   iconName = "microsoft-icon",
   buttonText = "Login With Microsoft",
   variant = "outline",
   className = "flex w-full max-w-md items-center justify-center gap-4 text-lg",
}: LoginButtonProps) => {
   const { handleLogin } = useMicrosoftAuth();

   return (
      <Button onClick={handleLogin} variant={variant} className={className}>
         <Icon name={iconName} />
         <span>{buttonText}</span>
      </Button>
   );
};
