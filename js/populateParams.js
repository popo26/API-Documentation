//+++++++++++++++++++Function to Populate Parameters +++++++++++++++++++++++++++++++++++++++

export default function populateParams(
  count,
  parameters,
  form,
  path,
  httpMethod
) {
  if (parameters) {
    for (let key in parameters) {
      count++;
      const node = document.createElement("input");
      node.type = "text";
      node.placeholder = `${parameters[key].name}`;
      node.name = `${path}${count}${httpMethod}`;
      node.classList.add(`p${path}${httpMethod}`);
      node.classList.add(`${path}${count}${httpMethod}`);
      node.classList.add(`${parameters[key].in}`);

      const node2 = document.createElement("h6");
      const type = document.createTextNode(`${parameters[key].in}`);
      const node3 = document.createElement("label");
      node3.style.display = "block";
      node3.innerText = `${parameters[key].description}:`;
      node2.appendChild(type);
      //Add 'required' indication
      if (parameters[key].required == true) {
        node.setAttribute("required", "");
        node.style.borderColor = "red";
        node3.classList.add("add-required");
      }
      form.appendChild(node3);
      form.appendChild(node);
      form.appendChild(node2);
    }
    return count;
  }
}
