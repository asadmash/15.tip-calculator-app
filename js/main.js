const billInput = document.querySelector(".bill-input");
const peopleInput = document.querySelector(".people-input");
const tipPerPerson = document.querySelector(".tip-amount");
const totalPerPerson = document.querySelector(".total-amount");
const tips = document.querySelectorAll(".tip");
const tipCustom = document.querySelector(".tip-custom");
const resetBtn = document.querySelector("#reset");
const error = document.querySelector(".error");

billInput.addEventListener("input", billInputFun);
peopleInput.addEventListener("input", peopleInputFun);
tips.forEach((val) => {
  val.addEventListener("click", handleClick);
});
tipCustom.addEventListener("input", tipInputFun);
resetBtn.addEventListener("click", reset);

billInput.value = "0.0";
peopleInput.value = "1";
tipPerPerson.innerHTML = "$" + (0.0).toFixed(2);
totalPerPerson.innerHTML = "$" + (0.0).toFixed(2);

let billValue = 0.0;
let peopleValue = 1;
let tipValue = 0.15;

function billInputFun() {
  billValue = parseFloat(billInput.value);
  calculateTip();
}

function peopleInputFun() {
  peopleValue = parseFloat(peopleInput.value);

  if (peopleValue < 1) {
    error.style.display = "flex";
    peopleInput.style.border = "thick solid red";
  } else {
    error.style.display = "none";
    peopleInput.style.border = "none";
    calculateTip();
  }
}

function tipInputFun() {
  tipValue = parseFloat(tipCustom.value / 100);
  tips.forEach((val) => {
    val.classList.remove("active");
  });
  calculateTip();
}

function handleClick(event) {
  tips.forEach((val) => {
    val.classList.remove("active");
    if (event.target.innerHTML == val.innerHTML) {
      val.classList.add("active");
      tipValue = parseFloat(val.innerHTML) / 100;
      calculateTip();
    }
  });
}

function calculateTip() {
  if (peopleValue >= 1) {
    let tipAmount = (billValue * tipValue) / peopleValue;
    let totalAmount = billValue / peopleValue + tipAmount;

    tipPerPerson.innerHTML = "$" + tipAmount.toFixed(2);
    totalPerPerson.innerHTML = "$" + totalAmount.toFixed(2);
  }
}

function reset() {
  billInput.value = "0.0";
  billInputFun();
  peopleInput.value = "1";
  peopleInputFun();
  tipCustom.value = "";
}
