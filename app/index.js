import clock from "clock";
import document from "document";

import { fillDOMNodes } from '../common/utils';
import DOMNodes from '../common/DOMNodes';

// Update the clock every minute
clock.granularity = "seconds";

// Update the clock every tick event
clock.ontick = ({ date }) => {
  const seconds = date.getSeconds();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  
  fillDOMNodes(hours, ...DOMNodes.hours);
  fillDOMNodes(minutes, ...DOMNodes.minutes);
  fillDOMNodes(seconds, ...DOMNodes.seconds);
}
