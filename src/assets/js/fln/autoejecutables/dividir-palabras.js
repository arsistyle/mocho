/**
 * Cuenta las palabras y las divide en 2, dependiendo del data que sele pase para definir la cantidad de palabras por lado, es una función auto-ejecutable, no es necesario invocarla, a menos que se ejecute al hacer llamado a un ajax
 * @namespace dividir_palabras
 * @example
 * "este texto tiene en total 10 palabras incluyendo el numero"
 * el "data-fraccion" es de 5 (data-fraccion="5")
 * Entonces tenemos: 10/5 = 2
 * Entonces está funcion contara 2 palabras y el resto las agrupará en un span
 */

/**
 * @function
 * @memberof dividir_palabras
 */

fln.dividir_palabras = () => {
  /**
   * Selecciona todos los objetos con la clase "dividir-palabras"
   * @type {object}
   * @memberof dividir_palabras
   * @instance
   */
  let _palabras = document.querySelectorAll('.dividir-palabras');
  _palabras.forEach((el, i) => {
    let _palabra = el;
    if (!_palabra.classList.contains('palabra-dividida')) {
      /**
       * data-fraccion" se le asigna al elemento que se divira con un valor que dependera del total de sus palabras, por defecto viene en 2
       * @type {number}
       * @memberof dividir_palabras
       * @instance
       */
      let _fraccion = 2;
      if (_palabra.getAttribute('data-fraccion')) _fraccion = _palabra.getAttribute('data-fraccion');

      /**
       * Texto interior obtenido desde el selector
       * @type {string}
       * @memberof dividir_palabras
       * @instance
       */
      let _textos = _palabra.innerText;

      /**
       * Se separa "_textos" por sus espacios y se convierte en un Array
       * @type {array}
       * @memberof dividir_palabras
       * @instance
       */
      let _textosSplit = _textos.split(' ');

      /**
       * Numero que indica la mitad del Array de "_textosSplit"
       * @type {number}
       * @memberof dividir_palabras
       * @instance
       */
      let _indexMitad = Math.round(_textosSplit.length / _fraccion);

      /**
       * Nuevo texto generado
       * @type {string}
       * @memberof dividir_palabras
       * @instance
       */
      let _textoNuevo = ' ';

      for (let b = 0; b < _textosSplit.length; b++) {
        const _texto = _textosSplit[b];
        if (b === _indexMitad) _textoNuevo += '<span>';
        _textoNuevo += `${_texto}\r`;
      }
      _textoNuevo += '</span>';
      if (_fraccion === 0) _palabra.innerHTML = `<span>${_textoNuevo}</span>`;
      else _palabra.innerHTML = _textoNuevo;
      _palabra.classList.add('palabra-dividida');
    }
  });
};
fln.dividir_palabras();
