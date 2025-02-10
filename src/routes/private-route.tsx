import { useAuth } from "@/features/auth/hooks/useAuth"
import { PropsWithChildren } from "react"
import { Navigate } from "react-router-dom"

function PrivateRoute({ children }: PropsWithChildren<{}>) {
  const { user } = useAuth()

  if (!user?.isLogged) {
    return <Navigate to="/login" />

  }



  return (
    <div>{ children}</div>
  )
}

export default PrivateRoute
