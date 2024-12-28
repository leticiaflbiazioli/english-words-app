import { JSX } from "react";

interface ButtonProps {
  text: string;
  action?: () => void;
  className?: string;
}

export function Button({ text, action, className }: ButtonProps): JSX.Element {
  return (
    <button
      type="submit"
      className={`bg-[#19c1ce] hover:bg-slate-300 text-white font-bold py-2 px-4 rounded ${className}`}
      onClick={action}
    >
      {text}
    </button>
  );
}
