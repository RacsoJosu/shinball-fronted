import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { Button } from "@/shared/components/button";
import { FormField, InputForm, Label } from "@/shared/components/form.components";

import { cn } from "@/lib/utils";
import { DatePickerForm } from "@/shared/components/date-picker";
import Form from "@/shared/components/form";
import { useState } from "react";
import { addUserSchema, updateUserSchema } from "../schemas/perfil.schemas";
import { UserType } from "../types/users-types";

function FormUser({
  data,
  onSubmit,
  isDisabled,
  className,
  buttonText = "Agregar",
  render,
}: {
  render: () => JSX.Element;
  className?: string;
  data?: UserType;
  isDisabled: boolean;
  buttonText?: string;
  onSubmit: (
    data: {
      firstName: string;
      lastName: string;
      email: string;
      birthDate?: Date | null | undefined;
    } & {
      password: string;
      passwordConfirmation: string;
    }
  ) => void;
}) {
  const form = useForm({
    defaultValues: {
      firstName: data?.firstName ?? "",
      lastName: data?.lastName ?? "",
      email: data?.email ?? "",
      birthDate: data?.birthDate ? new Date(data.birthDate) : new Date(),
      password: "",
      passwordConfirmation: "",
    },
    resolver: data ? zodResolver(updateUserSchema) : zodResolver(addUserSchema),
  });

  const [date, setDate] = useState<Date | undefined>(
    data?.birthDate ? new Date(data.birthDate) : new Date()
  );

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    form.setValue("birthDate", selectedDate || new Date(), {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <FormProvider {...form}>
      <Form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(" grid grid-cols-1 min-xs:grid-cols-2 min-md:grid-cols-3 gap-8", className)}
      >
        <FormField error={form.formState.errors.firstName}>
          <Label forHtml="nombre" name="Nombres" clasName="" key={"nombre"} />

          <InputForm
            type="text"
            placeholder="Joe"
            register={form.register("firstName")}
            className="w-full"
          />
        </FormField>
        <FormField error={form.formState.errors.lastName}>
          <Label forHtml="apellido" name="Apellidos" clasName="" key={"apellido"} />
          <InputForm
            type="text"
            placeholder="Doe"
            register={form.register("lastName")}
            className=" w-full"
          />
        </FormField>

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
          <DatePickerForm date={date} handleDateChange={handleDateChange} />
        </FormField>
        <FormField error={form.formState.errors.password}>
          <Label forHtml="contraseña" name="Contraseña" clasName="" key={"contraseña"} />
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
        {render ? (
          render()
        ) : (
          <Button
            type="submit"
            className={`min-xs:col-end-3 min-md:col-end-4  ${
              isDisabled ? "bg-gray-300 text-gray-400 hover:none" : ""
            }`}
            disabled={isDisabled}
          >
            {buttonText}
          </Button>
        )}
      </Form>
    </FormProvider>
  );
}

export default FormUser;
