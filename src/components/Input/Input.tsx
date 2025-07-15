import { forwardRef, type InputHTMLAttributes } from "react";

type InputProps = {
  label?: string;
  errorMessage?: string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef(
  (
    { label, errorMessage, className, ...props }: InputProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const hasError = !!errorMessage?.length;

    return (
      <label className="block">
        {(label || hasError) && (
          <div className="flex justify-between">
            {label && (
              <span
                className={`block mb-1 font-semibold text-gray-700 ${
                  hasError ? "text-red-600" : ""
                }`}
              >
                {label}
              </span>
            )}
            {hasError && (
              <span className="mt-1 text-sm text-red-600" role="alert">
                {errorMessage}
              </span>
            )}
          </div>
        )}
        <div className="">
          <input
            ref={ref}
            className={`w-full rounded-md border px-3 py-2 placeholder-gray-400 
              focus:outline-none focus:ring focus:ring-slate-500 
              ${hasError ? "border-red-600" : "border-gray-300"} 
              ${className}`}
            {...props}
          />
        </div>
      </label>
    );
  }
);

export default Input;
