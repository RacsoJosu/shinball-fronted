import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type ButtonProps = {
  type: "submit" | "button";
  className?: string;
  onClick?: VoidFunction;
};

export function Button({ type, onClick, className, children, ...rest }: ButtonProps & PropsWithChildren & React.ButtonHTMLAttributes<HTMLButtonElement>) {

  return (
    <button
      {...rest}
      onClick={onClick ? onClick : undefined}
      type={type}
      className={cn(`w-full flex justify-center gap-4 cursor-pointer mt-2 hover:bg-primary-500 bg-primary-400 text-white p-2.5 rounded-md shadow-md`, className)}
    >

      {children}
    </button>
  );
}
