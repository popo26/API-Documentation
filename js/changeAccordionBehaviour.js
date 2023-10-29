//+++++++++++++++++++++++Accordion behaviour change to open/close individually+++++++++++++++++++++++++++

export default function changeAccordionBehaviour(className, bootstrap, accBtn, httpMethod, accDiv) {
  const element = bootstrap;
  const accordionDiv = accDiv;
  element.setAttribute("id", `${className}${httpMethod}`);
  element.setAttribute("data-bs-parent", `#id${className}${httpMethod}`);

  const accordionBtn = accBtn;
  accordionBtn.setAttribute("data-bs-target", `#${className}${httpMethod}`);
  accordionBtn.setAttribute("aria-controls", `${className}${httpMethod}`);
  // element.classList.add(`test${className}${httpMethod}`)
  accordionDiv.setAttribute("id", `id${className}${httpMethod}`);

}




// export default function changeAccordionBehaviour(className, bootstrap, accBtn) {
//   const element = bootstrap;
//   element.setAttribute("id", `${className}`);
//   const accordionBtn = accBtn;
//   accordionBtn.setAttribute("data-bs-target", `#${className}`);
//   accordionBtn.setAttribute("aria-controls", `${className}`);
// }
