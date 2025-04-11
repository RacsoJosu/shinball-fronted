import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../schemas/forms-schema";
import {
  FormField,
  InputForm,
  Label,
} from "@/shared/components/form.components";
import { Button } from "@/shared/components/button";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { z } from "zod";
import { useSignUpMutation } from "../hooks/auth-hooks";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

function FormSignUp() {
  const navigate = useNavigate();
  const location = useLocation()
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      birthDate: undefined,
      password: "",
      passwordConfirmation: "",
    },
    resolver: zodResolver(signUpSchema),
  });
  const singunpMutation = useSignUpMutation();
console.log(location.pathname)
  function onSubmit(data: z.infer<typeof signUpSchema>): void {
    const formData = {
      ...data,
      birthDate: data.birthDate ? format(data.birthDate, "yyyy-MM-dd") : null,
    };



    singunpMutation.mutate(formData, {
      onSuccess: ({ data }) => {
        toast.success(data.message);
        if (location.pathname === "/sign-up") {
          navigate("/login");

        } else {
          navigate("/usuarios");

         }
      },
    });
  }

  return (
    <div className="h-full flex items-center  flex-col p-4 gap-6 justify-center">
      <h1 className="font-semibold max-xs:text-2xl  max-xl:text-4xl   text-primary-400 mx-auto">
        Crea una cuenta
      </h1>

      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-auto flex flex-col @max-sm:w-full     gap-6 "
        >
          <div className="flex max-xs:flex-col items-center   gap-6">
            <FormField error={form.formState.errors.firstName}>
              <Label
                forHtml="nombre"
                name="Nombres"
                clasName=""
                key={"nombre"}
              />

              <InputForm
                type="text"
                placeholder="Joe"
                register={form.register("firstName")}
                className="max-md:w-full"
              />
            </FormField>
            <FormField error={form.formState.errors.lastName}>
              <Label
                forHtml="apellido"
                name="Apellidos"
                clasName=""
                key={"apellido"}
              />
              <InputForm
                type="text"
                placeholder="Doe"
                register={form.register("lastName")}
                className="max-md:w-full"
              />
            </FormField>
          </div>
          <FormField error={form.formState.errors.email}>
            <Label forHtml="email" name="Email" clasName="" key={"email"} />
            <InputForm
              className="w-full"
              type="email"
              placeholder="prueba@email.com"
              register={form.register("email")}
            />
          </FormField>
          <FormField error={form.formState.errors.birthDate}>
            <Label
              forHtml="Fecha de nacimiento"
              name="Fecha de nacimiento"
              clasName=""
              key={"Fecha de nacimiento"}
            />
            <DatePickerDemo />
          </FormField>
          <FormField error={form.formState.errors.password}>
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
              register={form.register("password")}
            />
          </FormField>
          <FormField error={form.formState.errors.passwordConfirmation}>
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
              register={form.register("passwordConfirmation")}
            />
          </FormField>
          <Button
            type="submit"
            className={`${
              form.formState.isSubmitted
                ? "bg-gray-300 text-gray-400 hover:none"
                : ""
            }`}
            disabled={form.formState.isSubmitted}
          >
            Registrarse
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}

export function DatePickerDemo() {
  const form = useFormContext();
  const [date, setDate] = useState<Date>();

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    form.setValue("birthDate", selectedDate, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          className={cn(
            "w-full justify-start items-center text-black text-left focus-within:border-2 focus-within:border-[#6fafdad8] hover:bg-gray-100 bg-gray-50 shadow-none border-2 font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "PPP", { locale: es })
          ) : (
            <span>Selecciona una fecha</span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="min-w-[480px] p-0">
        <Calendar
          className="w-[480px]"
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          locale={es}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
export default FormSignUp;
