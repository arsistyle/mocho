/**
 * Funcionalidades e interacciones en los elementos de formularios
 * @namespace formularios
 */

/**
 * @function
 * @memberof formularios
 */
fln.formularios = {

  /**
   * Animación a inputs de los formularios
   * @function
   * @memberof formularios
   */
  animacion () {
    /**
     * Selecciona todos los elementos con la clase "form__grupo--animado"
     * @type {object}
     * @memberof formularios
     * @instance
     */
    let _grupoAnimado = document.querySelectorAll('[data-animacion]');

    if (_grupoAnimado.length) {
      _grupoAnimado.forEach((el, i) => {
        /**
         * Selecciona cada uno de los elementos con la clase "form__grupo--animado"
         * @type {object}
         * @memberof formularios
         * @instance
         */
        let _grupo = el;

        /**
         * Selecciona todos los elementos ".text" y "textarea" dentrp de "_grupo"
         * @type {object}
         * @memberof formularios
         * @instance
         */
        let _input = _grupo.querySelector('.text, textarea, select');

        if (_input.value) {
          _grupo.querySelector('label').classList.add('focus');
        }

        _input.addEventListener('change', (event) => {
          if (event.target.value.length !== 0) {
            _grupo.querySelector('label').classList.add('focus');
          }
        });
        _input.addEventListener('focus', (event) => {
          _grupo.querySelector('label').classList.add('focus');
        });
        _input.addEventListener('blur', (event) => {
          if (event.target.value.length === 0 || (event.target.classList.contains('tipo_telefono') && event.target.value === '+')) {
            _grupo.querySelector('label').classList.remove('focus');
          }
        });
      });
    }
  },
  seleccion () {
    const atributos = (el, name, icon) => {
      if (el.length) {
        for (let i = 0; i < el.length; i++) {
          let _element = el[i];
          // let _parent = _element.parentNode;
          if (!_element.querySelector(`.form__${name}__item`)) {
            let _newElement = document.createElement('div');
            _newElement.classList.add(`form__${name}__item`);
            if (icon) {
              _newElement.classList.add(icon);
            }
            if (name === 'toggle') {
              _element.appendChild(_newElement, _element.firstChild);
            } else {
              _element.insertBefore(_newElement, _element.firstChild);
            }
          }

          _element.querySelector('input').addEventListener('change', (event) => {
            if (event.target.checked) {
              if (event.target.type === 'radio') {
                let _radios = event.target.parentNode.parentNode.parentNode.querySelectorAll('[type=radio]');
                for (let r = 0; r < _radios.length; r++) {
                  let _radio = _radios[r];
                  if (_radio.parentNode.classList.contains(`form__${name}--checked`)) {
                    _radio.parentNode.classList.remove(`form__${name}--checked`);
                  }
                }
              }
              _element.classList.add(`form__${name}--checked`);
            } else {
              _element.classList.remove(`form__${name}--checked`);
            }
          });

          // if (_element.parentNode.querySelector('input[type=radio]:not([disabled])')) {
          //     _element.querySelector('input:not(disabled)').addEventListener('click', (event) => {
          //       console.log(event);
          //       let _anterior = _element.parentNode.parentNode.querySelector(`.form__${name}--checked`);
          //       _anterior.classList.remove(`form__${name}--checked`);
          //       // event.target.parentNode.classList.add(`form__${name}--checked`);
          //     })

          // }

          if (_element.querySelector('input').checked) {
            _element.classList.add(`form__${name}--checked`);
          }

          if (_element.querySelector('input').disabled) {
            _element.classList.add(`form__${name}--disabled`);
          }
        }
      }
    };

    atributos(document.querySelectorAll('.form__checkbox'), 'checkbox', 'fln-check');
    atributos(document.querySelectorAll('.form__toggle'), 'toggle');
    atributos(document.querySelectorAll('.form__radio'), 'radio');
  },
  fallback () {
    if (detectIE() && detectIE() < 10) {
      $('.form__grupo').each((i, el) => {
        let _label = el.find('label');
        let _input = el.find('input, select, textarea');
        $(_label).insertBefore(_input);
      });
    }
  },

  /** MEJORAR MAS ADELANTE
  checkboxs: document.querySelectorAll('input[type=checkbox]'),
  observar() {
    let config = {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true,
      attributeOldValue: true,
      characterDataOldValue: true,
    };
    const observer = new MutationObserver(function (mutations) {
      console.log(mutations);
      mutations.forEach(function (mutation) {
        if (mutation.nextSibling) {
          console.log(mutation.nextSibling);
          let _checkbox = mutation.nextSibling.previousSibling;
          if (_checkbox.classList.contains('form__hover')) {
            console.log(_checkbox);
          }
        }
      });
    });
    for (let a = 0; a < this.checkboxs.length; a++) {
      observer.observe(this.checkboxs[a].parentNode, config);
    }
  },
  */

  init () {
    // this.observar();
    this.seleccion();
    this.animacion();
    this.fallback();
  }
};
fln.formularios.init();
