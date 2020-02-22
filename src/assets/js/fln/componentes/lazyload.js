const _lazyload = () => {

  let grupoImagenes = []
  const _item = $('.fln-lazyLoad')

  const imagenes = () => {
    let _sY = window.scrollY
    if ($('html').hasClass('ie-browser')) {
      _sY = document.documentElement.scrollTop
    }
    _item.each(i => {

      if ((_sY + _height / 1.25) >= _item.eq(i).offset().top && _sY <= _item.eq(i).offset().top) {
        const _el = _item.eq(i)
        if (!grupoImagenes["estado" + i]) {
          const img = new Image()
          grupoImagenes[i] = _el.data('img')
          grupoImagenes["estado" + i] = true
          img.removeAttribute('width')
          img.removeAttribute('height')
          img.src = grupoImagenes[i]
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

if (typeof _lazyload === "function") {
  _lazyload()
}