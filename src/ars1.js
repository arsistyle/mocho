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
