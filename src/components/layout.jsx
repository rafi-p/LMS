import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./header";

export default function LayoutDashboard() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex flex-col flex-1 gap-[30px] p-[30px] ml-[290px]">
        <Header />
        <Outlet />
      </main>
    </div>
  );
}
