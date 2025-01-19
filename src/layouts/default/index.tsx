import Footer from "@/components/footer";
import Header from "@/components/header";
import React from "react";
import { Outlet } from "react-router-dom";

const Defaultlayout: React.FC = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen py-20 ">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Defaultlayout;
