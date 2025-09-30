import { cn } from "@/lib/utils";
import { ComponentProps, PropsWithChildren } from "react";
import { FieldError, FieldErrorsImpl, Merge, UseFormRegisterReturn } from "react-hook-form";

type FormFieldProps = {
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
};
export function FormField({
  error,
  children,
  className,
}: FormFieldProps & PropsWithChildren<ComponentProps<"div">>) {
  return (
    <div
      className={cn(
        "h-fit flex flex-col shrink-0 gap-1 items-start justify-center w-auto",
        className
      )}
    >
      {children}

      {error && <span className="text-xs text-red-400">{error.message?.toString()}</span>}
    </div>
  );
}

type LabelPropsType = {
  name: string;
  forHtml: string;
  clasName?: string;
};

export function Label({ name, forHtml, clasName }: LabelPropsType) {
  return (
    <label htmlFor={forHtml} className={cn(" text-md font-medium", clasName)}>
      {name}
    </label>
  );
}

type InputTypeProps = {
  register: UseFormRegisterReturn;
} & PropsWithChildren<ComponentProps<"input">>;

export function InputForm({ type, register, placeholder, className, ...rest }: InputTypeProps) {
  return (
    <input
      className={cn(
        "focus-within:outline-none  focus-within:border-2 focus-within:border-[#6fafdad8] duration-300 shadow-accent border-1 transition-[color,box-shadow,border] bg-gray-50 p-3.5 rounded-md ",
        className
      )}
      type={type}
      placeholder={placeholder}
      {...register}
      {...rest}
    />
  );
}

export function FormHeader({ children }: PropsWithChildren) {
  return <div className="text-center">{children}</div>;
}

type FormHeaderType = {
  title: string;
};

export function FormTitle(props: FormHeaderType & React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1 className={cn("font-bold text-3xl text-primary-400", props.className)}>{props.title}</h1>
  );
}

export function FormContent({
  children,
  ...props
}: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {
  return (
    <div className="flex  w-full flex-col gap-6 " {...props}>
      {children}
    </div>
  );
}
