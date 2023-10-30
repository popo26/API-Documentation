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

  // --------------Change Accordion Behaviour-----------------------------
  changeAccordionBehaviour(
    newRouteHeader,
    template.querySelector("#collapseOne"),
    template.querySelector(".route-header"),
    httpMethod,
    template.querySelector("#accordionExample")
  );

  //------------------Setup Template Nodes---------------------------------
  const routeHttpMethod = template.querySelector(".route-http-method");
  const routeHeaderBtn = template.querySelector(".route-header");
  template.querySelector(".route-header").innerText = routeHeader;
  template.querySelector(".route-tags").innerText = objectContent["tags"];
  const html = `<span class="http-method-span">${httpMethod[0].toUpperCase()}</span>`;
  routeHeaderBtn.insertAdjacentHTML("afterbegin", html);
  template
    .querySelector(".http-method-span")
    .classList.add(`span${httpMethod[0]}${newRouteHeader}`);
  const spanHttpMethod = template.querySelector(
    `.span${httpMethod[0]}${newRouteHeader}`
  );

  // Add different colours depending on http methods
  httpMethod[0] == "post"
    ? spanHttpMethod.classList.add("post")
    : httpMethod[0] == "put"
    ? spanHttpMethod.classList.add("put")
    : httpMethod[0] == "delete"
    ? spanHttpMethod.classList.add("delete")
    : spanHttpMethod.classList.add("get");

  // Populate responses objects
  const httpCodeDiv = template.querySelector(".route-http-code");
  for (let key in responsesObj) {
    const node = document.createElement("li");
    node.classList.add(`httpCode${newRouteHeader}${key}`);
    node.innerHTML = `<code>${key}</code>: ${Object.values(responsesObj[key])}`;
    httpCodeDiv.appendChild(node);
  }
  template.querySelector(".route-summary").innerText = objectContent["summary"];
  template.querySelector(".route-id").innerText = newRouteHeader;
  // Add individual classes
  routeHttpMethod.classList.add(`httpMethod${newRouteHeader}${httpMethod}`);
  template
    .querySelector(".try-out-btn")
    .classList.add(`try${newRouteHeader}${httpMethod}`);
  template
    .querySelector(".run-btn")
    .classList.add(`run${newRouteHeader}${httpMethod}`);
  template
    .querySelector(".run-message")
    .classList.add(`runMsg${newRouteHeader}${httpMethod}`);
  template
    .querySelector(".route-param-div")
    .classList.add(`paramDiv${newRouteHeader}${httpMethod}`);
  template
    .querySelector(".route-result")
    .classList.add(`result${newRouteHeader}${httpMethod}`);
  template
    .querySelector(".route-result-status-code")
    .classList.add(`resultStatus${newRouteHeader}${httpMethod}`);

  // --------------------Populate Prams---------------------------
  paramCount = populateParams(
    paramCount,
    params,
    template.querySelector(".route-parameters"),
    newRouteHeader,
    httpMethod
  );

  // --------------------Clickng Try-Out button to display Run button------------------
  clickTryOutBtnToShowRunBtn(
    newRouteHeader,
    template.querySelector(`.try${newRouteHeader}${httpMethod}`),
    httpMethod
  );

  //------------------------Run button to collect params and execute test route-----------------
  clickRunBtn(
    newRouteHeader,
    httpMethod[0],
    template.querySelector(`.run${newRouteHeader}${httpMethod}`),
    paramCount,
    routeHeader,
    params,
    httpMethod
  );

  document.querySelector("#route-list").appendChild(template);
}
