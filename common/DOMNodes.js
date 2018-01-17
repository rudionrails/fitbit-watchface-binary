const hoursLeftDOM    = document.getElementsByClassName('Binary-hours-left');
const hoursRightDOM   = document.getElementsByClassName('Binary-hours-right');
const minutesLeftDOM  = document.getElementsByClassName('Binary-minutes-left');
const minutesRightDOM = document.getElementsByClassName('Binary-minutes-right');
const secondsLeftDOM  = document.getElementsByClassName('Binary-seconds-left');
const secondsRightDOM = document.getElementsByClassName('Binary-seconds-right');

export default {
  hours: [ hoursLeftDOM, hoursRightDOM ],
  minutes: [ minutesLeftDOM, minutesRightDOM ],
  seconds: [ secondsLeftDOM, secondssRightDOM ],
};