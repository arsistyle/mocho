/**
 * Funcionalidades para las tablas
 * @namespace tablas
 */

/**
 * Funcionalidad que agarra las tablas dentro de "contenido-dinamico" y le aplica las propiedades de las tablas de la librería, dependiendo de las clases que se le asignen en el TinyMce
 * @function
 * @memberof tablas
 */

fln.tablas = () => {
  /**
   * Objeto que agarra todas las clases "contenido-dinamico"
   * @type {object}
   * @memberof tablas
   * @instance
   */
  let _contenidoDinamico = document.querySelectorAll('.contenido-dinamico');

  if (_contenidoDinamico.length) {
    _contenidoDinamico.forEach((el, i) => {
      /**
       * Separa todos los elementos del objeto "_contenidoDinamico"
       * @type {object}
       * @memberof tablas
       * @instance
       */
      let _cD = el;

      /**
       * Busca todas las etiquetas "table" dentro de "_cD"
       * @type {object}
       * @memberof tablas
       * @instance
       */
      let _tablas = _cD.querySelectorAll('table');

      if (_tablas.length) {
        for (let b = 0; b < _tablas.length; b++) {
          let _tabla = _tablas[b];
          let _classes = _tabla.className;
          if (!_tabla.parentNode.classList.contains('tabla')) {
            let _nuevaTabla = document.createElement('div');
            if (!_classes.length) {
              fln.wrap(_tabla, _nuevaTabla);
            } else {
              _nuevaTabla.className = _classes;
              fln.wrap(_tabla, _nuevaTabla);
              _tabla.className = '';
            }
            _nuevaTabla.classList.add('tabla');
            if (_nuevaTabla.classList.contains('tabla--responsive')) {
              let _ths = _nuevaTabla.querySelectorAll('th');
              let _thTextos = [];
              for (let c = 0; c < _ths.length; c++) {
                _thTextos.push(_ths[c].innerText);
              }
              let _tbodys = _nuevaTabla.querySelectorAll('tbody');
              for (let d = 0; d < _tbodys.length; d++) {
                let _tbody = _tbodys[d];
                let _trs = _tbody.querySelectorAll('tr');
                for (let e = 0; e < _trs.length; e++) {
                  let _tr = _trs[e];
                  for (let d = 0; d < _thTextos.length; d++) {
                    let _thTexto = _thTextos[d];
                    let _td = _tr.querySelectorAll('td');
                    _td[d].setAttribute('data-th', _thTexto);
                  }
                }
              }
            }
          }
        }
      }
    });
  }
};
fln.tablas();