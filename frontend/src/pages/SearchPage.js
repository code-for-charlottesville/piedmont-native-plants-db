import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Collapsible from "../components/Collapsible";
import OptionsGrid from "../components/OptionsGrid";

function DistanceRangeInput({ label, idMin, idMax }) {
  const [unit, setUnit] = useState("inches");
  function changeUnits(e, unit) {
    e.preventDefault();
    setUnit(unit);
  }
  return (
    <div className="bg-gray-200 p-2">
      <h2 className="font-medium pb-2">{label}</h2>
      <input className="rounded w-10" type="number" id={idMin} name={idMin} />
      <span className="px-2">to</span>
      <input className="rounded w-10" type="number" id={idMax} name={idMax} />

      <button
        onClick={(e) => changeUnits(e, "inches")}
        className={`${
          unit === "inches" ? "bg-green-600" : "bg-gray-500"
        } p-1 ml-2 rounded text-white font-medium`}
      >
        Inches
      </button>
      <button
        onClick={(e) => changeUnits(e, "feet")}
        className={`${
          unit === "feet" ? "bg-green-600" : "bg-gray-500"
        } p-1 ml-2 rounded text-white font-medium`}
      >
        Feet
      </button>
    </div>
  );
}

export default function LandingPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const plantSearchElement = document.getElementById("plant_search_input");
    const categoryElement = document.getElementById("category_options");
    const regionElement = document.getElementById("region_options");
    const stormElement = document.getElementById("storm_options");
    const wildElement = document.getElementById("wild_options");
    const lightElement = document.getElementById("light_options");
    const moistureElement = document.getElementById("moisture_options");
    const soilElement = document.getElementById("soil_options");
    const growingElement = document.getElementById("growing_options");
    const animalElement = document.getElementById("animal_options");
    const difficultyElement = document.getElementById("difficulty_options");
    const bloomElement = document.getElementById("bloom_options");
    const bColorsElement = document.getElementById("bColors_options");
    const fColorsElement = document.getElementById("fColors_options");
    const groundcoverElement = document.getElementById("groundcover_options");

    const checkboxElements = [
      categoryElement,
      regionElement,
      stormElement,
      wildElement,
      lightElement,
      moistureElement,
      soilElement,
      growingElement,
      animalElement,
      difficultyElement,
      bloomElement,
      bColorsElement,
      fColorsElement,
      groundcoverElement,
    ];

    //also include the units (inches or feet) ***
    const heightElements = [
      document.getElementById("height_min"),
      document.getElementById("height_max"),
    ];
    const spreadElements = [
      document.getElementById("spread_min"),
      document.getElementById("spread_max"),
    ];
    //reseting form:

    plantSearchElement.value = "";
    heightElements[0].value = null;
    heightElements[1].value = null;
    spreadElements[0].value = null;
    spreadElements[1].value = null;
    //clears all checkbox inputs
    checkboxElements.forEach((elem) => {
      Array.from(elem.children).forEach((child) => {
        child.children[0].checked = false;
      });
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit} id="plant_search">
        <div className="bg-gray-100 rounded w-full flex flex-col items-center">
          <h1 className="text-center text-3xl font-medium py-5">
            Discover Piedmont Natives
          </h1>
          <div className="pb-5 w-full text-center">
            <label className="p-2" for="plant_search">
              <button className="hover:bg-gray-200 p-1 rounded" type="submit">
                <FontAwesomeIcon
                  className="text-gray-600 text-xl"
                  icon={faMagnifyingGlass}
                />
              </button>
            </label>
            <input
              className="rounded p-1 w-1/2"
              type="text"
              id="plant_search_input"
              name="plant_search_input"
              placeholder="Enter Plant Name"
            />
          </div>
        </div>
        <h2 className="text-2xl py-1">Advanced Options</h2>
        <Collapsible
          className="text-xl bg-gray-100 p-1 rounded"
          title={"Category"}
        >
          <OptionsGrid
            id="category_options"
            options={[
              "Wildflowers",
              "Grasses, Sedges & Reeds",
              "Ferns & Fern Allies",
              "Vines",
              "Shrubs",
              "Small Trees",
              "Medium to Large Trees",
            ]}
          />
        </Collapsible>
        <Collapsible
          className="text-xl bg-gray-100 p-1 rounded"
          title={"Native Region"}
        >
          <OptionsGrid
            id={"region_options"}
            options={[
              "Albemarle County",
              "Charlottesville City",
              "Buckingham",
              "Culpeper",
              "Fluvanna",
              "Greene",
              "Louisa",
              "Madison",
              "Nelson County",
              "Orange",
              "Virginia",
              "United States",
              "Disputed",
            ]}
          />
        </Collapsible>
        <Collapsible
          className="text-xl bg-gray-100 p-1 rounded"
          title={"Recommended Uses"}
        >
          <OptionsGrid
            label="Stormwater Facilities"
            id={"storm_options"}
            options={[
              "Bioretention Basin",
              "Detention Basin (Dry Pond)",
              "Retention Basin (Wet Pond)",
              "Raingarden",
              "Stream Buffer",
              "Swale",
              "Greenroof",
              "Wetland",
            ]}
          />
          <OptionsGrid
            label="Wildlife - Pollinators, Butterflies, Songbirds, etc."
            id={"wild_options"}
            options={[
              "Host Caterpillars",
              "Butterflies",
              "Birds",
              "Pollinators",
              "Habitat",
              "Mammals",
              "Wildlife",
            ]}
          />
        </Collapsible>
        <Collapsible
          className="text-xl bg-gray-100 p-1 rounded"
          title={"Plant Needs"}
        >
          <OptionsGrid
            label="Light Requirements"
            id={"light_options"}
            options={["Full Sun", "Partial Shade", "Full Shade"]}
          />
          <OptionsGrid
            label="Moisture Requirements"
            id={"moisture_options"}
            options={[
              "Dry",
              "Moderate Moisture",
              "High Moisture",
              "Seasonally Wet",
              "Aquatic",
            ]}
          />
          <OptionsGrid
            label="Unique Soils"
            id={"soil_options"}
            options={[
              "Acid",
              "Basic",
              "Sand",
              "Rocky",
              "Rich",
              "Moist",
              "Well Drained",
              "Shale",
            ]}
          />
        </Collapsible>
        <Collapsible
          className="text-xl bg-gray-100 p-1 rounded"
          title={"Plant Characteristics"}
        >
          <OptionsGrid
            label="Growing Habits"
            id={"growing_options"}
            options={["Spreads Rapidly"]}
          />
          <OptionsGrid
            label="Animal Resistant"
            id={"animal_options"}
            options={["Deer Resistant", "Groundhog Resistant"]}
          />
          {/* growing diffiuclty should be a single-select dropdown */}
          <OptionsGrid
            label="Growing Difficulty"
            id={"difficulty_options"}
            options={["Easy", "Moderate", "Hard"]}
          />
          <OptionsGrid
            label="Bloom Times by Month"
            id={"bloom_options"}
            options={[
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ]}
          />
          <OptionsGrid
            label="Bloom Colors"
            id={"bColors_options"}
            options={[
              "Red",
              "Pink",
              "Orange",
              "Yellow",
              "Green",
              "Blue",
              "Purple",
              "Violet",
              "White",
              "Silver",
              "Gray",
              "Lavender",
              "Cream",
              "Maroon",
              "Golden",
              "Brown",
              "Evergreen",
              "Straw",
              "Bronze",
              "Tawny",
              "Light Green",
              "Dark Green",
              "Spores (No blooms)",
            ]}
          />
          <OptionsGrid
            label="Foliage Colors"
            id={"fColors_options"}
            options={[
              "Red",
              "Pink",
              "Orange",
              "Yellow",
              "Green",
              "Blue",
              "Purple",
              "Violet",
              "White",
              "Silver",
              "Gray",
              "Lavender",
              "Cream",
              "Maroon",
              "Golden",
              "Brown",
              "Evergreen",
              "Straw",
              "Bronze",
              "Tawny",
              "Light Green",
              "Dark Green",
            ]}
          />

          <DistanceRangeInput
            idMin="height_min"
            idMax="height_max"
            label="Height Estimate"
          />
          <DistanceRangeInput
            idMin="spread_min"
            idMax="spread_max"
            label="Spread Estimate"
          />
          <OptionsGrid
            label="Groundcover"
            id={"groundcover_options"}
            options={["Yes"]}
          />
        </Collapsible>
      </form>

      <Link
        className="inline-block p-2 bg-green-600 text-white font-medium rounded my-2"
        to="/"
      >
        Show ALL Plants
      </Link>
      <h2 className="border-t text-2xl py-1">Featured</h2>
    </div>
  );
}
