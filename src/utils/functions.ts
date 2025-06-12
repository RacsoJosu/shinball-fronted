const regex = /^\/perfil\/?(.*)$/;
export function getSubPathPerfil(pathname: string) {
  const currentLocation = regex.exec(pathname);

  return currentLocation && currentLocation[1] != "" ? currentLocation[1] : "perfil";
}
