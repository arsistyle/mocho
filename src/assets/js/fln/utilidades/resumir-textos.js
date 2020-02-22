/** 
 * Resume textos agregando 3 puntos, por defecto al final
 * @namespace resumir_textos 
 * @default final, el cual los 3 puntos se insertan al final
 * @example
 * let _texto = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias necessitatibus omnis impedit"
 * fln.resumir_textos(_texto, 20, 'medio'); // retornará "Lorem ip...s impedit"

*/

/**
 * @memberof resumir_textos
 * @function
 * @param {string} texto Texto que se pasa como string
 * @param {number} n cantidad de palabras que dejará despues del resumen
 * @param {string} pos posición de los 3 puntos "centro" o "inicio", por defecto es al final
 * @returns Retorna el texto resumido
 */

fln.resumir_textos = (texto, n, pos = 'final') => {
  if (texto && n) {
    if (texto.length > n) {
      if (pos === 'centro') {
        return (
          `${texto.substr(0, ((n - 3) / 2))}...${texto.substr(texto.length - ((n - 3) / 2), texto.length)}`
        );
      } else if (pos === 'inicio') {
        return (
          `...${texto.substr(texto.length - n, texto.length)}`
        );
      } else {
        return (
          `${texto.substr(0, n)}...`
        );
      }
    }
  } else {
    console.warn('Se debe pasar como argumento el texto y la cantidad de palabras que se espera retornar.');
  }
  return texto;
};
