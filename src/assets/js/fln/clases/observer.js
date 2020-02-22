class Observar {
  constructor (options) {
    this.options = {
      selector: '.observar',
      threshold: 0.5,
      keepActive: false
    };
    if (typeof options === 'object') {
      if (options.selector) this.options.selector = options.selector;
      if (options.threshold) this.options.threshold = options.threshold;
      if (options.keepActive) this.options.keepActive = options.keepActive;
    }
  }

  observar () {
    let _items = document.querySelectorAll(this.options.selector);
    let _keepActive = this.options.keepActive;
    _items.forEach((el, i) => {
      let _item = el;
      function callback (entries, observer) {
        if (entries[0].isIntersecting) {
          _item.classList.add('observar--activo');
        } else if (!_keepActive) {
          _item.classList.remove('observar--activo');
        }
      }
      if (_item && !detectIE()) {
        const options = {
          threshold: this.options.threshold
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(_item);
      } else {
        _item.classList.add('observar--activo');
      }
    });
  }
}
let _observar = new Observar({
  selector: '.caja',
  threshold: 1
  // keepActive: true
});
_observar.observar();
