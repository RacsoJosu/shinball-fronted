import { queryClient } from "@/providers/tanstack-query-provider";
import { getState } from "@/stores/auth.store";
import { redirect } from "react-router-dom";
import { useAuthQueryOptions } from "../hooks/auth-queries";

export const AuthLoader =  async () => {
  const auth = getState();
  console.log("AuthLoader ejecutado, usuario:", auth);

  const user =
    queryClient.getQueryData(
      useAuthQueryOptions().queryKey
    ) ??
    (await queryClient.fetchQuery(useAuthQueryOptions()));
  auth.setUser({email: user.data.data.infoUser.email, id:user.data.data.infoUser.id,  name: user.data.data.infoUser.name})
    console.log(user.data.data.infoUser)

  if (!auth.user && !user) {
    return redirect("/login");
  }

  return { infoUser: auth.user ?? user, token:"" };

};
