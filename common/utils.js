const toBinary = (num) => ('0000' + (num >>> 0).toString(2)).slice(-4);

const apply = (value, nodes) => {
  const digits = toBinary(value).split('').reverse();
 
  nodes.forEach((node, index) => {
    node.style.fill = (digits[index] === '1') ? 'fb-magenta' : 'gray';
  });
}

export const fillDOMNodes = (num, leftDOM, rightDOM) => {
  const [ leftBin, rightBin ] = `${num}`.split('');
  
  apply(leftBin, leftDOM);
  apply(rightBin, rightDOM);
}