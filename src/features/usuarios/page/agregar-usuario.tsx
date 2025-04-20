import FormAddUser from "../components/form-add-user";

function AgregarUsuario() {
  return (
    <div className="h-auto w-full flex flex-col gap-12  ">
        <h1 className="font-semibold max-xs:text-2xl  max-xl:text-4xl   text-primary-400 text-start">
          Agregar
        </h1>
        <FormAddUser />

    </div>
  );
}

export default AgregarUsuario;
