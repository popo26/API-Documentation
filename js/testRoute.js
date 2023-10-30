import findParamsValues from "./findParamsValues.js";

//+++++++++++++++++++++++++++++++++++++ Function to Set Scheme For Fetch++++++++++++++++++++++++++++++++++++++

function setSchemeForFetch() {
  const schemeBtn = document.querySelector(".scheme-btn");
  //By Default, scheme is HTTP
  if (!schemeBtn.innerText.search("Scheme")) {
    return "http://";
  } else {
    return `${schemeBtn.innerText}://`;
  }
}

//+++++++++++++++++++++++++++++++++++++ Function to Display Status Code++++++++++++++++++++++++++++++++++++++++++++++
function displayStatusCode(res, className, httpMethod) {
  document.querySelector(
    `.resultStatus${className}${httpMethod}`
  ).innerText = `Response Code: ${res.status}`;
  return res.json();
}

//+++++++++++++++++++++++++++++++++++++ Function to Display Results++++++++++++++++++++++++++++++++++++++++++++++
function displayResults(className, data, httpMethod) {
  const resultDiv = document.querySelector(`.result${className}${httpMethod}`);
  resultDiv.style.display = "block";
  if (!data.length) {
    resultDiv.innerHTML =
      "<pre>" + JSON.stringify(data, undefined, 2) + "</pre>";
  } else {
    resultDiv.innerHTML =
      `<p><strong>Data length: ${data.length}</strong></p>` +
      "<pre>" +
      JSON.stringify(data, undefined, 2) +
      "</pre>";
  }
  resultDiv.style.fontSize = "14px";
}

//+++++++++++++++++++++++++++++++++++++ Function to Display Error++++++++++++++++++++++++++++++++++++++++++++++
function displayError(err, className, httpMethod) {
  const resultDiv = document.querySelector(`.result${className}${httpMethod}`);
  console.error(err);
  resultDiv.style.display = "block";
  resultDiv.innerHTML = `ERROR: error`;
  resultDiv.style.fontSize = "16px";
}

//+++++++++++++++++++++++++++++++++++++ Function to Fetch Methods++++++++++++++++++++++++++++++++++++++++++++++
export default function testRoute(
  route,
  className,
  method,
  parameters,
  httpMethod
) {
  const selectedScheme = setSchemeForFetch();
  const headerContent = {
    "Content-Type": "application/json",
  };
  let paramValues = findParamsValues(className, httpMethod);
  let jsonBody = {};
  if (method === "get") {
    fetch(`${selectedScheme}${route}`)
      .then((response) => {
        return displayStatusCode(response, className, httpMethod);
      })
      .then((json) => {
        displayResults(className, json, httpMethod);
      })
      .catch((error) => {
        displayError(error, className, httpMethod);
      });
  } else if (method === "post") {
    for (let x in parameters) {
      jsonBody[parameters[x].name] = paramValues[x];
    }
    fetch(`${setSchemeForFetch()}${route}`, {
      method: "POST",
      headers: headerContent,
      body: JSON.stringify(jsonBody),
    })
      .then((response) => {
        return displayStatusCode(response, className, httpMethod);
      })
      .then((json) => {
        displayResults(className, json, httpMethod);
      })
      .catch((error) => {
        displayError(error, className, httpMethod);
      });
  } else if (method === "put") {
    for (let x in parameters) {
      if (paramValues[x]) {
        jsonBody[parameters[x].name] = paramValues[x];
      }
    }
    fetch(`${setSchemeForFetch()}${route}`, {
      method: "PUT",
      headers: headerContent,
      body: JSON.stringify(jsonBody),
    })
      .then((response) => {
        return displayStatusCode(response, className, httpMethod);
      })
      .then((json) => {
        displayResults(className, json, httpMethod);
      })
      .catch((error) => {
        displayError(error, className, httpMethod);
      });
  } else if (method === "delete") {
    fetch(`${setSchemeForFetch()}${route}`, {
      method: "DELETE",
      headers: headerContent,
    })
      .then((response) => {
        return displayStatusCode(response, className, httpMethod);
      })
      .then((json) => {
        displayResults(className, json, httpMethod);
      })
      .catch((error) => {
        displayError(error, className, httpMethod);
      });
  } else {
    console.error("Not available HTTP methods(GET, POST, PUT, DELETE)");
  }
}
