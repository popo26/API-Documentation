//+++++++++++++++++++++++Accordion behaviour change to open/close individually+++++++++++++++++++++++++++
export default function changeAccordionBehaviour(className, bootstrap, accBtn) {
  const element = bootstrap;
  element.setAttribute("id", `${className}`);
  const accordionBtn = accBtn;
  accordionBtn.setAttribute("data-bs-target", `#${className}`);
  accordionBtn.setAttribute("aria-controls", `${className}`);
}
