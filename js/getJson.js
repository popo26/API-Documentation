import getEachRouteInfo from "./getEachRouteInfo.js";
import getGeneralConfig from "./getGeneralConfig.js";
//+++++++++++++++++++++++++++++++++++++Function to Get JSON file++++++++++++++++++++++++++++++++++++++++++++++

export default function getJson() {
  fetch("../api.json")
    .then((response) => response.json())
    .then((json) => {
      getGeneralConfig(json);
      const routeInfos = json.paths;
      //console.log(routeInfos)
      //let entries = Object.entries(routeInfos);
      for (let key of routeInfos) {
        //console.log(Object.values(Object.values(key)[0])[0]['responses'])
        getEachRouteInfo(key);
      }
    });
}

// export default function getJson() {
//   fetch("../api.json")
//     .then((response) => response.json())
//     .then((json) => {
//       getGeneralConfig(json);
//       const routeInfos = json.paths;
//       //console.log(routeInfos)
//       let entries = Object.entries(routeInfos);
//       for (let [key, value] of entries) {
//         console.log(key, value)
//         getEachRouteInfo([key, value]);
//       }
//     });
// }

