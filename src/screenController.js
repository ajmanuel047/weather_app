// import { greeting } from "./greeting.js";
import "./styles.css";

const userInput = document.getElementById("userInput");
const submitLocation = document.querySelector("form");
const errorMessage = document.querySelector(".errorMessage");

userInput.addEventListener("input", () => {
  if (userInput.validity.valid) {
    errorMessage.textContent = "";
    // errorMessage.className = "error"
  } else {
    displayErrorMessage();
  }
});

submitLocation.addEventListener("submit", (event) => {
  if (!userInput.validity.valid) {
    displayErrorMessage();
    event.preventDefault();
  }
});

function displayErrorMessage() { 
    if (userInput.validity.valueMissing) {
      errorMessage.textContent = "Input Location i.e Country or State";
    } else if (userInput.validity.tooShort) {
      errorMessage.textContent = "Characters Must Be At Least 4";
    }
  }

