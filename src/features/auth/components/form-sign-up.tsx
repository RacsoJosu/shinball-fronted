import { Button } from "@/shared/components/button";
import { FormField, InputForm, Label } from "@/shared/components/form.components";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { signUpSchema } from "../schemas/forms-schema";

import { format } from "date-fns";

import { DatePickerForm } from "@/shared/components/date-picker";
import Form from "@/shared/components/form";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { z } from "zod";
import { useSignUpMutation } from "../hooks/auth-hooks";

function FormSignUp() {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      birthDate: new Date(),
      password: "",
      passwordConfirmation: "",
    },
    resolver: zodResolver(signUpSchema),
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
  function onSubmit(data: z.infer<typeof signUpSchema>): void {
    const formData = {
      ...data,
      birthDate: data.birthDate ? format(data.birthDate, "yyyy-MM-dd") : null,
    };

    singunpMutation.mutate(formData, {
      onSuccess: ({ data }) => {
        toast.success(data.message);
        navigate("/login");
      },
    });
  }

  return (
    <div className="h-full flex items-center  flex-col p-4 gap-6 justify-center">
      <h1 className="font-semibold max-xs:text-2xl  max-xl:text-4xl   text-primary-400 mx-auto">
        Crea una cuenta
      </h1>

      <FormProvider {...form}>
        <Form onSubmit={() => onSubmit} className="h-auto flex flex-col @max-sm:w-full gap-6 ">
          <div className="flex max-xs:flex-col items-center   gap-6">
            <FormField error={form.formState.errors.firstName}>
              <Label forHtml="nombre" name="Nombres" clasName="" key={"nombre"} />

              <InputForm
                type="text"
                placeholder="Joe"
                register={form.register("firstName")}
                className="max-md:w-full"
              />
            </FormField>
            <FormField error={form.formState.errors.lastName}>
              <Label forHtml="apellido" name="Apellidos" clasName="" key={"apellido"} />
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
            className={`${
              form.formState.isSubmitted ? "bg-gray-300 text-gray-400 hover:none" : ""
            }`}
            disabled={form.formState.isSubmitted}
          >
            Registrarse
          </Button>
        </Form>
      </FormProvider>
    </div>
  );
}

export default FormSignUp;
