import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLoginMutation } from "@/features/auth/hooks/auth-hooks";
// import { loginUserSchema } from "@/features/auth/schemas/forms-schema";
import { Button } from "@/shared/components/button";
import {
  FormContent,
  FormField,
  FormHeader,
  FormTitle,
  InputForm,
  Label,
} from "@/shared/components/form.components";

import { InfoUserType } from "@/stores/auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouteLoaderData } from "react-router-dom";
// import { toast } from "react-toastify";
import { z } from "zod";
import { updateInfoUser } from "../schemas/perfil.schemas";

function Perfil() {
  return (
    <div className="w-full flex justify-center p-8 h-full">
      <Tabs
        defaultValue="account"
        className="w-1/2 flex justify-center items-center"
      >
        <TabsList className="w-full h-12">
          <TabsTrigger value="account" className="">
            Account
          </TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <UpdateAccountForm />
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}

function UpdateAccountForm() {
  const userData = useRouteLoaderData("root") as InfoUserType;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: userData.email,
      fullName: userData.name,
    },
    resolver: zodResolver(updateInfoUser),
  });

  const loginMutation = useLoginMutation();

  async function onSubmit(params: z.infer<typeof updateInfoUser>) {
    alert({ ...params });
    // await loginMutation.mutateAsync({ ...params }, {
    //   onSuccess: () => {
    //     toast.success("Información actualizada correctamente");
    //   },
    // });
  }
  return (
    <div className="h-full p-8  flex flex-col  items-center">
      <form
        className="

      flex flex-col gap-6 justify-center items-center min-w-[400px]
      "
        onSubmit={handleSubmit((values) => onSubmit(values))}
      >
        <FormHeader>
          <FormTitle title="Actualiza tu información" />
        </FormHeader>
        <FormContent

        >
          <FormField

            error={errors.fullName}>
            <Label
              forHtml="fullName"
              name="Nombre Completo"
              key="fullName-label"
              clasName=""
            />
            <InputForm
              placeholder="correo@example.com"
              register={register("fullName")}
              type="fullName"
              key="fullName-inputForm"
              className="w-full"
            />
          </FormField>
          <FormField error={errors.email}>
            <Label forHtml="email" name="Email" key="email-label" clasName="" />
            <InputForm
              placeholder="correo@example.com"
              register={register("email")}
              type="text"
              key="email-inputForm"
              className="w-full"
            />
          </FormField>
        </FormContent>

        <Button
          type="submit"
          label={loginMutation.isPending ? "Actualizando..." : "Actualizar"}
          disabled={loginMutation.isPending}
          className={`${
            loginMutation.isPending ? "bg-gray-300 text-gray-400" : ""
          }`}
        />
      </form>
    </div>
  );
}

export default Perfil;
