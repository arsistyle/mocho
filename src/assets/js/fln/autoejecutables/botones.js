/**
 * Funcionalidades para los botones
 * @namespace botones
 */

/**
 * Objeto con varios métodos y propiedades de utilidades para los botones
 * @function
 * @memberof botones
 * @property {object} selector Todos los elementos con la clase ".btn"
 * @property {object} selector_gato Todos los botones con "#" en su href
 * @property {object} selector_ripple Todos los botones con el atributo de animación ripple
 * @property {method} return Evita que los botones con "#" en su href tengan ancla
 * @property {method} init Da inicio a los métodos de "fln.botones" y además incluye la función de animacion Ripple 
 */
fln.botones = {
  selector: document.querySelectorAll('.btn'),
  selector_gato: document.querySelectorAll('.btn[href="#"]'),
  selector_ripple: document.querySelectorAll('[data-animation="ripple"]'),
  return () {

    this.selector_gato.forEach((el, i) => {
      el.addEventListener('click', event => {
        event.preventDefault();
        return false;
      });
    });
  },
  init () {
    if (this.selector.length) {
      this.return();
      rippleBtn(this.selector_ripple);
    }
  }
};

/**
 * Funcionalidad para crear la animación de Ripple a los botones
 * @function
 * @memberof botones
 * @param {object} selector Obtiene el selector en común el cual desencadenará la animación de Ripple
 */

function rippleBtn (selector) {
  for (let b = 0; b < selector.length; b++) {
    selector[b].addEventListener('click', function (event) {
      let _x = event.layerX - 10;
      let _y = event.layerY - 10;
      let ripple = document.createElement('span');

      ripple.className = 'btn__ripple';
      ripple.style.left = _x + 'px';
      ripple.style.top = _y + 'px';

      this.appendChild(ripple);

      setTimeout(function () {
        ripple.parentNode.removeChild(ripple);
      }, 500);
    });
  }
}
fln.botones.init();
