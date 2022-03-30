import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlant } from "../api_functions/plants";

//plants need an img_url field
export default function PlantDetailsPage() {
  const { id } = useParams();
  const [plant, setPlant] = useState();

  useEffect(() => {
    setPlant(getPlant(id));
  }, []);
  return (
    <div className="w-full flex">
      <div className="w-1/2">
        {plant && (
          <>
            <h1 className="text-3xl font-medium">{plant.common_name}</h1>
            <span className="text-xl block pb-2 italic">{plant.sci_name}</span>
            <span className="text-sm block pb-2.5">
              Date Added: {new Date(plant.date_added).toLocaleDateString()}
            </span>
            <img
              className="bg-gray-100 rounded p-1 m-auto"
              src={"https://picsum.photos/seed/picsum/400"}
            />
            <h2 className="text-2xl font-medium py-2.5">Description</h2>
            <p>
              Praesent eleifend pellentesque augue at interdum. Aliquam ultrices
              eleifend velit, at lobortis dui bibendum et. Nam dapibus ultrices
              est, ut auctor urna. Curabitur odio mi, scelerisque nec orci at,
              eleifend congue justo. Aenean vel elit convallis, fermentum leo
              sit amet, ornare dolor. Aenean imperdiet scelerisque ipsum, vitae
              faucibus tellus consectetur eu. Integer quis metus ut nulla semper
              congue a a nibh.
            </p>
            {/* tags on the bottom and additional detail, table of details beside it */}
          </>
        )}
      </div>
      <div className="w-1/2 bg-gray-100 rounded m-1"></div>
    </div>
  );
}
