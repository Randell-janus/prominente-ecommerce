import React from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

export const PageLayout = ({ children, absolutes, pageTitle }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Sidebar />
      <div>{absolutes}</div>
      <div className="py-16 space-y-2 page-width-container">
        <h3 className="font-medium">{pageTitle}</h3>
        <div className="space-y-12">{children}</div>
      </div>
    </div>
  );
};

export const TableLayout = ({
  isHeaderPrimary,
  title,
  children,
  misc,
  hasSearch,
  onSearchChange,
  searchPlaceholder,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        {isHeaderPrimary && <h1 className="font-bold">{title}</h1>}
        {!isHeaderPrimary && <h3 className="font-medium">{title}</h3>}
        <div>{misc}</div>
      </div>
      {hasSearch && (
        <input
          type="text"
          className="input-outline rounded-full bg-slate-200 px-6"
          placeholder={searchPlaceholder}
          onChange={onSearchChange}
        />
      )}
      <div>{children}</div>
    </div>
  );
};

export const LabelledInfo = ({ label, info, className }) => {
  return (
    <p className="font-light">
      {label} <span className={`font-medium ${className}`}>{info}</span>
    </p>
  );
};
