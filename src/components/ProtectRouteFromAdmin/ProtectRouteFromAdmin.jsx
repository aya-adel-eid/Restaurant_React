import { Navigate, Outlet } from "react-router-dom";

export function ProtectRouteFromAdmin() {
  if (
    localStorage.getItem("role") === "admin" &&
    localStorage.getItem("userToken")
  ) {
    return <Navigate to={"/admin"}></Navigate>;
  } else {
    return <Outlet></Outlet>;
  }
}
