import PubSub from "pubsub-js";
import { retrieveCityInfo } from "./api";

/*function that handles submitting userInput for 
fetching weather data and also handles stopping form 
element submitting data by preventing default behavior of form element */
const queryEvent = (elements, callBack) => {
  elements.queryInput.parentElement.addEventListener("submit", (e) => {
    e.preventDefault();
  });
  elements.queryBtn.addEventListener("click", () => {
    PubSub.publish("initial fresh fetching", elements);
    callBack(elements.queryInput.value.trim());
    elements.queryInput.value = "";
    elements.queryInput.blur();
  });
};

/*function that handles toggling temperature */
const tempTogglingEvent = (elements) => {
  elements.tempToggler.addEventListener("click", () => {
    const celsiusIcon = elements.tempToggler.children[0];
    const fahrenheitIcon = elements.tempToggler.children[1];
    celsiusIcon.style.display =
      celsiusIcon.style.display === "none" ? "block" : "none";
    fahrenheitIcon.style.display =
      fahrenheitIcon.style.display === "block" ? "none" : "block";
    PubSub.publish("toggle temp");
  });
};
// PubSub events that allows other modules to interacts with this module
PubSub.subscribe("domReady", (msg, elements) => {
  PubSub.unsubscribe("queryEvent");
  PubSub.unsubscribe("temp toggling event");
  PubSub.subscribe("queryEvent", (msg, callBack) => {
    queryEvent(elements, callBack);
  });
  PubSub.subscribe("temp toggling event", () => {
    tempTogglingEvent(elements);
  });
  PubSub.publish("queryEvent", retrieveCityInfo);
  PubSub.publish("temp toggling event");
});
