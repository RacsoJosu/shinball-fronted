import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { FormField, InputForm, Label } from "@/shared/components/form.components";

import { cn } from "@/lib/utils";
import Form from "@/shared/components/form";
import { basePropertySchema } from "../schemas/products.schema";

function FormProduct({ className }: { className: string }) {
  const form = useForm({
    defaultValues: {
      description: "",
      capacity: 1,
      type: "",
    },
    resolver: zodResolver(basePropertySchema),
  });

  return (
    <FormProvider {...form}>
      <Form
        onSubmit={form.handleSubmit(() => {})}
        className={cn(" grid grid-cols-1 min-xs:grid-cols-2 min-md:grid-cols-3 gap-8", className)}
      >
        <FormField error={form.formState.errors.description}>
          <Label forHtml="description" name="description" clasName="" key={"description"} />

          <InputForm
            type="text"
            placeholder="Joe"
            register={form.register("description")}
            className="w-full"
          />
        </FormField>

        {/* <Button
          type="submit"
          className={`min-xs:col-end-3 min-md:col-end-4 `}
          //  ${
          // false ? "bg-gray-300 text-gray-400 hover:none" : ""
          // }

          disabled={false}
        >
          {"buttonText"}
        </Button> */}
      </Form>
    </FormProvider>
  );
}

export default FormProduct;
