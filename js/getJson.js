import getEachRouteInfo from "./getEachRouteInfo.js";
import getGeneralConfig from "./getGeneralConfig.js";
//+++++++++++++++++++++++++++++++++++++Function to Get JSON file++++++++++++++++++++++++++++++++++++++++++++++

export default function getJson() {
  fetch("../api.json")
    .then((response) => response.json())
    .then((json) => {
      getGeneralConfig(json);
      const routeInfos = json.paths;
      let entries = Object.entries(routeInfos);
      for (let [key, value] of entries) {
        getEachRouteInfo([key, value]);
      }
    });
}
