//+++++++++++++++++++++++Accordion behaviour change to open/close individually+++++++++++++++++++++++++++

export default function changeAccordionBehaviour(
  className,
  bootstrap,
  accBtn,
  httpMethod,
  accDiv
) {
  const element = bootstrap;
  const accordionDiv = accDiv;
  const accordionBtn = accBtn;
  element.setAttribute("id", `${className}${httpMethod}`);
  element.setAttribute("data-bs-parent", `#id${className}${httpMethod}`);
  accordionBtn.setAttribute("data-bs-target", `#${className}${httpMethod}`);
  accordionBtn.setAttribute("aria-controls", `${className}${httpMethod}`);
  accordionDiv.setAttribute("id", `id${className}${httpMethod}`);
}
