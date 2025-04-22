"use strict";

import "./index.css";
import backgroundImagePath from "./images/cloud-large-2048.png";
import iconImage from "./images/logo-32.png";
import logoImage from "./images/logo-128.png";
import { returnWeather, returnLocation } from "./js/apiScript.js";
import { formatLocation } from "./js/formatLocation.js";

const getWeatherBtn = document.getElementById("get-weather");
const locationField = document.getElementById("location");

// let userInputLocation;

document.addEventListener("DOMContentLoaded", async function () {
  const link = document.createElement("link");
  link.rel = "icon";
  link.href = iconImage;
  document.head.appendChild(link);
  document.querySelector(
    "body"
  ).style.background = `url(${backgroundImagePath})`;
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
  }
  const userLocation = await formatLocation(locationField.value);
  const weatherData = await returnWeather(userLocation);
  console.log(weatherData);
});
