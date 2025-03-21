import { InputHTMLAttributes } from "react";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="disabled:bg-gray-300/70 disabled:text-gray-500 disabled:placeholder:text-gray-400 disabled:outline-0 block w-full rounded-md bg-gray-200/70 px-3 py-1.5 text-base text-gray-900 outline-gray-300 placeholder:text-gray-500 placeholder:tracking-wide placeholder:text-xs focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-xs/6"
    />
  );
}
