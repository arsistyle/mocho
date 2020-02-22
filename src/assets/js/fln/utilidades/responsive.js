/**
 * Obtiene una función que se ejecutará al hacer resize y al cumplir las condicionales
 * @namespace responsive
 * @example
 * fln.responsive(() => {
 *   if (_width > 768) console.log('Me ejecuto solo si el viewport es mayor a 768')
 *   else console.log('Me ejecuto solo si el viewport es menor a 768')
 * })
 */

/**
 * @memberof responsive
 * @function
 * @param {function} fun Argumento de tipo función que se debe pasar para ejecutarse, debe venir ya con condiciones para los quiebres de pantalla

 */

fln.responsive = (fun = () => {
  console.warn(
    `¡Debes pasar una función como argumento!
El ancho actual del viewport es de: ${_width}
`
  );
}) => {

  /**
   * Ancho del viewport
   * @type {number}
   * @memberof responsive
   * @instance
   */
  _width = window.innerWidth;

  /**
   * Alto del viewport
   * @type {number}
   * @memberof responsive
   * @instance
   */
  _height = window.innerHeight;

  if (typeof fun === 'function') {
    fun();
    window.addEventListener('resize', event => {
      _width = window.innerWidth;
      _height = window.innerHeight;
      fun();
    });
  } else {
    console.warn(
      `fln.responsive(¿function?) : Se debe pasar una función como argumento`
    );
  }
};
