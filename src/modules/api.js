// function to fetch data from Visual Crossing weather api
const getWeather = async (location) => {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}/?unitGroup=metric&key=NRSD4MPJ3AAY9JZ9QJMJ8W9T5`,
      {
        mode: "cors",
      }
    );
    if (!response.ok) {
      console.log(
        `API request failed with status ${response.status} ${response.statusText}`
      );
    }
    const weatherData = await response.json();
    console.log(weatherData.timezone);
    return {
      temp: weatherData.currentConditions.temp,
      windSpeed: weatherData.currentConditions.windspeed,
      condition: weatherData.currentConditions.conditions,
      humidity: weatherData.currentConditions.humidity,
      location: weatherData.resolvedAddress,
      description: weatherData.days[0].description,
      cloudCover: weatherData.currentConditions.cloudcover,
      visibility: weatherData.currentConditions.visibility,
      timezone: weatherData.timezone,
      error: null,
    };
  // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return {
      error: "Fetch failed, pls check location and try again",
      temp: null,
      windSpeed: null,
      condition: null,
      humidity: null,
      description: null,
      cloudCover: null,
      visibility: null,
      timezone: null,
    };
  }
};

// function to get image base on weather condition of the cities searched from unsplash api
const getImage = async (weatherCondition) => {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(weatherCondition)}&per_page=1&client_id=vBf6_ZHfC4amRHZoyA3KP6wyebfih3kSxV_J5H2AU5Y`,
    {
      mode: "cors",
    }
  );
  const imageData = await response.json();
  return imageData.results[0].urls.regular;
};




