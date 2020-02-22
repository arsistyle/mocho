/**
 * Funcionalidad para formatear miles a inputs mientras se escribe en estos
 * @class
 */
class FormatearMiles {
  /**
   * Obtener los datos del selector
   * @param {object} selector Objeto que se se obtiene como selector
   * @param {string} signo Signo que irá como antecesor
   */
  constructor (selector, signo) {
    this.signo = '';
    if (signo) this.signo = signo;

    /**
     * Selecciona todos los objetos con el selector pasado como argumento
     * @type {object}
     * @memberof formatear_miles_inputs
     * @instance
     */
    this.selector = document.querySelectorAll(selector);
  }
  init () {
    if (this.selector.length) {
      this.selector.forEach((el, i) => {
        /**
         * Selecciona cada uno de los objetos
         * @type {object}
         * @memberof formatear_miles_inputs
         * @instance
         */
        let _el = el;

        /**
         * Obtiene en value del objeto
         * @type {object}
         * @memberof formatear_miles_inputs
         * @instance
         */
        let _valor = _el.value;
        _el.addEventListener('focus', function (el) {
          _valor = fln.obtener_numeros(el.target.value);
          if (isNaN(_valor) || _valor === 0) {
            _valor = '';
          }
          this.value = _valor;
        });
        _el.addEventListener('blur', function (el) {
          if (this.value === '') {
            _valor = 0;
          } else {
            _valor = fln.formatear_miles(fln.obtener_numeros(el.target.value), this.signo);
          }
          this.value = _valor;
        });
      });
    }
  }
}

let _fm = new FormatearMiles('.formatear-miles');
_fm.init();
