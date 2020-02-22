/**
 * Funcionalidad para formatear números a miles
 * @namespace formatear_miles
  * @example
  * //Tenemos esta variable:
  * let _n = 123456789;
  * //Aplicamos la función:
  * fln.formatear_miles(_n, '$');
  * // nos retornará como string el sgte. valor
  * "$123.456.789"
 */

/**
  * @memberof formatear_miles
  * @function
  * @param {number} numero Valor que será formateado, debe ser tipo númerico
  * @param {string} antecesor Signo que irá antes del valor formateado, ej "$"
  * @returns Devuelve el valor formateado a miles
  */

fln.formatear_miles = (numero, antecesor = '') => {
  /**
   * Se convierte "numero" a un array
   * @type {array}
   * @memberof formatear_miles
   * @instance
   */
  let _str = numero.toString().split('');

  /**
   * Array que contendrá los nuevos valores
   * @type {array}
   * @memberof formatear_miles
   * @instance
   */
  const _number = [];

  /**
   * Array que contendrá los nuevos valores
   * @type {array}
   * @memberof formatear_miles
   * @instance
   */
  let _count = Math.ceil(_str.length / 3) - 1;
  for (let i = _str.length - 1; i >= 0; i -= 3) {
    let num1 = _str[i] ? _str[i] : '';
    let num2 = _str[i - 1] ? _str[i - 1] : '';
    let num3 = _str[i - 2] ? _str[i - 2] : '';
    _number[_count] = num3 + num2 + num1;
    _count--;
  }
  _str = _number.join('.');
  return antecesor + _str;
};
