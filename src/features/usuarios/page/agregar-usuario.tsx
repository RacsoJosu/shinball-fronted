import { useSignUpMutation } from "@/features/auth/hooks/auth-hooks";
import { format } from "date-fns";
import { z } from "zod";
import FormUser from "../components/form-user";
import { addUserSchema } from "../schemas/perfil.schemas";

function AgregarUsuario() {
  const singunpMutation = useSignUpMutation();
  async function onSubmit(data: z.infer<typeof addUserSchema>): Promise<void> {
    const formData = {
      ...data,
      birthDate: data.birthDate ? format(data.birthDate, "yyyy-MM-dd") : null,
    };

    await singunpMutation.mutateAsync(formData);
  }
  return (
    <div className="h-auto w-full flex flex-col gap-12  ">
      <h1 className="font-semibold text-3xl  min-md:text-4xl   text-primary-400 text-start">
        Agregar
      </h1>
      <FormUser onSubmit={onSubmit} isDisabled={singunpMutation.isPending} />
    </div>
  );
}

export default AgregarUsuario;
