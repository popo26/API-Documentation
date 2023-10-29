import clickRunBtn from "./clickRunBtn.js";
import changeAccordionBehaviour from "./changeAccordionBehaviour.js";
import changeRoute from "./changeRoute.js";
import clickTryOutBtnToShowRunBtn from "./clickTryOutBtnToShowRunBtn.js";
import populateParams from "./populateParams.js";

//+++++++++++++++++++++++++++++++++++++Function to Create Template++++++++++++++++++++++++++++++++++++++++++++++
export default function getEachRouteInfo(data) {
  const template = document
    .getElementById("each-route-template")
    .content.cloneNode(true);

  // Populate data from config.json
  const objectContent = Object.values(Object.values(data)[0])[0];
  const params = objectContent["parameters"];
  const httpMethod = Object.keys(Object.values(data)[0]);
  const routeHeader = Object.keys(data)[0];
  const newRouteHeader = changeRoute(routeHeader);
  const responsesObj = objectContent["responses"];

  let paramCount = 0;


  // const objectContent = data[1][Object.keys(Object.values(data)[1])];
  // const params = objectContent["parameters"];
  // const httpMethod = Object.keys(Object.values(data)[1]);
  // const routeHeader = Object.values(data)[0];
  // const newRouteHeader = changeRoute(routeHeader);
  // const responsesObj = Object.entries(objectContent["responses"]);
  // let paramCount = 0;

  // --------------Change Accordion Behaviour-----------------------------

  changeAccordionBehaviour(
    newRouteHeader,
    template.querySelector("#collapseOne"),
    template.querySelector(".route-header"),
    httpMethod
  );

  // changeAccordionBehaviour(
  //   newRouteHeader,
  //   template.querySelector("#collapseOne"),
  //   template.querySelector(".route-header")
  // );

  //------------------Setup Template Nodes---------------------------------
  const routeHttpMethod = template.querySelector(".route-http-method");
  template.querySelector(".route-header").innerText = routeHeader;
  routeHttpMethod.innerText = httpMethod[0].toUpperCase();
  template.querySelector(".route-tags").innerText = objectContent["tags"];
  // Add different colours depending on http methods
  routeHttpMethod.innerText == "POST"
    ? routeHttpMethod.classList.add("post")
    : routeHttpMethod.innerText == "PUT"
    ? routeHttpMethod.classList.add("put")
    : routeHttpMethod.innerText == "DELETE"
    ? routeHttpMethod.classList.add("delete")
    : routeHttpMethod.classList.add("get");

  // Populate responses objects
  const httpCodeDiv = template.querySelector(".route-http-code");
  for (let key in responsesObj) {
    
    const node = document.createElement("li");
    // node.classList.add(`httpCode${newRouteHeader}${key}`);
    node.classList.add(`httpCode${newRouteHeader}${key}`);

    // node.innerHTML = `<code>${key}</code>: ${Object.values(value)}`;
    node.innerHTML = `<code>${key}</code>: ${Object.values(responsesObj[key])}`;

    httpCodeDiv.appendChild(node);
  }

  template.querySelector(".route-summary").innerText = objectContent["summary"];
  template.querySelector(".route-id").innerText = newRouteHeader;
  // Add individual classes
  routeHttpMethod.classList.add(`httpMethod${newRouteHeader}`);
  template.querySelector(".try-out-btn").classList.add(`${newRouteHeader}`);
  template.querySelector(".run-btn").classList.add(`run${newRouteHeader}`);
  template
    .querySelector(".run-message")
    .classList.add(`runMsg${newRouteHeader}`);
  template
    .querySelector(".route-param-div")
    .classList.add(`paramDiv${newRouteHeader}`);
  template
    .querySelector(".route-result")
    .classList.add(`result${newRouteHeader}`);
  template
    .querySelector(".route-result-status-code")
    .classList.add(`resultStatus${newRouteHeader}`);

  // --------------------Populate Prams---------------------------
  paramCount = populateParams(
    paramCount,
    params,
    template.querySelector(".route-parameters"),
    newRouteHeader
  );

  // --------------------Clickng Try-Out button to display Run button------------------
  clickTryOutBtnToShowRunBtn(
    newRouteHeader,
    template.querySelector(`.${newRouteHeader}`)
  );

  //------------------------Run button to collect params and execute test route-----------------
  clickRunBtn(
    newRouteHeader,
    httpMethod[0],
    template.querySelector(`.run${newRouteHeader}`),
    paramCount,
    routeHeader,
    params
  );
  document.querySelector("#route-list").appendChild(template);
}
