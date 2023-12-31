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

    basePath == "/"
      ? (newRoute = `${baseURL}${path}`)
      : (newRoute = `${baseURL}${basePath}${path}`);

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
      const pathReplacedWithPound = path.replace(rgx, "#");

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
      basePath == "/"
        ? (newRoute = baseURL + tempPathArray.join(""))
        : (newRoute = baseURL + basePath + tempPathArray.join(""));
    } else {
      console.error("Something wrong?");
    }
    ///+++++++++Fetch Endpoint+++++++++++++
    testRoute(newRoute, classRouteHeader, httpCode, parameters, httpMethod);
    runBtnMsg.style.display = "none";
  });
}
