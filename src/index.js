"use strict";

import "./index.css";
import backgroundImagePath from "./images/cloud-large-2048.png";
import iconImage from "./images/logo-32.png";
import logoImage from "./images/logo-128.png";
import { returnWeather, returnLocation } from "./js/apiScript.js";
import { formatLocation } from "./js/formatLocation.js";
import { showLoading, clearDisplay, updateDisplay } from "./js/view.js";

const getWeatherBtn = document.getElementById("get-weather");
const locationField = document.getElementById("location");
const headerBar = document.getElementById("app-header");
const creatorLink = document.getElementById("creator-link");

// let userInputLocation;

async function initPage() {
  const link = document.createElement("link");
  link.rel = "icon";
  link.href = iconImage;
  document.head.appendChild(link);
  const body = document.querySelector("body");
  body.style.background = `url(${backgroundImagePath})`;
  body.style.backgroundRepeat = "no-repeat";
  body.style.backgroundPosition = "center center";
  body.style.backgroundSize = "cover";
  document.querySelector("#logo").src = logoImage;
  const userLocation = await returnLocation();
  if (userLocation.error) {
    console.error(userLocation.error);
    console.log(
      "unable to get weather location from API, please input manually"
    );
  } else if (!userLocation.error) {
    locationField.value = userLocation;
  }
}

async function runWeatherApp() {
  if (!locationField.value) {
    locationField.classList.add("invalid");
    return;
  }
  clearDisplay();
  showLoading(true);
  const userLocation = await formatLocation(locationField.value);
  const weatherData = await returnWeather(userLocation);
  updateDisplay(weatherData);
  locationField.value = "";
}

function removeValidationError() {
  locationField.classList.remove("invalid");
}

document.addEventListener("DOMContentLoaded", initPage);
document.addEventListener("keyup", (event) => {
  if (event.code === "Enter") runWeatherApp();
});
locationField.addEventListener("focus", removeValidationError);
getWeatherBtn.addEventListener("click", runWeatherApp);

creatorLink.addEventListener("click", () => {
  window.open("https://github.com/sMC-Lean", "blank");
});
