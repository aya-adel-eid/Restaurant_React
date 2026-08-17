import { useEffect, useState } from "react";
import style from "./Layout.module.css";
import { NavBar } from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";
export function Layout() {
  useEffect(() => {}, []);
  return (
    <>
      <div className="flex flex-col justify-between min-h-screen">
        <NavBar></NavBar>

        <div className="pt-10 bg-[#F7F7F7] grow">
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}
