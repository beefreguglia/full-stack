import { BrowserRouter } from "react-router";
import { ManagerRoutes } from "./ManagerRoutes";
// import { AuthRoutes } from "./AuthRoutes";
// import { EmployeeRoutes } from "./EmployeeRoutes";

export function Routes() {
  return (
    <BrowserRouter>
      {/* <AuthRoutes /> */}
      {/* <EmployeeRoutes /> */}
      <ManagerRoutes />
    </BrowserRouter>
  )
}