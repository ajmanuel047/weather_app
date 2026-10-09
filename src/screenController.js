import "./styles.css";
import clear_day from "./images/sunny.jpg";
import rainy from "./images/rainyday.jpg";
import clear_night from "./images/clear_night.jpg";
import cloudy from "./images/cloudy.jpg";
import cold from "./images/cold.jpg";
import fog from "./images/fog.jpg";
import fog2 from "./images/partly_cloudy_day.jpg";
import partly_cloudy_day from "./images/partly_cloudy_day2.jpg";
import partly_cloudy_night from "./images/partly_cloudy_night.jpg";
import showers_day from "./images/showers_day.jpg";
import snow from "./images/snow.jpg";
import thunder_rain from "./images/thunder_rain.jpg";
import wind from "./images/wind.jpg";

const weatherNatureImages = {
  "clear-day": clear_day,
  "clear-night": clear_night,
  cloudy: cloudy,
  "partly-cloudy-day": partly_cloudy_day,
  "partly-cloudy-night": partly_cloudy_night,
  rain: rainy,
  snow: snow,
  fog: fog,
  wind: wind,
  "showers-day": showers_day,
  "thunder-rain": thunder_rain,
};

const coldWeather = {
  cold,
  snow
}

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

        let response = await fetch(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=3F82C6C2S47VK2KLJKTZE237K`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const getData = await response.json();
        let locationTemperature = getData.currentConditions.temp;
        let resolvedlocation = getData.resolvedAddress;
        let humidity = Math.round(getData.currentConditions.humidity);
        let windSpeed = getData.currentConditions.windspeed;
        let temperature = convertTemperature(locationTemperature).toCelsius();
        let weatherCondition = null
        const dataIcon = getData.currentConditions.icon;
        let icon = null;
        console.log(temperature)
        console.log(weatherCondition)
        if(temperature <= 10){     
            if(temperature > 0 && temperature <= 10){
              icon = coldWeather.cold
              weatherCondition = 'Cold'
            }else {
              icon = coldWeather.snow
              weatherCondition = 'Extremely Cold'

              // reykjavik, iceland
            }
          
        }else {
          console.log('no')
          for (const weatherIcon in weatherNatureImages) {
          if (dataIcon == weatherIcon) {
            icon = weatherNatureImages[weatherIcon];
            weatherCondition = getData.currentConditions.conditions;
            console.log(weatherIcon);
            console.log(getData)
          }
        }
        }
        
        console.log(icon);
        let feelslike = convertTemperature(
          getData.currentConditions.feelslike
        ).toCelsius();

        displayTempValues(temperature).displayTemperature();
        displayTempValues(null, humidity).displayHumidityValue();
        displayTempValues(null, null, `${windSpeed}km/h`).displayWindValue();
        displayTempValues(null, null, null, feelslike).displayTempAssume();
        displayTempValues(
          null,
          null,
          null,
          null,
          resolvedlocation
        ).displayLocation();
        displayTempValues(
          null,
          null,
          null,
          null,
          null,
          weatherCondition
        ).describeWeather();

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
        document.getElementById(
          "container"
        ).style.backgroundImage = `url(${icon})`;
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
    // console.log(result);
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

function displayTempValues(
  temperature,
  humidity,
  wind,
  temp2,
  location,
  weatherCondition
) {
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
    weatherNature.textContent = `${weatherCondition}`;
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
