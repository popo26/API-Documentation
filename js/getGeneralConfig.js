//+++++++++++++++++++++++++++++++++++ Function to Populate Schemes Dropdown++++++++++++++++++++++++++++++++++++++++++++++
function createSchemeDropdown(data) {
  for (let i = 0; i < data.schemes.length; i++) {
    const node = document.createElement("li");
    node.classList.add(`scheme${data.schemes[i]}`);
    node.innerText = data.schemes[i].toUpperCase();
    document.querySelector(".schemes").appendChild(node);
    displayScheme(data.schemes[i]);
  }
}

//+++++++++++++++++++++++++++++++++++ Function to Display Current Scheme++++++++++++++++++++++++++++++++++++++++++++++
function displayScheme(className) {
  document
    .querySelector(`.scheme${className}`)
    .addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(".scheme-btn").innerText = className.toUpperCase();
    });
}

//+++++++++++++++++++++++++++++++++++ Function to Populate General Config++++++++++++++++++++++++++++++++++++++++++++++
export default function getGeneralConfig(data) {
  document.querySelector(".project-title").innerText = data.info.title;
  document.querySelector(".base-url").innerText = `${data.host}`;
  document.querySelector(".base-path").innerText = `${data.basePath}`;
  document.querySelector(".sub-title").innerText = data.info.description;
  createSchemeDropdown(data);
}
