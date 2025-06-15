import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import FormAEditUser from "../components/form-edit-user";
import { getUserByIdQueryOptions } from "../hooks/users-queries";
// import { UserType } from "../types/users-types"

function Editar() {
  const { idUser } = useParams();
  const data = useSuspenseQuery({ ...getUserByIdQueryOptions(idUser ?? "") });
  // const data = useLoaderData() as UserType

  return (
    <div className="h-auto w-full flex flex-col gap-12  ">
      <h1 className="font-semibold text-3xl  min-md:text-4xl   text-primary-400 text-start">
        Agregar
      </h1>
      <FormAEditUser data={data.data.data.data} />
    </div>
  );
}

export default Editar;
