const wrapper = document.getElementById("app-wrapper");
const header = document.getElementById("app-header");
const spinner = document.getElementById("loading-spinner");

class forecast {
  constructor(requestedDay, data) {
    if (requestedDay === 0) {
      this.location = data.resolvedAddress;
      this.icon = data.currentConditions.icon;
      this.conditions = data.currentConditions.conditions;
      this.precip = data.currentConditions.precip || 0;
      this.precipprob = data.currentConditions.precipprob;
      this.sunrise = data.currentConditions.sunrise;
      this.sunset = data.currentConditions.sunset;
      this.currentTemp = data.currentConditions.temp;
      this.humidity = data.currentConditions.humidity;
      this.uvindex = data.currentConditions.uvindex;
      this.description = data.days[requestedDay].description;
      this.tempmin = data.days[requestedDay].tempmin;
      this.tempmax = data.days[requestedDay].tempmax;
      this.date = data.days[requestedDay].datetime;
    } else if (requestedDay === 1) {
      this.date = data.days[requestedDay].datetime;
      this.description = data.days[requestedDay].description;
      this.icon = data.days[requestedDay].icon;
      this.conditions = data.days[requestedDay].conditions;
      this.precip = data.days[requestedDay].precip;
      this.precipprob = data.days[requestedDay].precipprob;
      this.sunrise = data.days[requestedDay].sunrise;
      this.sunset = data.days[requestedDay].sunset;
      this.humidity = data.days[requestedDay].humidity;
      this.avgtemp = data.days[requestedDay].temp;
      this.tempmin = data.days[requestedDay].tempmin;
      this.tempmax = data.days[requestedDay].tempmax;
      this.uvindex = data.days[requestedDay].uvindex;
    } else {
      this.date = data.days[requestedDay].datetime;
      this.tempmin = data.days[requestedDay].tempmin;
      this.tempmax = data.days[requestedDay].tempmax;
      this.icon = data.days[requestedDay].icon;
      this.precip = data.days[requestedDay].precip;
      this.precipprob = data.days[requestedDay].precipprob;
      this.shortDesc = data.days[requestedDay].conditions;
    }
  }
}

export const showLoading = function displayLoadSpinner(show) {
  show ? (spinner.style.display = "block") : (spinner.style.display = "none");
};

const moveHeader = function moveHeaderBarAfterFirstLoad(header) {
  header.style.marginTop = "12px";
  header.classList.add("weather-loaded");
};

const formatData = function breakAPIDataIntoDayForecasts(data) {
  console.log(data);
  const todaysData = new forecast(0, data);
  const tomorrowsData = new forecast(1, data);
  const futureData = [
    new forecast(2, data),
    new forecast(3, data),
    new forecast(4, data),
  ];
  return { todaysData, tomorrowsData, futureData };
};

const formatDate = function formatDateForForecastDisplay(date) {
  const dateComponents = date.split("-").reverse();
  const displayDate = `${dateComponents[0]}/${dateComponents[1]}`;
  return displayDate;
};

const formatTime = function formatTimeForDisplay(time) {
  const timeComponents = time.split(":");
  const hours =
    timeComponents[0] < 13 ? timeComponents[0] : timeComponents[0] - 12;
  const minutes = timeComponents[1];
  const timeOfDay = timeComponents[0] < 13 ? "am" : "pm";
  return `${hours}:${minutes} ${timeOfDay}`;
};

const formatLocation = function formatLocationForDisplay(location) {
  const locationComponents = location.split(",");
  const displayLocation = `${locationComponents[0]} Weather`;
  return displayLocation;
};

const showToday = function addTodaysForecastToDisplay(forecastData) {
  const html = `
        <div id="todays-forecast_header">
          <div id="todays-forecast_header-icons">
            <img id="icon-today" src="" alt="icon" />
            <h3>${forecastData.currentTemp}&#176;C</h3>
          </div>
          <div id="todays-forecast_header-title">
            <h3>${formatLocation(forecastData.location)}</h3>
            <h4>${formatDate(forecastData.date)}</h4>
          </div>
        </div>
        <h5 id="todays-forecast_description">
          ${forecastData.description}
        </h5>
        <div id="todays-forecast_info">
          <div class="todays-forecast_info-item">
            <span>Temp: </span><span>${forecastData.tempmin}&#176;C/${
    forecastData.tempmax
  }&#176;C</span>
          </div>
          <div class="todays-forecast_info-item">
            <span>Precipitation: </span><span>${forecastData.precip}mm (${
    forecastData.precipprob
  }%)</span>
          </div>
          <div class="todays-forecast_info-item">
            <span>UV Index: </span><span>${forecastData.uvindex}</span>
          </div>
          <div class="todays-forecast_info-item">
            <span>Humidity: </span><span>${forecastData.humidity}</span>
          </div>
          <div class="todays-forecast_info-item">
            <span>Sunrise: </span><span>${formatTime(
              forecastData.sunrise
            )}</span>
          </div>
          <div class="todays-forecast_info-item">
            <span>sunset: </span><span>${formatTime(forecastData.sunset)}</span>
          </div>
        </div>`;

  const newDiv = document.createElement("div");
  newDiv.setAttribute("id", "todays-forecast");
  newDiv.insertAdjacentHTML("beforeend", html);
  wrapper.appendChild(newDiv);

  import(`../icons/${forecastData.icon}.png`).then((imgUrl) => {
    document.querySelector("#icon-today").src = imgUrl.default;
  });
};

const showTomorrow = function addTomorrowsForecastToDisplay(forecastData) {
  const html = `
  <div id="todays-forecast_header">
    <div id="todays-forecast_header-icons">
      <img id="icon-tomorrow" src="" alt="icon" />
      <h3>${forecastData.avgtemp}&#176;C</h3>
    </div>
    <div id="todays-forecast_header-title">
      <h3>Tomorrow</h3>
      <h4>${formatDate(forecastData.date)}</h4>
    </div>
  </div>
  <h5 id="todays-forecast_description">
    ${forecastData.description}
  </h5>
  <div id="todays-forecast_info">
    <div class="todays-forecast_info-item">
      <span>Temp: </span><span>${forecastData.tempmin}&#176;C/${
    forecastData.tempmax
  }&#176;C</span>
    </div>
    <div class="todays-forecast_info-item">
      <span>Precipitation: </span><span>${forecastData.precip}mm (${
    forecastData.precipprob
  }%)</span>
    </div>
    <div class="todays-forecast_info-item">
      <span>UV Index: </span><span>${forecastData.uvindex}</span>
    </div>
    <div class="todays-forecast_info-item">
      <span>Humidity: </span><span>${forecastData.humidity}</span>
    </div>
    <div class="todays-forecast_info-item">
      <span>Sunrise: </span><span>${formatTime(forecastData.sunrise)}</span>
    </div>
    <div class="todays-forecast_info-item">
      <span>sunset: </span><span>${formatTime(forecastData.sunset)}</span>
    </div>
  </div>`;
  const newDiv = document.createElement("div");
  newDiv.setAttribute("id", "tomorrows-forecast");
  newDiv.insertAdjacentHTML("beforeend", html);
  wrapper.appendChild(newDiv);

  import(`../icons/${forecastData.icon}.png`).then((imgUrl) => {
    document.querySelector("#icon-tomorrow").src = imgUrl.default;
  });
};

const showFuture = function showDaysToFiveDayOutlook(forecastData) {
  const newDiv = document.createElement("div");
  newDiv.setAttribute("id", "future-forecast");
  wrapper.appendChild(newDiv);
  forecastData.forEach((day, index) => {
    console.log(day);
    const html = `
          <div class="future-forecast_day">
            <div class="future-forecast_day-header">
              <h3 class="day-date">${formatDate(day.date)}</h3>
              <h4 class="future-forecast_day-description">${day.shortDesc}</h4>
              <div class="future-forecast_day-list">
                <div class="future-forecast_day-list_item">
                  <span>${day.tempmin}&#176;C/${day.tempmax}&#176;C</span>
                </div>
                <div class="future-forecast_day-list_item">
                  <span>${day.precip}mm (${day.precipprob}%)</span>
                </div>
              </div>
            </div>
              <img src="" alt="weather icon" id="day${index}-icon" />
          </div>`;
    newDiv.insertAdjacentHTML("beforeend", html);

    import(`../icons/${day.icon}.png`).then((imgUrl) => {
      const currImage = document.getElementById(`day${index}-icon`);
      currImage.src = imgUrl.default;
    });
  });
};

export const clearDisplay = function deleteOldDisplayData() {
  const todaysForecastElement = document.getElementById("todays-forecast");
  if (todaysForecastElement) {
    todaysForecastElement.remove();
  }
  const tomorrowsForecastElement =
    document.getElementById("tomorrows-forecast");
  if (tomorrowsForecastElement) {
    tomorrowsForecastElement.remove();
  }
  const futureForecastElement = document.getElementById("future-forecast");
  if (futureForecastElement) {
    futureForecastElement.remove();
  }
};

export const updateDisplay = function displayNewWeatherData(data) {
  moveHeader(header);
  const forecastData = formatData(data);
  console.log(forecastData);
  showToday(forecastData.todaysData);
  showTomorrow(forecastData.tomorrowsData);
  showFuture(forecastData.futureData);
  showLoading(false);
};
