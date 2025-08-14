// import other modules and pubsub-js library for initialization on app start
import "./assets/styles/styles.css";
import PubSub from "pubsub-js";
import "./modules/dom.js";
import "./modules/events.js";
import "./modules/ui.js";
import "./modules/tempConverter.js"
PubSub.publish("activate fetchDom");
