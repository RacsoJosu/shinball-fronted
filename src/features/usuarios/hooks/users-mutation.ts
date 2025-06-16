import { SignUpFormValues } from "@/features/auth/interfaces/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { patchUser } from "../services/users-services";

export function useEditUserMutation() {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["updateUSer"],
    mutationFn: ({ idUser, body }: { idUser: string; body: Partial<SignUpFormValues> }) =>
      patchUser(idUser, body),
    onSuccess: ({ data }) => {
      toast.success(data.message);
      navigate("/usuarios");
    },
  });
}
