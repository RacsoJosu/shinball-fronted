import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { FormField, InputForm, Label } from "@/shared/components/form.components";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn, REGEX_ENUM } from "@/lib/utils";
import Form from "@/shared/components/form";

import { Button } from "@/shared/components/button";
import z from "zod";
import {
  basePropertySchema,
  ENUM_TYPE_PROPERTIES_VALUES,
  propertySchema,
  TypeProperties,
} from "../schemas/products.schema";
import { FormFieldsExtra } from "./extra-form-fields";

function FormProduct({ className }: { className: string }) {
  const defaultValues: z.infer<typeof basePropertySchema> = {
    description: "",
    capacity: 1,
    type: null,
  };
  const form = useForm({
    defaultValues,
    resolver: zodResolver(propertySchema),
  });

  const type = form.watch("type");
  return (
    <FormProvider {...form}>
      <Form
        onSubmit={form.handleSubmit(() => {})}
        className={cn(
          " grid auto-rows-max  h-full grid-cols-1 min-xs:grid-cols-2 min-md:grid-cols-3 gap-8 ",
          className
        )}
      >
        <FormField error={form.formState.errors.description}>
          <Label forHtml="descripcion" name="Descripción" clasName="" key={"description"} />

          <InputForm
            id="descripcion"
            type="text"
            placeholder="Descripcion"
            register={form.register("description")}
            className="w-full"
          />
        </FormField>

        <FormField error={form.formState.errors.capacity}>
          <Label forHtml="capacidad" name="Capacidad" clasName="" key={"capacity"} />

          <InputForm
            type="text"
            id="capacidad"
            pattern={`${REGEX_ENUM.ONLY_NUMBERS}`}
            placeholder="Capacidad"
            onInput={(e) => {
              e.currentTarget.value = e.currentTarget.value.replace(REGEX_ENUM.ONLY_LETTERS, "");
            }}
            register={form.register("capacity", { valueAsNumber: true })}
            className="w-full"
          />
        </FormField>
        <FormField error={form.formState.errors.type}>
          <Label forHtml="type" name="type" clasName="" key={"type"} />
          <Select
            onValueChange={(value) => {
              form.setValue("type", value as TypeProperties);
            }}
            // {...form.register("type")}
          >
            <SelectTrigger
              className="focus-within:outline-none  focus-within:border-3 focus-within:border-[#6fafdad8]  shadow-accent border-1  bg-gray-50 !w-full rounded-md !h-14 "
              id={"type"}
            >
              <SelectValue placeholder="Selecciona el tipo de la propiedad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ENUM_TYPE_PROPERTIES_VALUES.DWELLING}>Vivienda</SelectItem>
              <SelectItem value={ENUM_TYPE_PROPERTIES_VALUES.VEHICLE}>Vehiculo</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
        {type ? FormFieldsExtra[type]() : null}
        <Button
          type="submit"
          className={`self-end min-xs:col-end-3 min-md:col-end-4 `}
          //  ${
          // false ? "bg-gray-300 text-gray-400 hover:none" : ""
          // }

          disabled={false}
        >
          {"Agregar"}
        </Button>
      </Form>
    </FormProvider>
  );
}

export default FormProduct;
