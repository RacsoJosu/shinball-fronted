import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";
import { useFormContext } from "react-hook-form";

type FormProps = {
  onSubmit: VoidFunction;
} & PropsWithChildren &
  React.HTMLAttributes<HTMLFormElement>;
function Form({ children, className, onSubmit }: FormProps) {
  const form = useFormContext();
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className={cn(className)}>
      {children}
    </form>
  );
}

export default Form;
