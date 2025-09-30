import { Title } from "@/shared/components/title";
import FormProduct from "../components/form-producto";

function AgregarProductos() {
  return (
    <div className="h-full flex flex-col gap-8">
      <Title title="Nuevo Producto" />
      <FormProduct className="" />
    </div>
  );
}

export default AgregarProductos;
