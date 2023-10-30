//+++++++++++++++++++Function to Find Parameter Values +++++++++++++++++++++++++++++++++++++++
export default function findParamsValues(classRouteHeader, httpMethod) {
  let paramEntries = [];
  if (document.querySelector(`.p${classRouteHeader}${httpMethod}`)) {
    const paramInputs = document.querySelectorAll(
      `.p${classRouteHeader}${httpMethod}`
    );
    for (let i = 0; i < paramInputs.length; i++) {
      const entry = paramInputs[i].value;
      paramEntries.push(entry);
    }
    return paramEntries;
  }
}
