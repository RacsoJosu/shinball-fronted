import { FormField, InputForm, Label } from "@/shared/components/form.components";
import { useFormContext } from "react-hook-form";
import { Fragment } from "react/jsx-runtime";
import { FormVehiclesSchema } from "../../types/productos.types";

function FormFieldsVehicles() {
  const form = useFormContext<FormVehiclesSchema>();
  return (
    <Fragment>
      <FormField error={form.formState.errors.description}>
        <Label forHtml="descripcion" name="descripcion" clasName="" key={"descripcion"} />

        <InputForm
          type="text"
          id="descripcion"
          placeholder="Descripcion"
          register={form.register("description")}
          className="w-full"
        />
      </FormField>
    </Fragment>
  );
}

export default FormFieldsVehicles;
