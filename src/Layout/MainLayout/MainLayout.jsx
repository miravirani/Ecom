import React from "react";
import { Outlet } from "react-router-dom";
import MenuBar from "../../Components/MenuBar/MenuBar";
import Footer from "../../Components/Footer/Footer";

const MainLayout = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <MenuBar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
