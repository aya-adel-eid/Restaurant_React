import { useState } from "react";
import style from "./Protect-route.module.css";
import { Navigate } from "react-router-dom";
export function ProtectRoute(props) {
  console.log(props);
  console.log("role:", localStorage.getItem("role"));
  console.log("token:", localStorage.getItem("userToken"));

  if (
    localStorage.getItem("userToken") &&
    localStorage.getItem("role") === "user"
  ) {
    return props.children;
  } else {
    return <Navigate to={"/signIn"}></Navigate>;
  }
}
