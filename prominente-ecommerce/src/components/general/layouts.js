import React from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

import Bot from "../Bot";

export const PageLayout = ({ children, absolutes, pageTitle }) => {
  return (
    <div className="page-height-container">
      <Navbar />
      <Sidebar />
      <Bot />
      <div>{absolutes}</div>
      <div className="border-b bg-white">
        <div className="page-width-container py-6">
          <h2 className="font-medium uppercase italic">{pageTitle}</h2>
        </div>
      </div>

      <div className="page-width-container">
        <div className="py-16 space-y-12">{children}</div>
      </div>
    </div>
  );
};

export const TableLayout = ({ isHeaderPrimary, title, children, misc }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        {isHeaderPrimary && <h2 className="font-semibold">{title}</h2>}
        {!isHeaderPrimary && <h3 className="font-medium">{title}</h3>}
        <div>{misc}</div>
      </div>
      <div>{children}</div>
    </div>
  );
};
