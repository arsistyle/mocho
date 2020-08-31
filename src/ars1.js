export const MILES = (numero, antecesor = '') => {
  let valor = numero.toString().replace(/\./g, '');
  valor = valor
    .toString()
    .split('')
    .reverse()
    .join('')
    .replace(/(?=\d*\.?)(\d{3})/g, '$1.');
  valor = valor.split('').reverse().join('').replace(/^[.]/, '');
  return `${antecesor}${valor}`;
};

export const HTML = (data) => {
  if (data) {
    const txt = document.createElement('textarea');
    txt.innerHTML = data;
    return txt.value;
  }

  return;
};

export const RANDOM = (array) => {
  let ctr = array.length;
  let temp;
  let index;

  while (ctr > 0) {
    index = Math.floor(Math.random() * ctr);
    ctr--;
    temp = array[ctr];
    array[ctr] = array[index];
    array[index] = temp;
  }
  return array;
};
