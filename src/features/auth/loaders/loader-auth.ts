import { queryClient } from "@/providers/tanstack-query-provider";
import { redirect } from "react-router-dom";
import { useAuthQueryOptions } from "../hooks/auth-queries";

export const authLoader =  async () => {

  const user =
    queryClient.getQueryData(
      useAuthQueryOptions().queryKey
    ) ??
    (await queryClient.fetchQuery(useAuthQueryOptions()));

  if (!user) {
    return redirect("/login");
  }

  return user.data.data


};
