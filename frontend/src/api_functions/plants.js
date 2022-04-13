const baseURL = "http://localhost:4000/plants";
export async function getAllPlants() {
  const plants = await fetch(`${baseURL}/all`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
      return [];
    });

  return plants;
}

export async function getPlantsFiltered(bloom_filter, cat_filter) {
  const plants = await fetch(
    `${baseURL}/all/?bloom=${bloom_filter}&category=${cat_filter}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
      return [];
    });

  return plants;
}

export async function getPlant(id) {
  const plant = await fetch(`${baseURL}/${id}`)
    .then((res) => res.json())
    .then((data) => {
      return data.find((plant) => plant.plant_id == id);
    })
    .catch((err) => console.log(err));
  return plant;
}
