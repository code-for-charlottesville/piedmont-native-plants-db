import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Collapsible from "../components/Collapsible";
import OptionsGrid from "../components/OptionsGrid";

function DistanceRangeInput({ label }) {
  const [unit, setUnit] = useState("inches");
  function changeUnits(e, unit) {
    e.preventDefault();
    setUnit(unit);
  }
  return (
    <div className="bg-gray-200 p-2">
      <h2 className="font-medium pb-2">{label}</h2>
      <input
        className="rounded w-10"
        type="number"
        id="lower_bound"
        name="lower_bound"
      />
      <span className="px-2">to</span>
      <input
        className="rounded w-10"
        type="number"
        id="upper_bound"
        name="upper_bound"
      />

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
  return (
    <div>
      <form id="plant_search">
        <div className="bg-gray-100 rounded w-full flex flex-col items-center">
          <h1 className="text-center text-3xl font-medium py-5">
            Discover Piedmont Natives
          </h1>
          <div className="pb-5 w-full text-center">
            <label className="p-2" for="plant_search">
              <FontAwesomeIcon
                className="text-gray-600 text-xl"
                icon={faMagnifyingGlass}
              />
            </label>
            <input
              className="rounded p-1 w-1/2"
              type="text"
              id="plant_search"
              name="plant_search"
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
            options={["Full Sun", "Partial Shade", "Full Shade"]}
          />
          <OptionsGrid
            label="Moisture Requirements"
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
          <OptionsGrid label="Growing Habits" options={["Spreads Rapidly"]} />
          <OptionsGrid
            label="Animal Resistant"
            options={["Deer Resistant", "Groundhog Resistant"]}
          />
          {/* growing diffiuclty should be a single-select dropdown */}
          <OptionsGrid
            label="Growing Difficulty"
            options={["Easy", "Moderate", "Hard"]}
          />
          <OptionsGrid
            label="Bloom Times by Month"
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

          <DistanceRangeInput label="Height Estimate" />
          <DistanceRangeInput label="Spread Estimate" />
          <OptionsGrid label="Groundcover" options={["Yes"]} />
        </Collapsible>
      </form>

      <Link
        className="inline-block p-2 bg-green-600 text-white font-medium rounded my-2"
        to="/home"
      >
        Show ALL Plants
      </Link>
      <h2 className="border-t text-2xl py-1">Featured</h2>
    </div>
  );
}
