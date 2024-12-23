import React from "react";
import { Outlet, useLoaderData, useMatch } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./header";

export default function LayoutDashboard({ isAdmin = true }) {
  const session = useLoaderData();

  const isManagerPreviewPage = useMatch("/manager/courses/:id/preview");
  const isStudentPreviewPage = useMatch("/student/detail-course/:id");

  return (
    <>
      {isManagerPreviewPage !== null || isStudentPreviewPage !== null ? (
        <Outlet />
      ) : (
        <div className="flex min-h-screen">
          <Sidebar isAdmin={isAdmin} />
          <main className="flex flex-col flex-1 gap-[30px] p-[30px] ml-[290px]">
            <Header type={session?.role} />
            <Outlet />
          </main>
        </div>
      )}
    </>
  );
}
