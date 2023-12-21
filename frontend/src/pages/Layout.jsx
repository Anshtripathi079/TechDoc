import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="mx-auto p-6 max-w-screen-md md:max-w-[800px] lg:max-w-[950px] xl:max-w-[1200px]">
      <Header />
      <Outlet />
    </main>
  );
};

export default Layout;
