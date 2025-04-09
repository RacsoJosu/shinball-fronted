import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../schemas/forms-schema";
import { FormField, InputForm, Label } from "@/shared/components/form.components";
import { Button } from "@/shared/components/button";


import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

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
      <h1 className="font-semibold max-xs:text-2xl  max-xl:text-4xl   text-primary-400 mx-auto">
        Crea una cuenta
      </h1>

      <form
        onSubmit={handleSubmit((data) => console.log(data))}
        className="h-auto flex flex-col @max-sm:w-full     gap-6 "
      >
        <div className="flex max-xs:flex-col items-center   gap-6">
          <FormField error={errors.firstName}>
            <Label
              forHtml="nombre"
              name="Nombres"
              clasName=""
              key={"nombre"}

            />

            <InputForm
              type="text"
              placeholder="Joe"
              register={register("firstName")}
              className="max-md:w-full"
            />
          </FormField>
          <FormField error={errors.lastName}>
            <Label
              forHtml="apellido"
              name="Apellidos"
              clasName=""
              key={"apellido"}

            />
            <InputForm
              type="text"
              placeholder="Doe"
              register={register("lastName")}
              className="max-md:w-full"
            />
          </FormField>
        </div>
        <FormField error={errors.email}>
          <Label
              forHtml="email"
              name="Email"
              clasName=""
              key={"email"}

            />
          <InputForm
            className="w-full"
            type="email"
            placeholder="prueba@email.com"
            register={register("email")}
          />
        </FormField>
        <FormField error={errors.birthdate}>
          <Label
              forHtml="Fecha de nacimiento"
              name="Fecha de nacimiento"
              clasName=""
              key={"Fecha de nacimiento"}

            />
          <DatePickerDemo/>
        </FormField>
        <FormField error={errors.password} >

        <Label
              forHtml="contraseña"
              name="Contraseña"
              clasName=""
              key={"contraseña"}

            />
        <InputForm
          className="w-full"
          type="password"
          placeholder="Escribe la contraseña"
          register={register("password")}
        />
        </FormField>
        <FormField error={errors.passwordConfirmation}>
          <Label
              forHtml="confirmar contraseña"
              name="Confirmar contraseña"
              clasName=""
              key={"confirmar contraseña"}

            />
          <InputForm
            className="w-full"
            type="password"
            placeholder="Confirma la contraseña"
            register={register("passwordConfirmation")}
          />
        </FormField>
        <Button type="submit" >Registrarse</Button>
      </form>
    </div>
  );
}



export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          className={cn(
            "w-full justify-start items-center text-left  hover:bg-white bg-white shadow-none border-2 font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Selecciona una fécha</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent  className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export default FormSignUp;
