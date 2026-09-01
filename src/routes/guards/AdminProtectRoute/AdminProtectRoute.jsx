import { Navigate } from "react-router-dom";
import style from "./AdminProtectRoute.module.css";
export function AdminProtectRoute(prop) {
  console.log("role:", localStorage.getItem("role"));
  console.log("token:", localStorage.getItem("userToken"));
  if (
    localStorage.getItem("role") === "admin" &&
    localStorage.getItem("userToken")
  ) {
    return prop.children;
  } else {
    return <Navigate to={"/signIn"}></Navigate>;
  }
}
