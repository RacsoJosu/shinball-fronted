/* eslint-disable react-hooks/rules-of-hooks */

import { queryClient } from "@/providers/query-client";
import { redirect } from "react-router";
import { useAuthQueryOptions } from "../hooks/auth-queries";

export const authLoader = async () => {
  const user = await queryClient.ensureQueryData(useAuthQueryOptions());

  if (!user?.data.data) {
    return redirect("/login");
  }

  return user.data.data;
};
