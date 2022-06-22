import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Collapsible from "../components/Collapsible";
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
            />
          </div>
        </div>
        <h2 className="text-2xl py-1">Advanced Options</h2>
        <Collapsible
          className="text-xl bg-gray-100 p-1 rounded"
          title={"Category"}
        >
          hello
        </Collapsible>
        <Collapsible
          className="text-xl bg-gray-100 p-1 rounded"
          title={"Native Region"}
        >
          hello
        </Collapsible>
        <Collapsible
          className="text-xl bg-gray-100 p-1 rounded"
          title={"Recommended Uses"}
        >
          hello
        </Collapsible>
        <Collapsible
          className="text-xl bg-gray-100 p-1 rounded"
          title={"Plant Needs"}
        >
          hello
        </Collapsible>
        <Collapsible
          className="text-xl bg-gray-100 p-1 rounded"
          title={"Plant Characteristics"}
        >
          hello
        </Collapsible>
      </form>
    </div>
  );
}
