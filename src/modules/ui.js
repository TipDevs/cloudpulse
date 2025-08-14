import PubSub from "pubsub-js";
/*function that run on every new weather query to ensure all element are either active or not*/
const initFetching = (elements) => {
  elements.weatherSection.classList.add("fetchingData");
  elements.cityImage.classList.add("queryFailed");
  elements.imageGlass.classList.add("queryFailed");
  elements.cityInfo.classList.add("queryFailed");
  elements.conditionMessage.classList.add("queryFailed");
  elements.tempToggler.classList.add("queryFailed");
  elements.weatherInfo.classList.add("queryFailed");
  elements.errorMessagePara.classList.add("queryFailed");
  elements.dataFetchingPara.style.display = "block";
};

/*function that update the user interface base on weather fetching result*/
const updateUi = (elements) => {
  const fetchFailUI = (error) => {
    elements.dataFetchingPara.style.display = "none";
    elements.errorMessagePara.classList.remove("queryFailed");
    elements.errorMessagePara.textContent = error;
  };
  const fetchSuccessfulUI = (weather, cityImage, date, time) => {
    elements.tempToggler.children[0].style.display = "block";
    elements.tempToggler.children[1].style.display = "none";
    elements.dataFetchingPara.style.display = "none";
    elements.weatherSection.classList.remove("fetchingData");
    elements.cityImage.classList.remove("queryFailed");
    elements.imageGlass.classList.remove("queryFailed");
    elements.cityInfo.classList.remove("queryFailed");
    elements.conditionMessage.classList.remove("queryFailed");
    elements.tempToggler.classList.remove("queryFailed");
    elements.weatherInfo.classList.remove("queryFailed");
    elements.cityImage.src = cityImage;
    elements.city_name.textContent = weather.location;
    elements.city_time.textContent = time;
      elements.city_date.textContent = date;
      elements.conditionMessage.textContent = weather.description;
    elements.temperatureTxt.textContent = `Temp: ${weather.temp}°c`;
    elements.humidityTxt.textContent = `Humidity: ${weather.humidity}%`;
    elements.windSpeedTxt.textContent = `Wind Speed: ${weather.windSpeed}km/h`;
    elements.cloudCoverTxt.textContent = `Cloud cover: ${weather.cloudCover}%`;
    elements.visibilityTxt.textContent = `Visibility: ${weather.visibility}km`;
  };
  return { fetchFailUI, fetchSuccessfulUI };
};

/*function that update the temperature on temperature toggling mode*/
const tempToggle = (elements, celsius, fahrenheit) => {
  const toggle = () => {
    if (elements.tempToggler.children[0].style.display === "none") {
      elements.temperatureTxt.textContent = `Temp: ${fahrenheit}°f`;
    } else {
      elements.temperatureTxt.textContent = `Temp: ${celsius}°c`;
    }
  };
  return { toggle };
};

// PubSub events that allows other modules to interacts with this module
PubSub.subscribe("domReady", (msg, elements) => {
  const UI = updateUi(elements);
  console.log(elements);

  // Ensure no duplicate subscriptions
  PubSub.unsubscribe("fetchFail UI");
  PubSub.unsubscribe("fetch successful UI");

  PubSub.subscribe("fetchFail UI", (msg, error) => {
    if (UI) UI.fetchFailUI(error);
  });

  PubSub.subscribe(
    "fetch successful UI",
    (msg, { weather, weatherImage, date, time }) => {
      console.log(weather);
      if (UI) UI.fetchSuccessfulUI(weather, weatherImage, date, time);
      PubSub.publish("get temp in celsius to convert", weather.temp);
    }
  );
  PubSub.subscribe(
    "get converted temperatures",
    (msg, { celsius, fahrenheit }) => {
      console.log(celsius);
      const temp = tempToggle(elements, celsius, fahrenheit);
      PubSub.subscribe("toggle temp", () => {
        temp.toggle();
      });
    }
  );
});
PubSub.subscribe("initial fresh fetching", (msg, elements) => {
  initFetching(elements);
});
