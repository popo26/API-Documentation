// ++++++++++++++++++++++++++Clickng Try-Out button to display Run button++++++++++++++++++++++++++++++++++++++

export default function clickTryOutBtnToShowRunBtn(
  className,
  runBtn,
  httpMethod
) {
  runBtn.addEventListener("click", function () {
    const individualRunBtn = document.querySelector(
      `.run${className}${httpMethod}`
    );
    const runBtnMsg = document.querySelector(
      `.runMsg${className}${httpMethod}`
    );
    const tryOutBtn = document.querySelector(`.try${className}${httpMethod}`);
    const resultDiv = document.querySelector(
      `.result${className}${httpMethod}`
    );
    const paramsDiv = document.querySelector(
      `.paramDiv${className}${httpMethod}`
    );
    const resultStatusCode = document.querySelector(
      `.resultStatus${className}${httpMethod}`
    );
    const individualParamInput = document.querySelector(
      `.p${className}${httpMethod}`
    );

    if (individualRunBtn.style.display === "block") {
      runBtnMsg.style.display = "none";
      tryOutBtn.innerText = "Try Out";
      individualRunBtn.style.display = "none";
      resultDiv.style.display = "none";
      resultDiv.innerHTML = "";
      paramsDiv.style.backgroundColor = "#ffffff";
      resultStatusCode.style.display = "none";
      if (individualParamInput) {
        individualParamInput.value = "";
      }
    } else {
      individualRunBtn.style.display = "block";
      tryOutBtn.innerText = "Cancel";
      runBtnMsg.style.display = "block";
      if (individualParamInput) {
        runBtnMsg.innerText = "Enter parameters and click Run";
      } else {
        runBtnMsg.innerText = "Click Run";
      }
    }
  });
}
