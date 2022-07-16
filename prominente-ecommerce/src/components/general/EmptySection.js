import React from "react";

const EmptySection = ({ btnLabel, onClick, desc }) => {
  return (
    <div className=" space-y-6 border w-full rounded-md p-8 min-h-[50vh] flex flex-col items-center justify-center">
      <div className="text-center">
        <h3 className="font-medium">All clear</h3>
        <h3 className="font-light">{desc}</h3>
      </div>
      <button
        className="btn-primary-filled font-semibold w-max"
        onClick={onClick}
      >
        {btnLabel}
      </button>
    </div>
  );
};

export default EmptySection;
