import getEachRouteInfo from "./getEachRouteInfo.js";
import getGeneralConfig from "./getGeneralConfig.js";
//+++++++++++++++++++++++++++++++++++++Function to Get JSON file++++++++++++++++++++++++++++++++++++++++++++++

export default function getJson() {
  fetch("../api.json")
    .then((response) => response.json())
    .then((json) => {
      getGeneralConfig(json);
      const routeInfos = json.paths;
      for (let key of routeInfos) {
        getEachRouteInfo(key);
      }
    });
}
