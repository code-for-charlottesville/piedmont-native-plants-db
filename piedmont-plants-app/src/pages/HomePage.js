import React from "react";
import PlantCard from "../components/PlantCard";
const plantList = require("../ten-plants.json");

function PlantList({ plants }) {
  return (
    <div>
      {plants.map((plant) => {
        return <PlantCard plant={plant} />;
      })}
    </div>
  );
}
//todo:
// get the category

export default function HomePage() {
  return (
    <div>
      <h1 className="text-2xl py-2.5 font-medium">Plants</h1>
      <PlantList plants={plantList} />
    </div>
  );
}
