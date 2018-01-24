import clock from 'clock';
import document from 'document';

import { display } from 'display';
import { peerSocket } from 'messaging';

import { colors } from '../common/colors';
import { fillDOMNodes } from '../common/utils';

// screen
const screenDOM = document.getElementById('screen');
const backgroundDOM = document.getElementById('background');

// binary clock elements
const hoursLeftDOM = document.getElementsByClassName('Binary-hours-left');
const hoursRightDOM = document.getElementsByClassName('Binary-hours-right');
const minutesLeftDOM = document.getElementsByClassName('Binary-minutes-left');
const minutesRightDOM = document.getElementsByClassName('Binary-minutes-right');
const secondsLeftDOM = document.getElementsByClassName('Binary-seconds-left');
const secondsRightDOM = document.getElementsByClassName('Binary-seconds-right');

// digital clock elements
const digitalDOM = document.getElementById('digital');
const digitalTimeDOM = document.getElementById('digital-time');
const digitalTimeShadowDOM = document.getElementById('digital-shadow');

let themeColor = colors[0].color;

function set(key, value) {
  switch (key) {
    case 'isDisplayAlwaysOn':
      display.autoOff = value !== true;
      break;
    case 'isDigitalClockDisabled':
      digitalDOM.style.display = (value === true) ? 'none' : 'inherit';
      break;
    case 'themeColor':
      themeColor = value;
      break;
  }
}

function updateClock({ date }) {
  const seconds = (`0${date.getSeconds()}`).slice(-2);
  const minutes = (`0${date.getMinutes()}`).slice(-2);
  const hours = (`0${date.getHours()}`).slice(-2);
  const time = [hours, minutes, seconds].join(':');

  try {
    fillDOMNodes(themeColor, hours, hoursLeftDOM, hoursRightDOM);
    fillDOMNodes(themeColor, minutes, minutesLeftDOM, minutesRightDOM);
    fillDOMNodes(themeColor, seconds, secondsLeftDOM, secondsRightDOM);
  } catch (e) {
    console.error(`broken color: ${themeColor}`);
    console.log(e);
  }

  digitalTimeDOM.text = time;
  digitalTimeShadowDOM.text = time;
}

/**
* Clock
*/
clock.granularity = 'seconds';
clock.ontick = updateClock;

/**
* Messaging
*/
peerSocket.onopen = () => console.log('[App] Socket open');
peerSocket.onclose = () => console.log('[App] Socket closed');
peerSocket.onmessage = ({ data }) => {
  display.on = true; // switch on the display for changes in the settings

  try {
    console.log(`[App] received ${JSON.stringify(data)}`);
    set(data.key, data.newValue);
  } catch (e) {
    console.error(`[App] Could not set ${JSON.stringify(data)}`);
  }
};
