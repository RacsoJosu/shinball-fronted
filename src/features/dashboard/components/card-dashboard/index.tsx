import { cn } from "@/lib/utils";
import { ComponentProps, PropsWithChildren } from "react";

function CardDashboard({ className, children, ...rest }: PropsWithChildren<ComponentProps<"div">>) {
  return (
    <div
      className={cn(
        "flex flex-col space-y-3 shadow-md border-1  rounded-md p-6 min-h-[200px]",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

function CardHeader({ className, children, ...rest }: PropsWithChildren<ComponentProps<"div">>) {
  return (
    <div className={cn("flex", className)} {...rest}>
      {children}
    </div>
  );
}

function CardContent({ className, children, ...rest }: PropsWithChildren<ComponentProps<"div">>) {
  return (
    <div className={cn("flex flex-col", className)} {...rest}>
      {children}
    </div>
  );
}

function CardFooter({ className, children, ...rest }: PropsWithChildren<ComponentProps<"div">>) {
  return (
    <div className={cn("flex flex-col", className)} {...rest}>
      {children}
    </div>
  );
}

CardDashboard.Header = CardHeader;
CardDashboard.Content = CardContent;
CardDashboard.Footer = CardFooter;

export default CardDashboard;
