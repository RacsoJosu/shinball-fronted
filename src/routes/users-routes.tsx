import AgregarUsuario from "@/features/usuarios/page/agregar-usuario";
import Usuarios from "@/features/usuarios/page/usuarios";
import { Route, Routes } from "react-router-dom";

export default function UsuariosRoutes() {
  return (
    <Routes>
      <Route index element={<Usuarios />} />
      <Route path="agregar" element={<AgregarUsuario />} />
      <Route path="editar" element={<div>Editar</div>} />
    </Routes>
  );
}
