import PubSub from "pubsub-js";
function fetchDom() {
  const weatherSection = document.querySelector(".weather_section"); // weather section element
  // weather section direct children and their children
  const cityInfo = weatherSection.querySelector(".city_info"); // city info element
  // cityInfo children
  const city_name = cityInfo.querySelector(".city_name");
  const city_time = cityInfo.querySelector(".city_time");
  const city_date = cityInfo.querySelector(".city_date");

  const tempToggler = weatherSection.querySelector(".temp_toggler"); // temperature toggler element
  // tempToggler children
  const celsius = tempToggler.querySelector(".celcius");
  const fahrenheit = tempToggler.querySelector(".fahrenheit");

  const dataFetchingPara = weatherSection.querySelector(".data_fetching"); // data fetching para element
  const errorMessagePara = weatherSection.querySelector(".error_message");

  const conditionMessage = weatherSection.querySelector(".condition_message"); // weather condition message element
  const cityImage = weatherSection.querySelector(".cityImage"); // query city image element
  const imageGlass = weatherSection.querySelector(".imageGlass"); // query city blur effect element
  const weatherInfo = weatherSection.querySelector(".weather_info"); // weather info or analysis element
  // weather info texts
  const temperatureTxt = weatherInfo.querySelector(
    ".temperature_box > .temperature-txt"
  ); // temperature text element
  const humidityTxt = weatherInfo.querySelector(
    ".humidity_box > .humidity-txt"
  );
  const windSpeedTxt = weatherInfo.querySelector(
    ".fatality > div:nth-of-type(1) > .windSpeed-txt"
  );
  const cloudCoverTxt = weatherInfo.querySelector(
    ".fatality > div:nth-of-type(2) > .cloudCover-txt"
  );
  const visibilityTxt = weatherInfo.querySelector(
    ".fatality > div:nth-of-type(3) > .visibility-txt"
  );
  // query section children
  const queryInput = document.querySelector(".query_section > form > input");
  const queryBtn = document.querySelector(".query_section > .query_btn");
  PubSub.publish("domReady", {
    weatherSection,
    weatherInfo,
    cityInfo,
    cityImage,
    city_name,
    city_time,
    city_date,
    tempToggler,
    celsius,
    fahrenheit,
    dataFetchingPara,
    conditionMessage,
    imageGlass,
    temperatureTxt,
    humidityTxt,
    windSpeedTxt,
    cloudCoverTxt,
    visibilityTxt,
    errorMessagePara,
    queryBtn,
    queryInput,
  });
}