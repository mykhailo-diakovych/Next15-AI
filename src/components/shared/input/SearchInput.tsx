import React, { ChangeEvent } from "react";

import { Icon } from "@components/shared/icon";
import { Input } from "@components/ui/input";

interface SearchInputProps {
   placeholder?: string;
   value?: string;
   onChange?: (value: string) => void;
   className?: string;
   iconClassName?: string;
   inputClassName?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
   placeholder = "Search...",
   value = "",
   onChange,
   className = "",
   iconClassName = "",
   inputClassName = "",
}) => {
   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
   };

   return (
      <div className={`relative flex w-full items-center ${className}`}>
         <div className={`absolute left-3 ${iconClassName}`}>
            <Icon name="search" className={`size-4 ${iconClassName}`} />
         </div>
         <Input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            className={`pl-8 ${inputClassName}`}
         />
      </div>
   );
};
