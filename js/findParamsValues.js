//+++++++++++++++++++Function to Find Parameter Values +++++++++++++++++++++++++++++++++++++++

export default function findParamsValues(classRouteHeader) {
  let paramEntries = [];
  if (document.querySelector(`.p${classRouteHeader}`)) {
    const paramInputs = document.querySelectorAll(`.p${classRouteHeader}`);
    for (let i = 0; i < paramInputs.length; i++) {
      const entry = paramInputs[i].value;
      paramEntries.push(entry);
    }
    return paramEntries;
  }
}
