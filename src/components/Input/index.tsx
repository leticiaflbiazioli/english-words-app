import { JSX } from "react";

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  action: (e: any) => void;
  className?: string;
}

export function Input({
  type,
  placeholder,
  value,
  action,
  className,
}: InputProps): JSX.Element {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={action}
      required
      className={`bg-slate-50 font-bold py-2 px-4 rounded ${className}`}
    />
  );
}
