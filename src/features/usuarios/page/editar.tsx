import { useSuspenseQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useParams } from "react-router";
import { z } from "zod";
import FormUser from "../components/form-user";
import { useEditUserMutation } from "../hooks/users-mutation";
import { getUserByIdQueryOptions } from "../hooks/users-queries";
import { updateUserSchema } from "../schemas/perfil.schemas";

function Editar() {
  const { idUser } = useParams();
  const data = useSuspenseQuery({ ...getUserByIdQueryOptions(idUser ?? "") });
  const updateUser = useEditUserMutation();

  async function onSubmit(data: z.infer<typeof updateUserSchema>): Promise<void> {
    const formData = {
      ...data,
      birthDate: data.birthDate ? format(data.birthDate, "yyyy-MM-dd") : null,
    };

    await updateUser.mutateAsync({
      idUser: idUser ?? "",
      body: formData,
    });
  }

  return (
    <div className="h-auto w-full flex flex-col gap-12  ">
      <h1 className="font-semibold text-3xl  min-md:text-4xl   text-primary-400 text-start">
        Editar
      </h1>
      <FormUser
        data={data.data.data.data}
        onSubmit={onSubmit}
        isDisabled={updateUser.isPending}
        buttonText="Editar"
      />
    </div>
  );
}

export default Editar;
