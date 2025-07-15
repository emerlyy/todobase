import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

const Button = ({ className = "", ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`bg-slate-500 hover:bg-slate-600 text-white font-medium
        text-sm rounded-md px-4 py-2 transition-colors duration-100 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    />
  );
};

export default Button;
