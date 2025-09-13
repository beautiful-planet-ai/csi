import { ProgressSpinner } from "primereact/progressspinner";
import React from "react";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import GovernmentSidebar from "./GovernmentSidebar";
import Breadcrumbs from "./Breadcrumbs";

const Layout = () => {
  return (
    <div className="flex h-screen">
      <GovernmentSidebar />

      <div className="w-full overflow-auto">
        <Suspense
          fallback={
            <div className="flex align-items-center justify-content-center">
              <ProgressSpinner />
            </div>
          }
        >
          <Breadcrumbs />
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default Layout;
