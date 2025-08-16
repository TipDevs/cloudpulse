import PubSub from "pubsub-js";
import { parseISO, format } from "date-fns";
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
      const statusMessages = {
        400: "Invalid request format or parameters.",
        401: "Unauthorized – check your API key.",
        404: "Location not found.",
        429: "Rate limit exceeded – try again later.",
        500: "Server error – try again later."
      };

      throw new Error(statusMessages[response.status] || `Unexpected error (${response.status})`);
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
   
  } catch (error) {
    return {
      error,
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

// function to get city date and time base on timezone from timezoneDB api
const getCityDateAndTime = async (timezone) => {
  const response = await fetch(
    `https://api.timezonedb.com/v2.1/get-time-zone?key=3TLNN3OEVD4E&format=json&by=zone&zone=${encodeURIComponent(timezone)}
`,
    {
      mode: "cors",
    }
  );
  const data = await response.json();
  const dateAndTime = data.formatted;
  const dateAndTimeParsed = parseISO(dateAndTime.replace(" ", "T"));
  const date = format(dateAndTimeParsed, "MMM do, yyyy");
  const time = format(dateAndTimeParsed, "hh:mm a");
  return {date, time};
};

// function that retrieve weather conditions, city image, city date and time
const retrieveCityInfo = async (city) => {
  const weather = await getWeather(city);
  if (weather.error) {
    PubSub.publish("fetchFail UI", weather.error);
  } else {
    const cityImage = await getImage(weather.location);
    const cityDateAndTime = await getCityDateAndTime(weather.timezone);
    PubSub.publish("fetch successful UI", {
      weather,
      weatherImage: cityImage,
      date: cityDateAndTime.date,
      time: cityDateAndTime.time,
    });
  }
};

export { retrieveCityInfo };
