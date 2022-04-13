const allPlants = require("../ten-plants.json");

export function getAllPlants() {
  return allPlants;
}

export function getPlant(id) {
  return allPlants.find((plant) => plant.plant_id == id);
}
