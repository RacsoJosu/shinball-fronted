// import { getUserByIdQueryOptions } from "@/features/usuarios/hooks/users-queries";
import AgregarUsuario from "@/features/usuarios/page/agregar-usuario";
import Editar from "@/features/usuarios/page/editar";
import Usuarios from "@/features/usuarios/page/usuarios";
// import { queryClient } from "@/providers/query-client";
import { Route, Routes } from "react-router-dom";

export default function UsuariosRoutes() {
  return (
    <Routes>
      <Route index element={<Usuarios />} />
      <Route path="agregar" element={<AgregarUsuario />} />
      <Route path="editar/:idUser" element={<Editar />} />
    </Routes>
  );
}
