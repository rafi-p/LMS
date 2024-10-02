import React from "react";
import { Outlet, useMatch } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./header";

export default function LayoutDashboard() {
  const isPreviewPage = useMatch("/manager/courses/:id/preview");
  return (
    <>
      {isPreviewPage ? (
        <Outlet />
      ) : (
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex flex-col flex-1 gap-[30px] p-[30px] ml-[290px]">
            <Header />
            <Outlet />
          </main>
        </div>
      )}
    </>
  );
}
