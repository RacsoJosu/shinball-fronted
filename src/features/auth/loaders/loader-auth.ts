import { QueryClient } from "@tanstack/react-query";
import { getAuthQueryOptions } from "../hooks/auth-queries";

export const authLoader = (queryClient: QueryClient) => async () => {
  const response = queryClient.getQueryData(getAuthQueryOptions().queryKey);

  console.log(response);
  // if (!response?.data.data) {
  //   throw redirect("/login");
  // }
};
