import PubSub from "pubsub-js";
const tempConverter = (temp) => {
  const celsius = temp;
  const fahrenheit = (celsius * 9) / 5 + 32;
  return { celsius, fahrenheit };
};
PubSub.subscribe("get temp in celsius to convert", (msg, temp) => {
    const convertedTemp = tempConverter(temp);
  PubSub.publish("get converted temperatures", convertedTemp);
});
