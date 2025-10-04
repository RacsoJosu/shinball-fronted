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
import { useAddProducto } from "../hooks/productos.mutations";
import {
  ENUM_TYPE_PROPERTIES_VALUES,
  propertySchema,
  TypeProperties,
} from "../schemas/products.schema";
import { FormFieldsExtra } from "./extra-form-fields";

function FormProduct({ className }: { className: string }) {
  const form = useForm<z.infer<typeof propertySchema>>({
    defaultValues: {
      type: undefined,
    },
    resolver: zodResolver(propertySchema),
  });
  const addProductoMutation = useAddProducto();
  const type = form.watch("type");
  return (
    <FormProvider {...form}>
      <Form
        onSubmit={form.handleSubmit(async (values) => {
          await addProductoMutation.mutateAsync(values);
        })}
        className={cn(" flex flex-col gap-8  h-dvh")}
      >
        <div
          className={cn(
            " grid flex-1 auto-rows-min grid-cols-1 min-xs:grid-cols-2 min-md:grid-cols-3 gap-8 gap-y-12 ",
            className
          )}
        >
          <FormField error={form.formState.errors.type}>
            <Label forHtml="type" name="type" clasName="" key={"type"} />
            <Select
              disabled={addProductoMutation.isPending}
              onValueChange={(value) => {
                form.setValue("type", value as TypeProperties);
                form.clearErrors();
              }}
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
          <FormField error={form.formState.errors.description}>
            <Label forHtml="descripcion" name="Descripción" clasName="" key={"description"} />

            <InputForm
              id="descripcion"
              type="text"
              autoComplete="new-password"
              disabled={addProductoMutation.isPending}
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
              autoComplete="new-capacidad"
              disabled={addProductoMutation.isPending}
              placeholder="Capacidad"
              onInput={(e) => {
                e.currentTarget.value = e.currentTarget.value
                  .replace(REGEX_ENUM.ONLY_LETTERS, "")
                  .replace(REGEX_ENUM.ONLY_SPECIALS, "");
              }}
              register={form.register("capacity", { valueAsNumber: true })}
              className="w-full"
            />
          </FormField>

          {type ? FormFieldsExtra[type](addProductoMutation.isPending) : null}
        </div>

        <div className=" flex w-full justify-end ">
          <Button
            type="submit"
            className={cn(
              `items-center w-full md:w-[300px]`,
              addProductoMutation.isPending && "bg-gray-300 text-gray-400 hover:none"
            )}
            disabled={addProductoMutation.isPending}
          >
            {"Agregar"}
          </Button>
        </div>
      </Form>
    </FormProvider>
  );
}

export default FormProduct;
