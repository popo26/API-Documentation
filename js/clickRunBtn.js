import findParamsValues from "./findParamsValues.js";
import testRoute from "./testRoute.js";

//+++++++++++++++++++++++++++Run button to collect params and execute test route++++++++++++++++++++++++++++++

export default function clickRunBtn(
  classRouteHeader,
  httpCode,
  runBtn,
  count,
  path,
  parameters,
  httpMethod
) {
  runBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const baseURL = document.querySelector(".base-url").innerText;
    const basePath = document.querySelector(".base-path").innerText;
    let newRoute;
    // let newRoute = `${baseURL}${path}`;
    // let newRoute = `${baseURL}${basePath}${path}`;
    //console.log(newRoute);
    if (basePath == "/"){
      newRoute = `${baseURL}${path}`;
    } else {
      newRoute = `${baseURL}${basePath}${path}`;
    }

    const individualParamInput = document.querySelector(
      `.eachp${classRouteHeader}${count}${httpMethod}`
    );
    const paramInputs = document.querySelectorAll(
      `.p${classRouteHeader}${httpMethod}`
    );
    const runBtnMsg = document.querySelector(
      `.runMsg${classRouteHeader}${httpMethod}`
    );

    ///+++++++++Find Param Entries+++++++++++++
    let paramEntries = findParamsValues(classRouteHeader, httpMethod);

    //*************QUERY**********/
    if (!individualParamInput) {
      console.log("No params.");
    } else if (individualParamInput.classList.contains("query")) {
      newRoute += "?";
      for (let i = 0; i < paramInputs.length; i++) {
        const entry = paramInputs[i].value;
        const placeholderEntry = paramInputs[i].getAttribute("placeholder");
        newRoute += `${placeholderEntry}=${entry}&`;
      }
      //************PATH OR BODY***********/
    } else if (
      individualParamInput.classList.contains("path") ||
      individualParamInput.classList.contains("body")
    ) {
      ///+++++++++Replace Path Parameter with {} with #+++++++++++++
      const rgx = /\{[A-Za-z]+\}/gi;
      if (path.match(rgx)) {
        const matchingPart = path.match(rgx);
        // path.match(rgx);
        //console.log("matchingPart is ",matchingPart)
      }
      const pathReplacedWithPound = path.replace(rgx, "#");
      //console.log("pathReplacedWithPound", pathReplacedWithPound)

      ///+++++++++Replace # with actual data+++++++++++++
      let tempPathArray = [];
      let count = 0;
      for (let char in pathReplacedWithPound) {
        if (pathReplacedWithPound[char] == "#") {
          tempPathArray.push(paramEntries[count]);
          count++;
        } else {
          tempPathArray.push(pathReplacedWithPound[char]);
        }
      }
      if (basePath == "/"){
        newRoute = baseURL + tempPathArray.join("");
      } else {
        newRoute = baseURL + basePath + tempPathArray.join("");
      }
      // newRoute = baseURL + tempPathArray.join("");
      //newRoute = baseURL + basePath + tempPathArray.join("");
      //console.log("new Route is ", newRoute)
    } else {
      console.error("Something wrong?");
    }
    ///+++++++++Fetch Endpoint+++++++++++++
    testRoute(newRoute, classRouteHeader, httpCode, parameters, httpMethod);
    runBtnMsg.style.display = "none";
  });
}

// export default function clickRunBtn(
//   classRouteHeader,
//   httpCode,
//   runBtn,
//   count,
//   path,
//   parameters,
//   httpMethod
// ) {
//   runBtn.addEventListener("click", function (e) {
//     e.preventDefault();
//     const baseURL = document.querySelector(".base-url").innerText;
//     let newRoute = `${baseURL}${path}`;

//     const individualParamInput = document.querySelector(
//       `.${classRouteHeader}${count}${httpMethod}`
//     );
//     const paramInputs = document.querySelectorAll(
//       `.p${classRouteHeader}${httpMethod}`
//     );
//     const runBtnMsg = document.querySelector(
//       `.runMsg${classRouteHeader}${httpMethod}`
//     );

//     ///+++++++++Find Param Entries+++++++++++++
//     let paramEntries = findParamsValues(classRouteHeader, httpMethod);

//     //*************QUERY**********/
//     if (!individualParamInput) {
//       console.log("No params.");
//     } else if (individualParamInput.classList.contains("query")) {
//       newRoute += "?";
//       for (let i = 0; i < paramInputs.length; i++) {
//         const entry = paramInputs[i].value;
//         const placeholderEntry = paramInputs[i].getAttribute("placeholder");
//         newRoute += `${placeholderEntry}=${entry}&`;
//       }
//       //************PATH OR BODY***********/
//     } else if (
//       individualParamInput.classList.contains("path") ||
//       individualParamInput.classList.contains("body")
//     ) {
//       ///+++++++++Replace Path Parameter with {} with #+++++++++++++
//       const rgx = /\{[A-Za-z]+\}/gi;
//       if (path.match(rgx)) {
//         const matchingPart = path.match(rgx);
//       }
//       const pathReplacedWithPound = path.replace(rgx, "#");

//       ///+++++++++Replace # with actual data+++++++++++++
//       let tempPathArray = [];
//       let count = 0;
//       for (let char in pathReplacedWithPound) {
//         if (pathReplacedWithPound[char] == "#") {
//           tempPathArray.push(paramEntries[count]);
//           count++;
//         } else {
//           tempPathArray.push(pathReplacedWithPound[char]);
//         }
//       }
//       newRoute = baseURL + tempPathArray.join("");
//     } else {
//       console.error("Something wrong?");
//     }
//     ///+++++++++Fetch Endpoint+++++++++++++
//     testRoute(newRoute, classRouteHeader, httpCode, parameters, httpMethod);
//     runBtnMsg.style.display = "none";
//   });
// }
