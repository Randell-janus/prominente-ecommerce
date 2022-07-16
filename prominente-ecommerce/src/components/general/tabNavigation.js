import React from "react";

export const DoubleTab = ({
  tabLabel1,
  tabLabel2,
  primaryTab,
  secondaryTab,
  isOpen,
}) => {
  return (
    <div className="flex space-x-6">
      <button
        onClick={primaryTab}
        className={`profile-tab-nav ${!isOpen && "border-teal-400"}`}
      >
        <h3>{tabLabel1}</h3>
      </button>
      <button
        className={`profile-tab-nav ${isOpen && "border-teal-400"}`}
        onClick={secondaryTab}
      >
        <h3>{tabLabel2}</h3>
      </button>
    </div>
  );
};

export const TabNav = ({ activeTab, setter, tabs }) => {
  return (
    <div className="flex space-x-6">
      {tabs.map((tab, i) => (
        <button
          key={i}
          onClick={() => setter(i)}
          className={`profile-tab-nav ${activeTab === i && "border-teal-400"}`}
        >
          <h3>{tab}</h3>
        </button>
      ))}
    </div>
  );
};
