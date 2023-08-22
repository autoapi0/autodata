document.addEventListener("DOMContentLoaded", async () => {
  let res = await fetch(
    "https://cdn.jsdelivr.net/gh/autoapi0/autodata@main/scrape_data.json"
  );
  let jsonData = await res.json();
  console.log(jsonData);

  const yearSelect = document.getElementById("year");
  const makeSelect = document.getElementById("make");
  const modelSelect = document.getElementById("model");
  const modelSelectWrapper = document.getElementById("modelSelect");
  
  yearSelect.addEventListener("change", function () {
    modelSelectWrapper.classList.remove("focused");
    modelSelect.classList.remove("focused-input");
    
    let selectedYear = yearSelect.value;
    let makeOptions = jsonData[selectedYear];
    
    makeSelect.removeAttribute("disabled");
    makeSelect.setAttribute("aria-disabled", "false");
    
    modelSelect.removeAttribute("disabled");
    modelSelect.setAttribute("aria-disabled", "false");
    
    makeSelect.innerHTML = '<option value="selectMake"></option>';
    modelSelect.innerHTML = '<option value="selectModel"></option>';
    modelSelectWrapper.innerHTML = '';
    
    for (let make in makeOptions) {
      if (makeOptions.hasOwnProperty(make)) {
        const option = document.createElement("option");
        option.value = make;
        option.textContent = make;
        makeSelect.appendChild(option);
      }
    }
  });
  
  makeSelect.addEventListener("change", function () {
    modelSelectWrapper.classList.remove("focused");
    modelSelect.classList.remove("focused-input");
    
    let selectedYear = yearSelect.value;
    let selectedMake = makeSelect.value;
    let modelOptions = jsonData[selectedYear][selectedMake];
    
    modelSelect.innerHTML = '<option value="selectModel"></option>';
    modelSelectWrapper.innerHTML = '';
    
    modelOptions.forEach((modelObj) => {
      const option = document.createElement("option");
      option.value = modelObj.value;
      option.textContent = modelObj.text;
      modelSelect.appendChild(option);
    });
  });
  
  const reInputs = document.querySelectorAll(".re_input");
  
  reInputs.forEach((reInput) => {
    reInput.addEventListener("click", function () {
      this.classList.add("selected");
      const label = this.querySelector("label");
      const select = this.querySelector("select");
      label.classList.add("focused");
      select.classList.add("focused-input");
    });
  });
});

