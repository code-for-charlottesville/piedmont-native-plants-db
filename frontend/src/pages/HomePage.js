import React from "react";
import PlantCard from "../components/PlantCard";
import { getAllPlants } from "../api_functions/plants";
import { useNavigate } from "react-router-dom";

function PlantList({ plants }) {
  let navigate = useNavigate();
  return (
    <div>
      {plants.map((plant) => {
        return (
          <PlantCard
            onClick={() => navigate(`/plant/${plant.plant_id}`)}
            plant={plant}
          />
        );
      })}
    </div>
  );
}
//todo:
// get the category

export default function HomePage() {
  return (
    <div>
      <h1 className="text-2xl pb-2.5 font-medium">Plants</h1>
      <PlantList plants={getAllPlants()} />
    </div>
  );
}
