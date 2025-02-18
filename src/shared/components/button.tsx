import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type ButtonProps = {
  type: "submit" | "button";
  label?: string;
  className?: string;
  onClick?: VoidFunction;
};

export function Button({ type, label, onClick, className, children, ...rest }: ButtonProps & PropsWithChildren & React.ButtonHTMLAttributes<HTMLButtonElement>) {

  return (
    <button
      {...rest}
      onClick={onclick ? onClick : undefined}
      type={type}
      className={cn(`w-full cursor-pointer mt-2 hover:bg-primary-500 bg-primary-400 text-white p-2.5 rounded-md shadow-md`, className)}
    >

      {label ? label : children}
    </button>
  );
}
