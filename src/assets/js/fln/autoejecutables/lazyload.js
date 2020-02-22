/**
 * Carga progresiva de imágenes al hacer scroll, esto es para que no carguen todas las imágenes del sitio de golpe y que carguen las versiones miniaturas de estas.
 * @namespace lazy_load
 */

 /**
  * @function
  * @memberof lazy_load
  */

fln.lazy_load = () => {

  /**
   * Array al cual se le van asignando las imágenes cargadas, para luego comparar si fue cargada y así no volver a cargarla
   * @type {array}
   * @memberof lazy_load
   * @instance
   */
  let _grupoImagenes = [];

  /**
   * Selecciona todos los objetos con la clase "fln-lazyLoad"
   * @type {object}
   * @memberof lazy_load
   * @instance
   */
  const _item = $('.fln-lazyLoad')

  /**
   * @name imagenes
   * Selecciona todos los objetos con la clase "fln-lazyLoad"
   * @method imagenes
   * @memberof lazy_load
   * @instance
   */
  const imagenes = () => {
    let _sY = window.scrollY
    if (_ie) _sY = document.documentElement.scrollTop;
    _item.each(i => {
      if ((_sY + _height / 1.25) >= _item.eq(i).offset().top && _sY <= _item.eq(i).offset().top) {
        const _el = _item.eq(i)
        if (!_grupoImagenes["estado" + i]) {
          const img = new Image()
          _grupoImagenes[i] = _el.data('img')
          _grupoImagenes["estado" + i] = true
          img.removeAttribute('width')
          img.removeAttribute('height')
          img.src = _grupoImagenes[i]
          img.setAttribute('alt', _el.data('alt'))
          img.onload = (a) => {
            return aplicar_url(_el, img)
          }
        }
      }
      i++
    })
  }
  const aplicar_url = (el, img) => {
    let _callbackBeforeAppend = el[0].getAttribute('data-callback-beforeappend')
    let _callbackAfterAppend = el[0].getAttribute('data-callback-afterappend')
 
    if(_callbackBeforeAppend) {
      let _before = eval(_callbackBeforeAppend+'(el)')
      if(typeof _before === 'function'){
        _before(el)
      }
    }
    if (el.hasClass('cargarBg')) {
      el.removeClass('cargarBg').css('background-image', `url(${img.src})`)
    }
    if (el.hasClass('cargarImg')) {
      el.find('img').remove()
      el.append(img)
      setTimeout(() => {
        el.removeClass('cargarImg')
      }, 200)
    }
    if(_callbackAfterAppend) {
      let _after = eval(_callbackAfterAppend+'(el)')
      if(typeof _after === 'function'){
        _after(el)
      }
    }

  }
  imagenes()
  $(window).on('scroll', () => {
    imagenes()
  })
}
fln.lazy_load();

