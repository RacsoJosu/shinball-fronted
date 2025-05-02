import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLoginMutation } from "@/features/auth/hooks/auth-hooks";
import { Button } from "@/shared/components/button";
import {
  FormContent,
  FormField,

  InputForm,
  Label,
} from "@/shared/components/form.components";

import { InfoUserType } from "@/stores/auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouteLoaderData } from "react-router-dom";

import { z } from "zod";
import { updateInfoUser } from "../schemas/perfil.schemas";
import { differenceInYears, format, formatDistanceToNow, parseISO } from "date-fns";
import { es } from 'date-fns/locale'

function Perfil() {
  const userData = useRouteLoaderData("root") as InfoUserType;
  const birthDate = parseISO(userData.birthDate);
  const createdAt = parseISO(userData.createdAt);

  const birthDateFormatted = format(birthDate, "dd/MM/yy");
  const age = differenceInYears(new Date(), birthDate);
  const createdAgo = formatDistanceToNow(createdAt, { addSuffix: true, locale: es })

  return (
    <div className="w-full flex items justify-around p-8 h-full gap-8">

      <div className=" shadow-lg   border-1 w-[300px] rounded-xl flex flex-col gap-8 items-center justify-start ">

        <div className="flex flex-col items-center h-1/2 justify-center gap-2">
          <img src="/public/icon.png" alt="" className="rounded-full size-20" />
          <p className="text-center font-medium text-xl">{userData.name}</p>
          <p className="text-center font-normal text-md text-gray-400"><span className="font-semibold"> </span>{ userData.email}</p>


        </div>

        <div className="flex flex-col items-center gap-2 h-1/2">



          <div
          className="flex flex-col gap-2"
          >
            <div className=" flex flex-col items-center justify-center ">
              <span className="font-semibold"> Fecha de nacimiento:</span>
            <p className="text-center font-normal text-md">{birthDateFormatted}</p>

            </div>


            <div className=" flex flex-col items-center justify-center ">
              <span className="font-semibold"> Edad:</span>
              <p className="text-center font-normal text-md">{age}{" Años" }</p>

            </div>


            <div className=" flex flex-col items-center justify-center ">
              <span className="font-semibold"> Creado: </span>

            <p className="text-center font-normal text-md">{createdAgo}</p>
            </div>


          </div>

        </div>



      </div>
      <Tabs
        defaultValue="actualizar"
        className="w-1/2 flex justify-center items-center"
      >
        <TabsList className="w-full">
          <TabsTrigger value="actualizar" className="">
            Actualizar
          </TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="actualizar" className="h-auto">
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
    <div className="h-full justify-center   flex flex-col  items-center">
      <form
        className="

      flex flex-col gap-6 justify-center items-center min-w-[400px]
      "
        onSubmit={handleSubmit((values) => onSubmit(values))}
      >

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

          disabled={loginMutation.isPending}
          className={`${
            loginMutation.isPending ? "bg-gray-300 text-gray-400" : ""
          }`}
        >{loginMutation.isPending ? "Actualizando..." : "Actualizar"}</Button>
      </form>
    </div>
  );
}

export default Perfil;
