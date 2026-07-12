import { useEffect, useState } from "react";
import style from "./Layout.module.css";
import { NavBar } from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";
export function Layout() {
  useEffect(() => {}, []);
  return (
    <>
      <NavBar></NavBar>

      <div className="pt-14 bg-[#F7F7F7]">
        <Outlet></Outlet>
      </div>
    </>
  );
}
