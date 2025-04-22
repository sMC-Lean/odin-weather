export const returnWeather = async function getWeatherDataFromAPI(location) {
  const weatherApiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&include=events%2Cdays%2Calerts%2Ccurrent%2Chours&key=CH6HCKMGHGXS9UFWG4NN6XECL&contentType=json
    `;
  const apiResponse = await fetch(weatherApiUrl);
  const apiData = await apiResponse.json();
  return apiData;
};

export const returnLocation = async function getLocationDataFromApi() {
  const locationApiUrl = `https://ipgeolocation.abstractapi.com/v1/?api_key=6aaa1eaeb112440babd86da84d826e89`;
  const apiResponse = await fetch(locationApiUrl);
  const apiData = await apiResponse.json();
  return `${apiData.city}, ${apiData.region}, ${apiData.country}`;
};
