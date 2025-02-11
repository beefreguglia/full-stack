import { BrowserRouter } from "react-router";
// import { ManagerRoutes } from "./ManagerRoutes";
import { AuthRoutes } from "./AuthRoutes";
import { Loading } from "../components/Loading";
// import { EmployeeRoutes } from "./EmployeeRoutes";

const isLoading = false
export function Routes() {

  if(isLoading) {
    return <Loading />
  }

  return (
    <BrowserRouter>
      <AuthRoutes />
      {/* <EmployeeRoutes /> */}
      {/* <ManagerRoutes /> */}
    </BrowserRouter>
  )
}