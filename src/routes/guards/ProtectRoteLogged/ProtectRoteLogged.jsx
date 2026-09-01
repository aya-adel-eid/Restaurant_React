
import { Navigate } from "react-router-dom";
import style from "./ProtectRoteLogged.module.css";
export function ProtectRoteLogged(props) {
 if (localStorage.getItem('userToken')) {
 return <Navigate to={'/'}></Navigate>
 }
 else{
  return props.children
 }
}
