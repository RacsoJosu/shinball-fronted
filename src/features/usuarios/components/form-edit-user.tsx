import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { Button } from "@/shared/components/button";
import { FormField, InputForm, Label } from "@/shared/components/form.components";

import { format } from "date-fns";

import { DatePickerForm } from "@/shared/components/date-picker";
import Form from "@/shared/components/form";
import { useSignUpMutation } from "@features/auth/hooks/auth-hooks";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { z } from "zod";
import { addUserSchema } from "../schemas/perfil.schemas";
import { UserType } from "../types/users-types";

function FormAEditUser({ data }: { data: UserType }) {
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
      birthDate: data?.createdAt ? new Date(data.createdAt) : new Date(),
      password: "",
      passwordConfirmation: "",
    },
    resolver: zodResolver(addUserSchema),
  });
  const singunpMutation = useSignUpMutation();

  const [date, setDate] = useState<Date>();

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    form.setValue("birthDate", selectedDate || new Date(), {
      shouldValidate: true,
      shouldDirty: true,
    });
  };
  function onSubmit(data: z.infer<typeof addUserSchema>): void {
    const formData = {
      ...data,
      birthDate: data.birthDate ? format(data.birthDate, "yyyy-MM-dd") : null,
    };

    singunpMutation.mutate(formData, {
      onSuccess: ({ data }) => {
        toast.success(data.message);
        navigate("/usuarios");
      },
    });
  }

  return (
    <FormProvider {...form}>
      <Form
        onSubmit={() => onSubmit}
        className=" grid grid-cols-1 min-xs:grid-cols-2 min-md:grid-cols-3 gap-8"
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
        <Button
          type="submit"
          className={`min-xs:col-end-3 min-md:col-end-4  ${
            form.formState.isSubmitted ? "bg-gray-300 text-gray-400 hover:none" : ""
          }`}
          disabled={form.formState.isSubmitted}
        >
          Agregar
        </Button>
      </Form>
    </FormProvider>
  );
}

export default FormAEditUser;
