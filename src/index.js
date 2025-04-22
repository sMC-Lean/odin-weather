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

// let userInputLocation;

document.addEventListener("DOMContentLoaded", async function () {
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
  locationField.value = userLocation;
});

locationField.addEventListener("focus", (event) => {
  locationField.classList.remove("invalid");
});

getWeatherBtn.addEventListener("click", async function () {
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
});
