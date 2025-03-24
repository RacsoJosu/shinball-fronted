import { cn } from "@/lib/utils";
type InputTypeProps = {
  type: string;
  placeholder: string;
  className?: string;
};

function Input({
  type,
  placeholder,
  className,
  ...props
}: InputTypeProps & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "focus-within:outline-none  focus-within:border-2 focus-within:border-[#6fafdad8]  shadow-accent border-1  bg-gray-50 p-3.5 rounded-md ",
        className
      )}
      type={type}
      placeholder={placeholder}
    onChange={props.onChange}
      {...props}
    />
  );
}

export default Input;
