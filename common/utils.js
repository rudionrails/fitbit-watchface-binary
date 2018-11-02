export const colors = [
  { color: '#3BF7DE' }, // fb-aqua
  { color: '#BCD8F8' }, // fb-lavender	
  { color: '#B8FC68' }, // fb-lime
  { color: '#5BE37D' }, // fb-mint
  { color: '#E4FA3C' }, // fb-yellow
  { color: '#FFCC33' }, // fb-peach
  { color: '#F80070' }, // fb-magenta
];

export const opacities = [
  {name: "0%",  value: 0},
  {name: "20%", value: 0.2},
  {name: "40%", value: 0.4},
  {name: "60%", value: 0.6},
  {name: "80%", value: 0.8},
];

export const defaultSettings = {
  isDigitalClockDisabled: 'false',
  isDisplayAlwaysOn: 'false',
  binaryClockColor: JSON.stringify(colors[0].color),
  binaryClockShadowOpacity: { selected: 2 }, // opacities index
}

export function displayDOMNodes(digit, leftBinaryDOM, rightBinaryDOM) {
  const [leftBinaryDigit, rightBinaryDigit] = `${digit}`.split('');
  const toBinary = (digit) => ('0000' + (digit >>> 0).toString(2)).slice(-4);
  const apply = (digit, DOMNodes) => {
    const digits = toBinary(digit).split('').reverse();

    DOMNodes.forEach((DOMNode, index) => {
      DOMNode.style.display = (digits[index] === '1') ? 'inherit' : 'none';
    });
  };

  apply(leftBinaryDigit, leftBinaryDOM);
  apply(rightBinaryDigit, rightBinaryDOM);
}

export const findDOMNodes = (DOMNode) => ({
  hoursLeftDOM: DOMNode.getElementsByClassName('Binary-hours-left'),
  hoursRightDOM: DOMNode.getElementsByClassName('Binary-hours-right'),
  minutesLeftDOM: DOMNode.getElementsByClassName('Binary-minutes-left'),
  minutesRightDOM: DOMNode.getElementsByClassName('Binary-minutes-right'),
  secondsLeftDOM: DOMNode.getElementsByClassName('Binary-seconds-left'),
  secondsRightDOM: DOMNode.getElementsByClassName('Binary-seconds-right'),
});