class Pasos {
  constructor (selector) {
    this.selector = selector;
  }
  items () {
    return $(`.${this.selector}__item`).length;
  }
  atributos () {
    $(`.${this.selector}`).find(`.${this.selector}__item`).each(function (a, el) {
      const _this = $(el)
      _this.attr('id', `pasos-item-${a}`);
      _this.find('.form__grupo').not('.no-aplicar').each(function (b, el) {
        const _name = $(el).data('name');
        $(el).attr('id', `pasos-grupo-${a}-${b}`);
        $(el).find('label').each(function (c, el) {
          if (c === 0) {
            $(el).attr('for', _name);
          } else {
            $(el).attr('for', `${_name}-${c}`);
          }
        })
        $(el).find('.text,.select,textarea').each(function (c, el) {
          if (c === 0) {
            $(el).attr('id', _name).attr('name', _name);
          } else {
            $(el).attr('id', `${_name}-${c}`).attr('name', `${_name}-${c}`);
          }
        })
        $(el).find('.radio').each(function (c, el) {
          $(el).attr('name', _name).attr('value', $(el).parents('.form__input').find('label').text());
          if (c === 0) {
            $(el).attr('id', _name);
          } else {
            $(el).attr('id', `${_name}-${c}`);
          }
        })
        $(el).find('.checkbox').each(function (c, el) {
          $(el).attr('name', `${_name}[]`).attr('value', $(el).parents('.form__input').find('label').text());
          if (c === 0) {
            $(el).attr('id', _name);
          } else {
            $(el).attr('id', `${_name}-${c}`);
          }
        });
      });
    });
  }
  sgte (n, validar) {
    let _items = this.items();
    let _selector = this.selector;
    let callback = $(`#pasos-item-${n}`).data('callback');

    function avanzar () {
      const _percent = 100 * (n + 1) / _items;
      wizard.actualizar(100 * n / _items, _percent);
      $(`.${_selector}__item`).hide();
      $(`#pasos-item-${n}`).fadeIn('fast');
      fln.scroll_to('.wizard', _distancia);
    }
    if (validar) {
      if (this.validar(n - 1)) {
        avanzar()
        if ($(`#pasos-item-${n}`).data('callback')) {
          eval(callback + '()');
        }
      } else {
        alerta({
          texto: 'Debe completar todos los campos requeridos.',
          posicion: 'bottom'
        });
      }
    } else {
      avanzar();
      if ($(`#pasos-item-${n}`).data('callback')) {
        eval(callback + '()');
      }
    }
  }
  validar (n) {
    let _valido = false;
    $('.requerido:visible').each(function (i, el) {
      if (!$(el).hasClass('valido')) {
        $(el).addClass('invalido');
        fln.scroll_to('.requerido.invalido:visible:eq(0)', _distancia - 40);
        setTimeout(() => {
          $('.requerido.invalido:visible:eq(0)').focus();
        }, 600);
      } else {
        $(el).removeClass('invalido');
      }
    });

    if ($('#pasos-item-' + n + ' .valido:not(.ignorar-valido):visible').length === $('#pasos-item-' + n + ' .requerido:not(.ignorar-valido):visible').length) {
      _valido = true;
    }

    return _valido;
  }
  checkmark () {
    let _selector = this.selector;
    $(`.${_selector}__item`).each(function (a, el) {
      const _parent = $(el);
      _parent.find('.form__input--seleccion').each(function (a, el) {
        const _radioParent = $(el).parent();
        const _ds = $(el).find('[data-show]');
        $(el).find('> .radio').each(function (c, el) {
          if ($(el).is(':checked')) {
            $(el).prop('checked', false);
          }
          $(el).on('change', function (el, event) {
            _radioParent.removeClass('valido');
            if (this.checked) {
              if (typeof _ds.data('show') === 'string') {
                $(`#${_ds.data('show')}`).slideDown('fast');
                fln.scroll_to(`#${_ds.data('show')}`, -110);
              }
              _radioParent.addClass('valido').removeClass('invalido');
            } else {
              _radioParent.removeClass('valido');
            }
          })
        }).not('[data-show]').each(function (b, el) {
          $(el).on('change', function (el, event) {
            $(el).parents('.form__grupo').next('.pasos__hidden').slideUp('fast');
          })
        })

        $(el).find('.checkbox').each(function (c, el) {
          if ($(el).is(':checked')) {
            $(el).prop('checked', false);
          }
          $(el).on('change', (el, event) => {
            if (_radioParent.find('.checkbox:checked').length >= 1) {
              _radioParent.addClass('valido').removeClass('invalido');
            } else {
              _radioParent.removeClass('valido');
            }
          })
        })
      })
    })
  }
  init () {
    this.checkmark();
    this.atributos();
  }
}