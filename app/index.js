import clock from "clock";
import document from "document";
import { display } from "display";
import { peerSocket } from "messaging";

import { fillDOMNodes } from '../common/utils';

// screen
const screenDOM     = document.getElementById('screen');
const backgroundDOM = document.getElementById('background');

// binary clock elements
const hoursLeftDOM    = document.getElementsByClassName('Binary-hours-left');
const hoursRightDOM   = document.getElementsByClassName('Binary-hours-right');
const minutesLeftDOM  = document.getElementsByClassName('Binary-minutes-left');
const minutesRightDOM = document.getElementsByClassName('Binary-minutes-right');
const secondsLeftDOM  = document.getElementsByClassName('Binary-seconds-left');
const secondsRightDOM = document.getElementsByClassName('Binary-seconds-right');

// digital clock elements
const digitalDOM            = document.getElementById("digital");
const digitalTimeDOM        = document.getElementById("digital-time");
const digitalTimeShadowDOM  = document.getElementById("digital-shadow");

function updateClock({ date }) {
  const seconds = ('0' + date.getSeconds()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const hours   = ('0' + date.getHours()).slice(-2);
  const time = [hours, minutes, seconds].join(':');
  
  fillDOMNodes(hours, hoursLeftDOM, hoursRightDOM);
  fillDOMNodes(minutes, minutesLeftDOM, minutesRightDOM);
  fillDOMNodes(seconds, secondsLeftDOM, secondsRightDOM);
  
  digitalTimeDOM.text = time;
  digitalTimeShadowDOM.text = time;
  
  // backgroundDOM.style.fill = (backgroundDOM.style.fill == "green") ? 'yellow' : 'green';
}

/**
* Clock
*/
clock.granularity = "seconds";
clock.ontick = updateClock;
updateClock({ date: new Date() }); // don't start with a blank screen

/**
* Messaging
*/
peerSocket.onopen = () => console.log("[App] Socket open");
peerSocket.onclose = () => console.log("[App] Socket closed");
peerSocket.onmessage = ({ data }) => {
  display.on = true; // switch on the display for changes in the settings
  console.log(`[App] received: ${JSON.stringify(data)}`);
  
  if (data.key === "isDisplayAlwaysOn") {
    display.autoOff = data.newValue !== 'true';
  }
  
  if (data.key === "isDigitalClockEnabled") {
    digitalTimeDOM.style.display = (data.newValue === 'true') ? 'inherit' : 'none';
  }
};
