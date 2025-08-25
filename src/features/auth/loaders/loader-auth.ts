import { QueryClient } from "@tanstack/react-query";
import { redirect } from "react-router";
import { getAuthQueryOptions } from "../hooks/auth-queries";

export const authLoader = (queryClient: QueryClient) => async () => {
  const user =
    queryClient.getQueryData(getAuthQueryOptions().queryKey) ??
    (await queryClient.fetchQuery(getAuthQueryOptions()));

  if (!user?.data.data) {
    throw redirect("/login");
  }

  return user.data.data;
};
