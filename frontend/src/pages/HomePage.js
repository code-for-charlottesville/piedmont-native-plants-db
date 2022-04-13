import React, { useState, useEffect } from "react";
import PlantCard from "../components/PlantCard";
import { getAllPlants, getPlantsFiltered } from "../api_functions/plants";
import { useNavigate } from "react-router-dom";
import Collapsible from "../components/Collapsible";
function FilterBar({ setPlants }) {
  const getBloomBinary = (months_selected) => {
    const bloom_months = months_selected.reduce((prev, cur) => {
      const val = cur.checked ? "1" : "0";
      return prev + val;
    }, "");
    return bloom_months;
  };

  const getCategoryTuple = (cats) => {
    const checked_cats = cats.filter((cat) => cat.checked);
    const cats_sql_tuple =
      checked_cats.reduce((prev, cur) => {
        if (prev == "(") return prev + cur.value;
        return prev + "," + cur.value;
      }, "(") + ")";
    return cats_sql_tuple;
  };

  const filterSubmitted = async (e) => {
    e.preventDefault();
    const {
      low_moisture,
      high_moisture,
      deer_resistant,
      easy_grow,
      is_edible,
      low_light,
    } = e.target;
    const { jan, feb, mar, apr, may, jun, july, aug, sept, oct, nov, dec } =
      e.target;
    const month_filter = [
      jan,
      feb,
      mar,
      apr,
      may,
      jun,
      july,
      aug,
      sept,
      oct,
      nov,
      dec,
    ];
    const cat_filter = [
      low_moisture,
      high_moisture,
      deer_resistant,
      easy_grow,
      is_edible,
      low_light,
    ];
    const bloom_months = getBloomBinary(month_filter);
    const cat_tuple = getCategoryTuple(cat_filter);

    const filtered_plants = await getPlantsFiltered(bloom_months, cat_tuple);
    setPlants(filtered_plants);
    console.log("filter submitted!");
  };

  const resetResults = async () => {
    const allPlants = await getAllPlants();
    setPlants(allPlants);
  };
  return (
    <div className="bg-gray-100 w-1/2 rounded-lg mt-11">
      <h1 className="font-medium text-2xl p-2 py-4">Filters</h1>
      <form onSubmit={filterSubmitted} name="filter_form">
        <Collapsible title={"Categories"}>
          <input type="checkbox" name="low_moisture" value="4" />
          <label className="px-2" htmlFor="low_moisture">
            Low Moisture
          </label>
          <br />
          <input type="checkbox" name="high_moisture" value="6" />
          <label className="px-2" htmlFor="high_moisture">
            High Moisture
          </label>
          <br />
          <input type="checkbox" name="deer_resistant" value="8" />
          <label className="px-2" htmlFor="deer_resistant">
            Deer Resistant
          </label>
          <br />
          <input type="checkbox" name="easy_grow" value="14" />
          <label className="px-2" htmlFor="easy_grow">
            Easy to grow
          </label>
          <br />
          <input type="checkbox" name="is_edible" value="13" />
          <label className="px-2" htmlFor="is_edible">
            Edible
          </label>
          <br />
          <input type="checkbox" name="low_light" value="3" />
          <label className="px-2" htmlFor="low_light">
            Low light
          </label>
        </Collapsible>
        <Collapsible title={"Bloom Dates"}>
          {[
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "July",
            "Aug",
            "Sept",
            "Oct",
            "Nov",
            "Dec",
          ].map((month, i) => {
            return (
              <div key={month.toLowerCase()}>
                <input type="checkbox" name={month.toLowerCase()} value={i} />
                <label className="px-2" htmlFor={month.toLowerCase()}>
                  {month}
                </label>
              </div>
            );
          })}
        </Collapsible>
        <button
          className="m-2 bg-gray-800 text-white rounded-lg p-2"
          type="submit"
        >
          Apply Filter
        </button>
      </form>
      <button
        className="m-2 bg-red-700 text-white rounded-lg p-2"
        onClick={resetResults}
      >
        Reset
      </button>
    </div>
  );
}

function PlantList({ plants }) {
  console.log(plants);
  let navigate = useNavigate();
  return (
    <div>
      {plants.map((plant) => {
        return (
          <PlantCard
            key={plant.plant_id}
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
  const [plantsData, setPlants] = useState([]);

  useEffect(async () => {
    const allPlants = await getAllPlants();
    setPlants(allPlants);
  }, []);

  return (
    <div className="flex gap-2">
      <FilterBar {...{ setPlants }} />
      <div>
        <h1 className="text-2xl pb-2.5 font-medium">Plants</h1>
        <PlantList plants={plantsData} />
      </div>
    </div>
  );
}
