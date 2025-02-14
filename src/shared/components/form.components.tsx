import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegisterReturn,
} from "react-hook-form";

type ButtonProps = {
  type: "submit" | "button";
  label: string;
  className?: string;
  onClick?: VoidFunction;
};

export function Button({ type, label, onClick, className }: ButtonProps) {
  return (
    <button
      onClick={onclick ? onClick : undefined}
      type={type}
      className={`w-full mt-2 hover:bg-primary-500 bg-primary-400 text-white p-2.5 rounded-md shadow-md ${className}`}
    >
      {label}
    </button>
  );
}

type FormFieldProps = {
  type: string;
  register: UseFormRegisterReturn;
  placeholder: string;
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  className?: string;
};
export function FormField({
  type,
  register,
  placeholder,
  error, className
}: FormFieldProps) {
  return (
    <div className=" h-auto flex flex-col shrink-0 gap-1 items-start justify-center w-auto">
      <input
        className={`${className} focus-within:outline-none  focus-within:border-2 focus-within:border-cyan-700/50  shadow-xs shadow-gray-200   bg-gray-200 p-3.5 rounded-md `}
        type={type}
        placeholder={placeholder}
        {...register}
      />
      {error && (
        <span className="text-xs text-red-400">
          {error.message?.toString()}
        </span>
      )}
    </div>
  );
}
