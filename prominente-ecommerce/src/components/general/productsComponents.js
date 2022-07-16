import React from "react";

export const ProductCard = ({
  image,
  alt,
  primaryLabel,
  secondaryLabel,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="border border-transparent flex flex-col items-center overflow-hidden space-y-2 p-6 hover:scale-105 hover:border-gray-200 rounded-md transition-all cursor-pointer"
    >
      <section className="w-full flex items-center justify-center h-3/4">
        <img src={image} alt={alt} className="" />
      </section>

      <section className="capitalize text-center w-full p-3">
        <h3 className="font-medium">{primaryLabel}</h3>
        <div>{secondaryLabel}</div>
      </section>
    </div>
  );
};

export const ProductsGrid = ({
  label,
  children,
  hasSearch,
  onSearchChange,
  searchPlaceholder,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="font-semibold capitalize">{label}</h2>
      {hasSearch && (
        <input
          type="text"
          className="input-outline w-full sm:flex-1 rounded-full bg-slate-100 px-6 border-transparent"
          placeholder={searchPlaceholder}
          onChange={onSearchChange}
        />
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-6 relative">
        {children}
      </div>
    </div>
  );
};

export const ProductsVariants = ({
  priceLabel,
  variantDetails,
  variant,
  variantHandler,
  unitPrice,
}) => {
  return (
    <div
      className={`text-center cursor-pointer hover:bg-slate-200 transition-all rounded-md px-12 py-3 space-y-1 ${
        unitPrice === variant.initial
          ? "bg-teal-400 hover:bg-teal-400"
          : "bg-slate-100"
      }`}
      // key={i}
      onClick={variantHandler}
    >
      <h3 className="font-semibold">{priceLabel}</h3>
      <div>{variantDetails}</div>
    </div>
  );
};
