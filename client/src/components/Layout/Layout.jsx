import React from "react";

import Header from "../Header/Header";

import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <>
      {/* Overflow:hidden Property will change the navbar from sticky */}
      <div style={{ background: "var(--black)" }}>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
