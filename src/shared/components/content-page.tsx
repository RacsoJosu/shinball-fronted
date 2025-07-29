import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export function ContentPage({
  children,
  className,
  ...props
}: PropsWithChildren &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-4 flex-1 ", className)} {...props}>
      {children}
    </div>
  );
}
