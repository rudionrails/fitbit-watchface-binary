import clock from "clock";
import document from "document";
import { display } from "display";
import { peerSocket } from "messaging";

import { 
  colors,
  opacities,
  displayDOMNodes,
  findDOMNodes,
} from '../common/utils';

// screen
const backgroundDOM = document.getElementById('background');

// binary clock elements
const binaryDOM = document.getElementById('binary-time');
const binaryShadowDOM = document.getElementById('binary-shadow');
const nodes = findDOMNodes(binaryDOM);

// digital clock elements
const digitalDOM = document.getElementById("digital");
const digitalTimeDOM = document.getElementById("digital-time");
const digitalTimeShadowDOM = document.getElementById("digital-shadow");

const set = (key, newValue) => {
  switch (key) {
    case "isDisplayAlwaysOn":
      display.autoOff = newValue !== true;
      break;
    case "isDigitalClockDisabled":
      digitalDOM.style.display = (newValue === true) ? 'none' : 'inherit';
      break;
    case "binaryClockColor":
      binaryDOM.style.fill = newValue;
      binaryShadowDOM.style.fill = newValue;
      break;
    case 'binaryClockShadowOpacity':
      console.log(`[Opacity] ${JSON.stringify(newValue)}`);
      
      const index = newValue.selected[0];
      console.log(`[Opacity Index] ${index}`);
      
      // {"key":"binaryClockShadowOpacity","newValue":{"values":[{"name":"50%","value":0.5}],"selected":[1]}}
      const opacity = opacities[index].value;
      console.log(`[Opacity Index] ${opacity} (${typeof opacity})`);
      
      binaryShadowDOM.style.opacity = opacity;
      
      break;
  }
};

/**
* Clock
*/
clock.granularity = "seconds";
clock.ontick = ({ date }) => {
  const seconds = ('0' + date.getSeconds()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const hours   = ('0' + date.getHours()).slice(-2);
  const time = [hours, minutes, seconds].join(':');
  
  digitalTimeDOM.text = time;
  digitalTimeShadowDOM.text = time;
  
  try {
    displayDOMNodes(hours, nodes.hoursLeftDOM, nodes.hoursRightDOM);
    displayDOMNodes(minutes, nodes.minutesLeftDOM, nodes.minutesRightDOM);
    displayDOMNodes(seconds, nodes.secondsLeftDOM, nodes.secondsRightDOM);
  } catch (e) {
    console.log(e);
  }
};

/**
* Messaging
*/
peerSocket.onopen = () => console.log("[App] Socket open");
peerSocket.onclose = () => console.log("[App] Socket closed");
peerSocket.onmessage = ({ data }) => {
  display.on = true; // switch on the display for changes in the settings

  try {
    console.log(`[App] received ${JSON.stringify(data)}`);
    set(data.key, data.newValue);
  } catch(e) {
    console.error(`[App] Could not set ${JSON.stringify(data)}`)
  }
};