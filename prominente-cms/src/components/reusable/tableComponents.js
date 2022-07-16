import { AddIcon } from "./icons";

export const AddBtn = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="add-products-btn flex items-center space-x-1 text-white"
    >
      <AddIcon />
      <p className="font-bold">Add New</p>
    </button>
  );
};

export const TdActionsBtn = ({ onClick, label }) => {
  return (
    <button onClick={onClick} className="btn-scale">
      {label}
    </button>
  );
};

export const TdVisibility = ({ product }) => {
  return (
    <p
      className={`${
        product.visible === "true" ? "bg-green-200" : "bg-red-200"
      } rounded-full px-3 w-max font-medium`}
    >
      {String(product.visible)}
    </p>
  );
};

export const TdStatus = ({ product }) => {
  return (
    <p
      className={`${
        product.visible === "true" ? "bg-green-200" : "bg-red-200"
      } rounded-full px-3 w-max font-medium`}
    >
      {String(product.visible)}
    </p>
  );
};
