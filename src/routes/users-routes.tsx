// import { getUserByIdQueryOptions } from "@/features/usuarios/hooks/users-queries";
import AgregarUsuario from "@/features/usuarios/page/agregar-usuario";
import Usuarios from "@/features/usuarios/page/usuarios";
import NotFound from "@/shared/components/not-found";
import { AxiosError } from "axios";
// import { queryClient } from "@/providers/query-client";
import { Navigate, Route, Routes, useRouteError } from "react-router";

export default function UsuariosRoutes() {
  return (
    <Routes>
      <Route index element={<Usuarios />} />
      <Route path="agregar" element={<AgregarUsuario />} />
    </Routes>
  );
}

export function ErrorElementUsersModule() {
  const error = useRouteError();
  if (error instanceof AxiosError) {
    if (error.status === 404) {
      return <NotFound />;
    }
  }

  return <Navigate to="/dashboard" />;
}
