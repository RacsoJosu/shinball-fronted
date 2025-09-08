import { useLoginMutation } from "@/features/auth/hooks/auth-hooks";
import { FormContent, FormField, InputForm, Label } from "@/shared/components/form.components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { updateInfoUser } from "../../schemas/perfil.schemas";

import { getAuthQueryOptions } from "@/features/auth/hooks/auth-queries";
import { Button } from "@/shared/components/button";
import { TabsContent } from "@radix-ui/react-tabs";
import { useSuspenseQuery } from "@tanstack/react-query";
import { z } from "zod";

// import { differenceInYears, format, formatDistanceToNow, parseISO } from "date-fns";
// import { es } from 'date-fns/locale'
function Informacion() {
  const { data: userData } = useSuspenseQuery(getAuthQueryOptions());
  // const birthDate = parseISO(userData.birthDate);
  // const createdAt = parseISO(userData.createdAt);

  // const birthDateFormatted = format(birthDate, "dd/MM/yy");
  // const age = differenceInYears(new Date(), birthDate);
  // const createdAgo = formatDistanceToNow(createdAt, { addSuffix: true, locale: es })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: userData?.data.data?.email,
      fullName: userData?.data.data?.name,
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
    <TabsContent value={"perfil"} className="">
      <div className="h-full justify-center   flex flex-col  items-center">
        <form
          className="

      flex flex-col gap-6 justify-center items-center min-w-[400px]
      "
          onSubmit={handleSubmit((values) => onSubmit(values))}
        >
          <FormContent>
            <FormField error={errors.fullName}>
              <Label forHtml="fullName" name="Nombre Completo" key="fullName-label" clasName="" />
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
            className={`${loginMutation.isPending ? "bg-gray-300 text-gray-400" : ""}`}
          >
            {loginMutation.isPending ? "Actualizando..." : "Actualizar"}
          </Button>
        </form>
      </div>
    </TabsContent>
  );
}
export default Informacion;
