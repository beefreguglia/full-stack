import { BrowserRouter } from "react-router";
import { ManagerRoutes } from "./ManagerRoutes";
import { AuthRoutes } from "./AuthRoutes";
import { Loading } from "../components/Loading";
import { EmployeeRoutes } from "./EmployeeRoutes";

const isLoading = false

const session = {
  user: {
    role: "",
  },
}

export function Routes() {
  function Route() {
    switch (session?.user.role) {
      case "employee":
        return <EmployeeRoutes />
      case "manager":
        return <ManagerRoutes />
      default:
        return <AuthRoutes />
    }
  }

  if(isLoading) {
    return <Loading />
  }

  return (
    <BrowserRouter>
      <Route />
    </BrowserRouter>
  )
}