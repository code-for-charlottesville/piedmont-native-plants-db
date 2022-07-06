import React from "react";

export default function OptionsGrid({ options, label, id }) {
  return (
    <div className="bg-gray-200 bg-gray-200 p-2">
      <h2 className="text-lg font-medium border-b border-gray-100 pb-1">
        {label}
      </h2>
      <div id={id} className="grid grid-cols-4">
        {options.map((plantCategory) => {
          return (
            <span key={plantCategory} className="flex items-center">
              <input
                className="scale-150"
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
