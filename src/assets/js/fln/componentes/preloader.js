/**
 * Preloader general para cargas dentro del sitio
 * @namespace preloader
 * @example
 * fln.preloader(1); // se ejecuta el preloader
 * fln.preloader(0); // se cierra el preloader
 */

/**
 * @memberof preloader
 * @function
 * @param {boolean} event Si es true, se muestra el preloader, con false se cierra
 * @throws Advertencia a la consola indicando que no existe el objeto con el ID "preloader-general"
 */

fln.preloader = event => {
  /**
   * Selecciona el ID del preloader
   * @type {object}
   * @memberof preloader
   * @instance
   */
  const _preloader = $('#preloader-general');

  if (_preloader.length) {
    if (event) {
      _preloader.fadeIn('fast');
      setTimeout(() => {
        _preloader.addClass('activo');
      }, 10);
    } else {
      _preloader.addClass('activo');
      setTimeout(() => {
        _preloader.fadeOut('fast');
      }, 10);
    }
  } else {
    console.warn('Se debe crear el contenedor con el id "preloader-general"')
  }
}

