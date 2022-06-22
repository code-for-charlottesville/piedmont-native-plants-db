import React from "react";

export default function OptionsGrid({ options, label }) {
  return (
    <div className="bg-gray-200 bg-gray-200 p-2">
      <h2 className="text-lg font-medium border-b border-gray-100 pb-1">
        {label}
      </h2>
      <div className="grid grid-cols-4">
        {options.map((plantCategory) => {
          return (
            <span className="flex items-center">
              <input
                className="h-5 w-5"
                type="checkbox"
                id={plantCategory}
                name={plantCategory}
              />
              <label className="px-2 text-lg" for={plantCategory}>
                {plantCategory}
              </label>
            </span>
          );
        })}
      </div>
    </div>
  );
}
