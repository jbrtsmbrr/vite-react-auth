import { InputHTMLAttributes, useState } from "react";
import { Input } from "./Input";
import { EyeClosed, EyeIcon } from "lucide-react";

export default function PasswordInput({
  type,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  const [showPassword, setShowPassword] = useState(false);

  function toggleShowPassword() {
    setShowPassword((prev) => !prev);
  }

  const afterElement = showPassword ? (
    <EyeIcon onClick={toggleShowPassword} size={24} className="transition-colors duration-200rounded-full p-1 text-gray-600 hover:text-gray-800 cursor-pointer" />
  ) : (
    <EyeClosed onClick={toggleShowPassword} size={24} className="transition-colors duration-200rounded-full p-1 text-gray-600 hover:text-gray-800 cursor-pointer" />
  );

  return <Input {...props} type={showPassword ? "text" : "password"} elementAfter={afterElement} />;
}
