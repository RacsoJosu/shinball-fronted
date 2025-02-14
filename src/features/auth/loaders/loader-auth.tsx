import { redirect } from "react-router-dom";

export const AuthLoader = () => {
  const user = false;

  if (user) {
    return redirect("/login");
  }

  return null;
};
