import SignUpImg from "@/assets/signup-img";
import FormUser from "@/features/usuarios/components/form-user";
import { addUserSchema } from "@/features/usuarios/schemas/perfil.schemas";

import { format } from "date-fns";
import { z } from "zod";
import { useSignUpMutation } from "../hooks/auth-hooks";

function SignUp() {
  const singunpMutation = useSignUpMutation();
  async function onSubmit(data: z.infer<typeof addUserSchema>): Promise<void> {
    const formData = {
      ...data,
      birthDate: data.birthDate ? format(data.birthDate, "yyyy-MM-dd") : null,
    };

    await singunpMutation.mutateAsync(formData);
  }
  return (
    <div className=" flex flex-col items-center  md:flex-row gap-4 ">
      <div className="size-full ">
        <FormUser onSubmit={onSubmit} isDisabled={singunpMutation.isPending} />
      </div>
      <div className="size-full hidden md:block ">
        <div className="p-12">
          <SignUpImg className="" />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
