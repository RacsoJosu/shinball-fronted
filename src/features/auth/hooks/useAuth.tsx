import  { createContext, PropsWithChildren, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
interface AuthI {
  user: {
    name: string;
    email: string;
    isLogged: boolean;
  };
  login: () => void;
  logout: () => void;
}

const authContext = createContext<AuthI>({
  user: {
  name: "", email: ""
  , isLogged: false
},  login: () => {}, logout: () => {}
}

);


export function AuthProvider({ children }: PropsWithChildren<{}>) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    isLogged: false
})
  const navigate = useNavigate()

  const login = () => {
    setUser({
      name: "John Doe",
      email: "correo@email.com",
      isLogged: true
    })

    navigate('/')
  }

  const logout = () => {
    setUser({
      name: "",
      email: "",
      isLogged: false
    })
    navigate("/login", { replace: true })
  }

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );

  return (
    <authContext.Provider value={{...value}}>
      {children}
    </authContext.Provider>
  );

}


export const useAuth = () => useContext(authContext);
