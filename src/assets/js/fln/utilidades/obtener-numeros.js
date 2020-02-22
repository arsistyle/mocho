/**
 * Desde un string retorna solo los números dentro de este
 * @namespace obtener_numeros
 * @returns Retorna los numeros dentro del string
 * @example
 * let _string = "$123.456";
 * fln.obtener_numeros(_string, 'string') // Retornará "123456"
 */

/**
 * @memberof obtener_numeros
 * @function
 * @param {string} valor String del cual se obtendran los números
 * @param {string} tipo Tipo de retorno (String o Número)
 */

fln.obtener_numeros = (valor, tipo) => {
  let numero;
  if (tipo === 'string') numero = valor.replace(/\D/g, '').toString();
  else numero = parseInt(valor.replace(/\D/g, ''));
  return numero;
}