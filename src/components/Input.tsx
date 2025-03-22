import React, { InputHTMLAttributes } from "react";

export function Input(
  props: InputHTMLAttributes<HTMLInputElement> & {
    elementBefore?: React.ReactNode;
    elementAfter?: React.ReactNode;
  }
) {
  return (
    <div className="flex items-center gap-2 relative">
      <span className="absolute left-3 z-50">{props.elementBefore}</span>
      <input
        {...props}
        className={`disabled:bg-gray-300/70 disabled:text-gray-500 disabled:placeholder:text-gray-400 disabled:outline-0 block w-full rounded-md bg-gray-200/70 px-3 py-1.5 text-base text-gray-900 outline-gray-300 placeholder:text-gray-500 placeholder:tracking-wide placeholder:text-xs focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-xs/6 ${
          props.elementBefore ? "pl-10" : ""
        }  
        ${props.elementAfter ? "pr-10" : ""}
        `}
      />
      <span className="absolute right-3">{props.elementAfter}</span>
    </div>
  );
}
