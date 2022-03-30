import React, { useEffect, useState } from "react";

//might want to include plant color within the plant object?
//need weather/climate information underwhic the plant thrives
//natural habitat? a specific field for it
export default function PlantCard({ plant }) {
  const extractBloomMonths = (plant) => {
    const bloom = plant.bloom_months;
    const startMonth = bloom.indexOf("1");
    const endMonth = startMonth + bloom.replace(/0/g, "").length - 1;
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[startMonth] + " - " + months[endMonth];
  };

  return (
    <div className="bg-gray-100 p-2 shadow-md rounded my-1">
      <h1>
        <div className="flex justify-start">
          <img
            className="inline-block rounded"
            src={"https://picsum.photos/seed/picsum/175"}
          />
          <div className="px-5">
            <div className="text-xl pb-1.5">
              <span className="font-medium">{plant.common_name}</span> |
              <span>{plant.sci_name}</span>
              <span className="block text-sm leading-5 italic">
                {plant.comments}
              </span>
            </div>

            <div className="leading-8">
              <div>
                <span className="text-md font-medium">Height: </span>
                {parseFloat(plant.height_low)} - {parseFloat(plant.height_high)}{" "}
                {plant.height_unit}
              </div>
              <div>
                <span className="text-md font-medium">Bloom Dates:</span>{" "}
                {extractBloomMonths(plant)}
              </div>
              <div>
                <span className="text-md font-medium">Special Uses:</span>{" "}
                <span className="text-sm leading-1 inline-block">
                  {plant.special_uses ? plant.special_uses : "None"}
                </span>
              </div>
              <div>
                <span className="text-md font-medium">Garden Uses:</span>{" "}
                <span className="text-sm leading-1 inline-block">
                  {plant.landscape_garden_uses
                    ? plant.landscape_garden_uses
                    : "None"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </h1>
    </div>
  );
}
