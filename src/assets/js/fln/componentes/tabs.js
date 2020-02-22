class FLNTabs {
  constructor (selector, options) {
    this.selector = document.querySelectorAll('.fln-tabs');
    this.options = {
      active: 0,
      opened: true,
      beforeCreate: undefined,
      afterCreate: undefined,
      responsive: {
        active: true,
        keepActive: true,
        headerIcon: {
          active: 'fln-abajo',
          inactive: undefined
        }
      }
    };
  }
  tabs () {
    let _tabsContenedor = this.selector;
    if (_tabsContenedor.length) {
      _tabsContenedor.forEach((ela, a) => {
        let _this = _tabsContenedor[a];
        if (_this.className !== 'fln-tabs') _this.classList.add('fln-tabs');
        let _items = _this.querySelectorAll('.fln-tabs__item');
        let _links = _this.querySelectorAll('.fln-tabs__link');
        let _tabs = _this.querySelectorAll('.fln-tabs__contenido');

        if (!isNaN(this.options.active)) {
          _items[0].classList.add('activo');
          _tabs[0].style.display = '';
          _tabs[0].classList.add('activo');
        }

        if (typeof this.options.beforeCreate === 'function') this.options.beforeCreate();
        _links.forEach((elb, b) => {
          let _link = _links[b];
          let _tab = _tabs[b];

          if (!_tab.classList.contains('activo')) {
            _tab.style.display = 'none';
          }

          _link.addEventListener('click', (el) => {
            let _id = el.target.getAttribute('href').replace('#', '');

            _this.querySelectorAll('.activo').forEach((element) => {
              element.classList.remove('activo');
              if (element.classList.contains('fln-tabs__contenido')) {
                element.style.display = 'none';
              }
            });

            el.target.parentNode.classList.add('activo');
            document.getElementById(_id).style.display = '';
            document.getElementById(_id).classList.add('activo');

            el.preventDefault();
            return false;
          });
        });
        if (this.options.responsive.active) this.responsive(_this, _tabs, _items, _links);
        if (typeof this.options.afterCreate === 'function') this.options.afterCreate();
      });
    }
  }
  accordion (container, tabs, items, links, method) {
    let _this = container;
    let _items = items;
    let _tabs = tabs;
    let _links = links;
    if (!method) {
      if (!_this.classList.contains('fln-tabs--responsive')) {
        _links.forEach((elc, c) => {
          let _link = _links[c];
          let _tab = _tabs[c];
          let _header = document.createElement('div');
          let _icono = document.createElement('span');
          let _linkText = _link.innerHTML;
          _header.classList.add('fln-tabs__header');
          _header.innerHTML = _linkText;
          _icono.classList.add('fln-tabs__header__icono');
          _icono.classList.add('fln-abajo');
          _header.appendChild(_icono);
          _tab.parentNode.insertBefore(_header, _tab);
          _this.classList.add('fln-tabs--responsive');
          if (_items[c].classList.contains('activo')) {
            _header.classList.add('activo');
          }
        });
      }
    } else {
      if (_this.classList.contains('fln-tabs--responsive')) {
        _tabs.forEach((eld, d) => {
          let _headers = _this.querySelectorAll('.fln-tabs__header');
          _headers.forEach((ele, e) => {
            ele.remove();
          });
        });
        _this.classList.remove('fln-tabs--responsive');
      }
    }
  }
  responsive (el, tabs, items, links) {
    fln.responsive(() => {
      if (_width < 768) {
        this.accordion(el, tabs, items, links);
      } else {
        this.accordion(el, tabs, items, links, 'destroy');
      }
    });
  }
  init () {
    this.tabs();
  }
}

let _tabs = new FLNTabs('.fln-tabs');
_tabs.init();
