import { cn } from "@/lib/utils";
import { forwardRef, PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren & React.ButtonHTMLAttributes<HTMLButtonElement>
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ type, onClick, className, children, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClick ? onClick : undefined}
        type={type}
        className={cn(
          "w-full flex justify-center gap-4 cursor-pointer mt-2 hover:bg-primary-500 bg-primary-400 text-white p-2.5 rounded-md shadow-md",
          className
        )}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
