//++++++++++++++++++++++++++Function to Remove Special Characters From Original Endpoints++++++++++++++++++++++++++++++++++++++++++++++
export default function changeRoute(string) {
  let result = [];
  for (let x in string) {
    if (
      string[x] == "/" ||
      string[x] == "}" ||
      string[x] == "{" ||
      string[x] == ":"
    ) {
      let newString = string[x].replace(string[x], "");
    } else {
      result.push(string[x]);
    }
  }
  let newResult = result.join("");
  return newResult;
}
