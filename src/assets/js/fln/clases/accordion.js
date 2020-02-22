class FLN_accordion {
  constructor(selector, options) {
    this.selector = '.fln-accordion';
    this.header = '.fln-accordion__header';
    this.body = '.fln-accordion__body';
    this.active = false;
    this.collapsible = false;
    this.icono = 'fln-abajo';
    if (selector) this.selector = selector;
    if (typeof options === 'object') {
      if (options.header) this.header = options.header;
      if (options.body) this.body = options.body;
      if (typeof options.active === 'number') this.active = options.active;
      if (options.collapsible) this.collapsible = options.collapsible;
      if (options.icono) this.icono = options.icono;
    }
  }
  classes() {
    let _accordions = document.querySelectorAll(this.selector);
    for (let fa = 0; fa < _accordions.length; fa++) {
      let _accordion = _accordions[fa];
      let _headers = _accordion.querySelectorAll(this.header);
      let _bodies = _accordion.querySelectorAll(this.body);
      for (let fa_h = 0; fa_h < _bodies.length; fa_h++) {
        let _body = _bodies[fa_h];
        let _header = _headers[fa_h];
        let _icon = document.createElement('span');

        _icon.classList.add(this.icono);
        _headers[fa_h].appendChild(_icon)

        if (!_body.classList.contains('fln-accordion__body')) _body.classList.add('fln-accordion__body');
        if (!_header.classList.contains('fln-accordion__header')) _header.classList.add('fln-accordion__header');
        if (!_icon.classList.contains('fln-accordion__icon')) _icon.classList.add('fln-accordion__icon');


      }
    }
  }
  magic() {
    let _accordions = document.querySelectorAll(this.selector);
    for (let fa = 0; fa < _accordions.length; fa++) {
      let _accordion = _accordions[fa];
      let _headers = _accordion.querySelectorAll(this.header);
      let _bodies = _accordion.querySelectorAll(this.body);
      for (let fa_h = 0; fa_h < _bodies.length; fa_h++) {
        let _body = _bodies[fa_h];
        let _bodyHeight = _body.offsetHeight;
        fln.responsive(() => {
          _body.style.height = 'auto';
          _bodyHeight = _body.offsetHeight;
          if (!_headers[fa_h].classList.contains('active')) {
            _body.style.height = 0;
          }
        })
        _body.style.height = 0;
        _headers[fa_h].addEventListener('click', (event) => {
          let _nextElement = event.target.nextElementSibling;
          if (!event.target.classList.contains('active')) {
            _nextElement.style.height = _bodyHeight + 'px';
            event.target.classList.add('active')
          } else {
            _nextElement.style.height = 0 + 'px';
            event.target.classList.remove('active')
          }
        });

        if (typeof this.active === 'number') {
          _headers[this.active].classList.add('active');
          console.log(_bodyHeight);
          _bodies[this.active].style.height = _bodyHeight + 'px';
        }

      }
    }
  }
  init () {
    this.classes();
    this.magic();
  }
}

// let fln_accordion = new FLN_accordion('.fln-accordion', {
//   active: 0
// });
// fln_accordion.init();
