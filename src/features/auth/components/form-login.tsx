import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { loginUserSchema } from "../schemas/forms-schema";
import { FormContent, FormField, FormHeader, FormTitle, InputForm, Label } from "@/shared/components/form.components";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/shared/components/button";
import { z } from "zod";
import { useLoginMutation } from "../hooks/auth-hooks";
import { toast } from "react-toastify";
import { useAuthStore } from "@/stores/auth.store";

function FormLogin() {
  const auth = useAuthStore()

   const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginUserSchema),
  });

  const loginMutation = useLoginMutation();

  async function onSubmit(params: z.infer<typeof loginUserSchema>) {
    await loginMutation.mutateAsync({ ...params }, {
      onSuccess: ({ data }) => {

      auth.setToken(data.data)
      toast.success("Login realizado correctamente");
      navigate("/dashboard");
    },
    });
  }
  return (
    <div className="h-full  flex flex-col justify-center items-center">
      <form
        className="
      flex flex-col gap-6 justify-center items-center
      "
        onSubmit={handleSubmit((values) => onSubmit(values))}
      >
        <FormHeader>
          <FormTitle title="Bienvenido a Shinball Admin." />
          <p>
            ¿No tienes una cuenta?{" "}
            <Link
              to={"/sign-up"}
              className="underline underline-offset-4 text-primary-400"
            >
              {" "}
              Registrate
            </Link>
          </p>
        </FormHeader>
        <FormContent>
          <FormField error={errors.email}>
            <Label forHtml="email" name="Email" key="email-label" clasName="" />
            <InputForm
              placeholder="correo@example.com"
              register={register("email")}
              type="text"
              key="email-inputForm"
              className="w-full"
            />
          </FormField>

          <FormField error={errors.password}>
            <Label
              forHtml="password"
              name="Contraseña"
              key="password-label"
              clasName=""
            />
            <InputForm
              placeholder="correo@example.com"
              register={register("password")}
              type="password"
              key="password-inputForm"
              className="w-full"
            />
          </FormField>
        </FormContent>

        <Button
          type="submit"
          disabled={loginMutation.isPending}
          className={`${
            loginMutation.isPending ? "bg-gray-300 text-gray-400" : ""
          }`}
        >
          {
            loginMutation.isPending ? "Iniciando sesión..." : "Iniciar sesión"
          }
        </Button>
      </form>
    </div>
  );
}


export default FormLogin;
