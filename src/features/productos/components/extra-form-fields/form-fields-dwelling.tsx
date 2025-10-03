import { FormField, InputForm, Label } from "@/shared/components/form.components";
import { useFormContext } from "react-hook-form";
import { Fragment } from "react/jsx-runtime";
import { FormDwellingSchema } from "../../types/productos.types";

function FormFieldDwelling({ isDisabled }: { isDisabled: boolean }) {
  const form = useFormContext<FormDwellingSchema>();

  return (
    <Fragment>
      <FormField error={form.formState.errors.city}>
        <Label forHtml="ciudad" name="Ciudad" clasName="" key={"ciudad"} />

        <InputForm
          id="ciudad"
          type="text"
          disabled={isDisabled}
          placeholder="Ciudad"
          register={form.register("city")}
          className="w-full"
        />
      </FormField>
      <FormField error={form.formState.errors.address}>
        <Label forHtml="direccion" name="Dirección" clasName="" key={"direccion"} />

        <InputForm
          type="text"
          id="direccion"
          disabled={isDisabled}
          placeholder="direccion"
          register={form.register("address")}
          className="w-full"
        />
      </FormField>
      <FormField error={form.formState.errors.country}>
        <Label forHtml="pais" name="Pais" clasName="" key={"Pais"} />

        <InputForm
          type="text"
          id="pais"
          disabled={isDisabled}
          placeholder="Pais"
          register={form.register("country")}
          className="w-full"
        />
      </FormField>

      <FormField error={form.formState.errors.latitude}>
        <Label forHtml="latitude" name="Latitude" key={"latitude"} />

        <InputForm
          type="text"
          id="latitude"
          disabled={isDisabled}
          placeholder="Latitude"
          register={form.register("latitude")}
          className="w-full"
        />
      </FormField>

      <FormField error={form.formState.errors.longitude}>
        <Label forHtml="longitude" name="longitude" clasName="" key={"longitude"} />

        <InputForm
          type="text"
          id="longitude"
          disabled={isDisabled}
          placeholder="Longitude"
          register={form.register("longitude")}
          className="w-full"
        />
      </FormField>
    </Fragment>
  );
}

export default FormFieldDwelling;
