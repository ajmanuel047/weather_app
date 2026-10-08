import "./styles.css";

const userInput = document.getElementById("userInput");
const submitLocation = document.querySelector("#submit");
const errorMessage = document.querySelector(".errorMessage");
const toggleButton = document.getElementById("toggleButton");
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
        let response = new Promise((resolve, reject) => {
          setTimeout(() => resolve(200), 3000);
        });
        let result = await response;
        // await fetch(
        //   `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=3F82C6C2S47VK2KLJKTZE237K`
        // );
        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`);
        // }
        // const getData = await response.json();
        // console.log(getData.currentConditions.temp);
        console.log(result);
        let temperature = convertTemperature(result).toCelsius();
        displayTempValues(temperature).displayTemperature();
        displayTempValues(null, "89").displayHumidityValue();
        displayTempValues(null, null, "30 km/h").displayWindValue();
        displayTempValues(null, null, null, "40").displayTempAssume();
        displayTempValues(null, null, null, null, "Nigeria").displayLocation();
        displayTempValues().describeWeather();

        if (document.querySelector(".fahrenheit")) {
          document.querySelectorAll(".unit").forEach((element) => {
            element.textContent = "C";
            element.classList.add("celsius");
            element.classList.remove("fahrenheit");
            element.classList.remove("iconBackgroundColor");
            document.getElementById("fahrenheitIcon").style.backgroundColor =
              "rgb(198, 217, 233)";
            document.getElementById("celsiusIcon").style.backgroundColor =
              "skyBlue";
          });
        }
        userInput.value = "";
      } catch (error) {
        console.log(error);
      }
    }
    getAPI();
    event.preventDefault();
  }
});

toggleButton.addEventListener("click", () => {
  document.body.style.backgroundColor = "orange";
  const tempValue = Number(document.getElementById("temp").textContent);
  const tempValue2 = Number(document.getElementById("temp2").textContent);

  document.querySelectorAll(".unit").forEach((element) => {
    if (element.textContent == "C") {
      element.textContent = "F";
      element.classList.remove("celsius");
      element.classList.add("fahrenheit");
      element.classList.add("iconBackgroundColor");
      document.getElementById("celsiusIcon").style.backgroundColor =
        "rgb(198, 217, 233)";
      document.getElementById("fahrenheitIcon").style.backgroundColor =
        "skyBlue";
      let temperature = convertTemperature(tempValue).toFahrenheit();
      let temp2 = convertTemperature(tempValue2).toFahrenheit();
      displayTempValues(temperature).displayTemperature();
      displayTempValues(null, null, null, temp2).displayTempAssume();
    } else {
      element.textContent = "C";
      element.classList.remove("fahrenheit");
      element.classList.add("celsius");
      document.getElementById("celsiusIcon").style.backgroundColor = "skyBlue";
      document.getElementById("fahrenheitIcon").style.backgroundColor =
        "rgb(198, 217, 233)";
      let temperature = convertTemperature(tempValue).toCelsius();
      let temp2 = convertTemperature(tempValue2).toCelsius();
      displayTempValues(temperature).displayTemperature();
      displayTempValues(null, null, null, temp2).displayTempAssume();
    }
  });
});

function displayErrorMessage() {
  if (userInput.validity.valueMissing) {
    errorMessage.textContent = "Input Location i.e Country or State";
  } else if (userInput.validity.tooShort) {
    errorMessage.textContent = "Characters Must Be At Least 4";
  }
}

function convertTemperature(temp) {
  // console.log(temp);
  function toFahrenheit() {
    let result = temp * 1.8 + 32;
    console.log(result);
    return Math.round(result);
  }

  function toCelsius() {
    let result = ((temp - 32) * 5) / 9;
    return Math.round(result);
  }

  return {
    toFahrenheit,
    toCelsius,
  };
}

function displayTempValues(temperature, humidity, wind, temp2, location) {
  function displayTemperature() {
    const temp = document.getElementById("temp");
    temp.textContent = `${temperature}`;
  }

  function displayHumidityValue() {
    const humidityElement = document.getElementById("humidityValue");
    humidityElement.textContent = `${humidity}%`;
  }

  function displayWindValue() {
    const windValueElement = document.getElementById("windValue");
    windValueElement.textContent = `${wind}`;
  }

  function displayTempAssume() {
    const temp = document.getElementById("temp2");
    temp.textContent = `${temp2}`;
  }

  function displayLocation() {
    const userlocation = document.getElementById("location");
    userlocation.textContent = `${location}`;
  }

  function describeWeather() {
    const weatherNature = document.getElementById("weatherNature");
    weatherNature.textContent = "hot as fuck";
  }

  return {
    displayTemperature,
    displayHumidityValue,
    displayWindValue,
    displayTempAssume,
    displayLocation,
    describeWeather,
  };
}
