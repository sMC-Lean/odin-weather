export const returnWeather = async function getWeatherDataFromAPI(location) {
  const weatherApiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?isonSet=icons2&unitGroup=metric&include=events%2Cdays%2Calerts%2Ccurrent%2Chours&key=CH6HCKMGHGXS9UFWG4NN6XECL&contentType=json
    `;
  try {
    const apiResponse = await fetch(weatherApiUrl);
    if (apiResponse.status === 200) {
      const apiData = await apiResponse.json();
      return apiData;
    } else if (apiResponse.status !== 200)
      throw new Error("API either did not work or did not like your request");
  } catch (error) {
    return { error: error };
  }
};

export const returnLocation = async function getLocationDataFromApi() {
  const locationApiUrl = `https://ipgeolocation.abstractapi.com/v1/?api_key=6aaa1eaeb112440babd86da84d826e89`;
  try {
    const apiResponse = await fetch(locationApiUrl);
    const apiData = await apiResponse.json();
    return `${apiData.city}, ${apiData.region}, ${apiData.country}`;
  } catch (error) {
    return { error: error };
  }
};
