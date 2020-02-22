/**
 * Ejecuta un ancla animada (Anima el scroll) a un selector
 * @namespace scroll_to
 * @example
 * fln.scroll_to('.section', -200, 1000, 500);
 * // El scroll se animará hasta la sección ".section"
 * // Con una diferencia de 200px desde el top
 * // Una velocidad de 1s
 * // Con un retrazo de 500ms
 */

/**
 * @memberof scroll_to
 * @function
 * @param {object} el Selector el cual es el destino de la animación
 * @param {number} offset Distancia de diferencia entre el scroll y el selector
 * @param {number} duracion Duración de la animación del scroll
 * @param {number} delay Retraso para que se ejecuté la función
 */

fln.scroll_to = (el, offset = 0, duracion = 600, delay = 0) => {
  /**
   * Pasa el selector al selector de jQuery
   * @type {object}
   * @memberof scroll_to
   * @instance
   */
  const _el = $(el);

  setTimeout(() => {
    $('html, body').animate({
      scrollTop: _el.offset().top + offset
    }, duracion);
  }, delay);
};
