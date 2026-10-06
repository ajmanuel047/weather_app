// import { greeting } from "./greeting.js";
import "./styles.css";

const userInput = document.getElementById("userInput");
const submitLocation = document.querySelector("#submit");
const errorMessage = document.querySelector(".errorMessage");

userInput.addEventListener("input", () => {
  if (userInput.validity.valid) {
    errorMessage.textContent = "";
    // errorMessage.className = "error"
  } else {
    displayErrorMessage();
  }
});

submitLocation.addEventListener("click", (event) => {
  if (!userInput.validity.valid) {
    displayErrorMessage();
    event.preventDefault();
  } else {
    let location = userInput.value;
    async function getAPI() {
      try {
        const response = await fetch(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=3F82C6C2S47VK2KLJKTZE237K`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const getData = await response.json();
        console.log(getData.currentConditions.temp);
      } catch (error) {
        console.log(error);
      }
    }
    getAPI();
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
