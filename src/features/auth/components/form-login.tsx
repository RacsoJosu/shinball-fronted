import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/shared/components/button";
import {
  FormContent,
  FormField,
  FormHeader,
  FormTitle,
  InputForm,
  Label,
} from "@/shared/components/form.components";
import { useAuthStore } from "@/stores/auth.store";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { z } from "zod";
import { useLoginMutation } from "../hooks/auth-hooks";
import { loginUserSchema } from "../schemas/forms-schema";

function FormLogin() {
  const auth = useAuthStore();

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
    await loginMutation.mutateAsync(
      { ...params },
      {
        onSuccess: ({ data }) => {
          auth.setToken(data.data);
          toast.success("Login realizado correctamente");
          navigate("/usuarios");
        },
      }
    );
  }
  return (
    <div className="h-full  flex  ">
      <form
        className="
       flex-1
      flex flex-col gap-6 justify-center items-center px-8
      "
        onSubmit={handleSubmit((values) => onSubmit(values))}
      >
        <FormHeader>
          <FormTitle title="Bienvenido de nuevo." />
          <p>
            ¿No tienes una cuenta?{" "}
            <Link to={"/sign-up"} className="underline underline-offset-4 text-primary-400">
              {" "}
              Registrate
            </Link>
          </p>
        </FormHeader>
        <FormContent className="w-full md:w-[370px] ">
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
            <Label forHtml="password" name="Contraseña" key="password-label" clasName="" />
            <InputForm
              placeholder="correo@example.com"
              register={register("password")}
              type="password"
              key="password-inputForm"
              className="w-full"
            />
          </FormField>
          <Button
            type="submit"
            disabled={loginMutation.isPending}
            className={`${
              loginMutation.isPending ? "bg-gray-300 text-gray-400 hover:bg-gray-300" : ""
            }`}
          >
            {loginMutation.isPending ? "Iniciando sesión..." : "Iniciar sesión"}
          </Button>
        </FormContent>
      </form>

      <div className=" flex-2 bg-primary-500 hidden md:block "></div>
    </div>
  );
}

export default FormLogin;
