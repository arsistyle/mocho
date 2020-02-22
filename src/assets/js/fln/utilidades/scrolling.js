/**
 * Obtiene una función que se ejecutará al hacer scroll y al cumplir las condiciones
 * @namespace scrolling
 * @example
 * fln.scrolling(() => {
 *   if (_scroll > 100) console.log('Me ejecuto solo si el scroll bajó más de 100px')
 *   else console.log('Me ejecuto solo si el scroll es menor a 100px')
 * })
 */

/**
 * @memberof scrolling
 * @function
 * @param {function} fun Funcion que se debe pasar para ejecutarse, debe venir ya con condiciones para las distancias del scroll
 */

fln.scrolling = (fun = () => {
  console.warn(
    `¡Debes pasar una función como argumento!
La distancia actual del scroll desde el top es: ${_scroll}
`
  );
}) => {
  /**
  * Posición actual del scroll
  * @type {number}
  * @memberof scrolling
  * @instance
  *
   */
  let _scroll = window.scrollY;
  if (_ie) _scroll = document.documentElement.scrollTop;
  if (typeof fun === 'function') {
    fun();
    document.addEventListener('scroll', () => {
      _scroll = window.scrollY;
      if (_ie) _scroll = document.documentElement.scrollTop;
      fun();
    });
  } else {
    console.warn(
      'fln.scrolling(¿function?) : Se debe pasar una función como argumento'
    );
  }
};
