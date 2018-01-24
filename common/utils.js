const toBinary = (num) => ('0000' + (num >>> 0).toString(2)).slice(-4);

function apply(color, value, nodes) {
  const digits = toBinary(value).split('').reverse();
 
  nodes.forEach((node, index) => {
    node.style.fill = (digits[index] === '1') ? color : 'gray';
  });
}

export function fillDOMNodes(color, number, leftDOM, rightDOM) {
  const [ leftBinary, rightBinary ] = `${number}`.split('');
  
  apply(color, leftBinary, leftDOM);
  apply(color, rightBinary, rightDOM);
}