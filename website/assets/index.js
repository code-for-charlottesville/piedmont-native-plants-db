import React from "react";
import ReactDOM from "react-dom/client";
import {Configuration, ApiApi, PlantIdentifier, PlantIdentCreateRequest} from "piedmont-api-client";
import Cookies from "js-cookie"

function DisplayPlants(props) {
    return <h1>Plants</h1>
}

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<DisplayPlants />)

const apiClient = new ApiApi(new Configuration({
        basePath: "http://127.0.0.1:8000/",
        headers: {
            "X-CRSFToken": Cookies.get("crsftoken"),
        }
    }));
/*
apiClient.plantList().then((result) => {
    console.log("Plants:", result.results)
});
apiClient.plantIdentRetrieve({id:2}).then((result) => {
    console.log("ID 1: ", result.common_name, result.latin_name)
});

apiClient.plantIdentList({common_name__icontains:"com"}).then((result) => {
    console.log("Filtered Plants: ", result.results)
});
*/

async function createPlantInformation(plantInformation) {
    return await apiClient.plantInfCreate({
        PlantInformation: plantInformation
    });
}

async function createPlantIdentity(plantIdentity) {
    return await apiClient.plantIdentCreate({
        PlantIdentifier: plantIdentity
    });
}

async function createPlant(plantIdentity, plantInformation, description) {
    return await apiClient.plantCreate({
        Plant: {
            date_added: new Date(),
            description: description,
            info: await createPlantInformation(plantInformation).then(r => r.id),
            identifier: await createPlantIdentity(plantIdentity).then(r => r.id)
        }
    })
}

let plantInfo = {
    bloom_start: "Jul",
    bloom_end: "Apr",
    height_max: 2,
    height_min: 0.5,
}

let plantIdent = {
    common_name: "This is a Common Name",
    latin_name: "This is a Latin Name"
}

let plant = createPlant(plantIdent, plantInfo, "The Most BEAUTIFUL flower");
plant.then(r => console.log("Created: ", r.id, r.identifier, r.info, r.description))
