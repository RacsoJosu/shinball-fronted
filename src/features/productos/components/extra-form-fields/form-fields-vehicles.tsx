import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField, InputForm, Label } from "@/shared/components/form.components";
import { useFormContext } from "react-hook-form";
import { Fragment } from "react/jsx-runtime";
import { typeVehicle } from "../../schemas/products.schema";
import { FormVehiclesSchema } from "../../types/productos.types";

function FormFieldsVehicles({ isDisabled }: { isDisabled: boolean }) {
  const form = useFormContext<FormVehiclesSchema>();

  return (
    <Fragment>
      <FormField error={form.formState.errors.typeVehicle}>
        <Label forHtml="typeVehicle" name="Tipo de vehículo" clasName="" />
        <Select
          disabled={isDisabled}
          onValueChange={(value) => form.setValue("typeVehicle", value as typeVehicle)}
        >
          <SelectTrigger className="focus-within:outline-none  focus-within:border-3 focus-within:border-[#6fafdad8]  shadow-accent border-1  bg-gray-50 !w-full rounded-md !h-14 ">
            <SelectValue placeholder="Selecciona el tipo de vehículo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="MECHANICAL">Mecánico</SelectItem>
            <SelectItem value="ELECTRIC">Eléctrico</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

      <FormField error={form.formState.errors.brand}>
        <Label forHtml="brand" name="Marca" clasName="" />
        <InputForm
          type="text"
          disabled={isDisabled}
          id="brand"
          placeholder="Marca"
          register={form.register("brand")}
          className="w-full"
        />
      </FormField>

      <FormField error={form.formState.errors.model}>
        <Label forHtml="model" name="Modelo" clasName="" />
        <InputForm
          type="text"
          disabled={isDisabled}
          id="model"
          placeholder="Modelo"
          register={form.register("model")}
          className="w-full"
        />
      </FormField>
    </Fragment>
  );
}

export default FormFieldsVehicles;
