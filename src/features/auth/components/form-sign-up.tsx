import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  useForm,
  UseFormRegisterReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../schemas/forms-schema";

function FormSignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      birthdate: new Date(),
      password: "",
      passwordConfirmation: "",
    },
    resolver: zodResolver(signUpSchema),
  });
  return (
    <div className="h-full flex items-center  flex-col p-4 gap-6 justify-center">
        <h1 className="font-semibold max-xs:text-2xl  max-xl:text-4xl   text-primary-400 mx-auto">Crea una cuenta</h1>

      <form
        onSubmit={handleSubmit((data) => console.log(data))}
        className="h-auto flex flex-col @max-sm:w-full     gap-6 overflow-y-auto"
      >
        <div className="flex max-xs:flex-col items-center   gap-6">
          <FormField
            type="text"
            placeholder="Nombre"
            register={register("firstName")}
            error={errors.firstName}
            className="max-md:w-full"
          />
          <FormField
            type="text"
            placeholder="Apellido"
            register={register("lastName")}
            error={errors.lastName}
            className="max-md:w-full"

          />
        </div>
        <FormField
        className="w-full"
          type="email"
          placeholder="Email"
          register={register("email")}
          error={errors.email}
        />
        <FormField
        className="w-full"
          type="date"
          placeholder="Fecha de nacimiento"
          register={register("birthdate")}
          error={errors.birthdate}
        />
        <FormField
        className="w-full"
          type="password"
          placeholder="Contraseña"
          register={register("password")}
          error={errors.password}
        />
        <FormField
        className="w-full"
          type="password"
          placeholder="Confirmar contraseña"
          register={register("passwordConfirmation")}
          error={errors.passwordConfirmation}
        />
        <Button type="submit" label="Registrarse" />
      </form>
    </div>
  );
}

type ButtonProps = {
  type: "submit" | "button";
  label: string;
  className?: string;
  onClick?: VoidFunction;
};

function Button({ type, label, onClick, className }: ButtonProps) {
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

export default FormSignUp;
