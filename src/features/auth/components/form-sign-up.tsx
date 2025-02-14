import {
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../schemas/forms-schema";
import { Button, FormField } from "@/shared/components/form.components";

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


export default FormSignUp;
