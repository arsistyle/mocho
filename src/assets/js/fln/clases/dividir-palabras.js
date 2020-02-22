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

class FLNDividirPalabras {
  constructor (selector, options) {
    this.selector = document.querySelectorAll('.dividir-palabras');
    this.options = {
      fraccion: 2
    };
  }
  dividir () {
    let _palabras = this.selector;
    if (_palabras.length) {
      _palabras.forEach((el, i) => {
        let _palabra = el;
        if (!_palabra.classList.contains('palabra-dividida')) {
          let _fraccion = this.options.fraccion;
          if (_palabra.getAttribute('data-fraccion')) _fraccion = _palabra.getAttribute('data-fraccion');
          let _textos = _palabra.innerText;
          let _textosSplit = _textos.split(' ');
          let _indexMitad = Math.round(_textosSplit.length / _fraccion);
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
    }
  }
  init () {
    this.dividir();
  }
}
let dividirPalabras = new FLNDividirPalabras();
dividirPalabras.init();
