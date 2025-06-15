import { useSignUpMutation } from "@/features/auth/hooks/auth-hooks";
import { useSuspenseQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useParams } from "react-router";
import { z } from "zod";
import FormUser from "../components/form-user";
import { getUserByIdQueryOptions } from "../hooks/users-queries";
import { addUserSchema } from "../schemas/perfil.schemas";

function Editar() {
  const { idUser } = useParams();
  const data = useSuspenseQuery({ ...getUserByIdQueryOptions(idUser ?? "") });
  const singunpMutation = useSignUpMutation();

  function onSubmit(data: z.infer<typeof addUserSchema>): void {
    const formData = {
      ...data,
      birthDate: data.birthDate ? format(data.birthDate, "yyyy-MM-dd") : null,
    };

    singunpMutation.mutate(formData);
  }

  return (
    <div className="h-auto w-full flex flex-col gap-12  ">
      <h1 className="font-semibold text-3xl  min-md:text-4xl   text-primary-400 text-start">
        Agregar
      </h1>
      <FormUser data={data.data.data.data} onSubmit={onSubmit} />
    </div>
  );
}

export default Editar;
