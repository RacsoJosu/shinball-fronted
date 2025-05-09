/* eslint-disable react-hooks/rules-of-hooks */

import { redirect } from "react-router-dom";
import { useAuthQueryOptions } from "../hooks/auth-queries";
import { queryClient } from "@/providers/query-client";

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
