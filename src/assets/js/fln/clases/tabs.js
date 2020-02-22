class FLNTabs {
  constructor (selector, options) {
    this.options = {
      selector: selector || '.fln-tabs',
      active: 0,
      opened: true,
      anclaHash: false,
      anclaHashOffset: 0,
      animatedScroll: true,
      urlVarDistance: -10,
      responsive: {
        active: true,
        keepActive: true,
        headerIcon: {
          active: 'fln-abajo',
          inactive: undefined
        }
      }
    };
    this.beforeCreate = undefined;
    this.beforeCreate = undefined;
    this.afterCreate = undefined;
    this.beforeActive = undefined;
    this.onActive = undefined;
  }
  tabs () {
    let $this = this;
    let _tabsContenedor = document.querySelectorAll(this.options.selector);
    if (_tabsContenedor.length) {
      _tabsContenedor.forEach(function (ela, a) {
        let _this = _tabsContenedor[a];
        if (_this.className !== 'fln-tabs') _this.classList.add('fln-tabs');
        let _items = _this.querySelectorAll('.fln-tabs__item');
        let _links = _this.querySelectorAll('.fln-tabs__link');
        let _tabs = _this.querySelectorAll('.fln-tabs__contenido');

        if (!isNaN($this.options.active)) {
          _items[0].classList.add('activo');
          _tabs[0].style.display = '';
          _tabs[0].classList.add('activo');
        }

        if (typeof $this.beforeCreate === 'function') {
          $this.beforeCreate({
            elementos: {
              _this,
              _items,
              _links,
              _tabs
            }
          });
        }

        _links.forEach(function (elb, b) {
          let _link = _links[b];
          let _tab = _tabs[b];

          if (!_tab.classList.contains('activo')) {
            _tab.style.display = 'none';
          }

          _link.addEventListener('click', function (el) {


            if (typeof $this.beforeActive === 'function') $this.beforeActive(_link, _tab);

            let _id = this.getAttribute('href').replace('#', '');

            _this.querySelectorAll('.activo').forEach(function (element) {
              element.classList.remove('activo');
              if (element.classList.contains('fln-tabs__contenido')) {
                element.style.display = 'none';
              }
            });

            this.parentNode.classList.add('activo');
            document.getElementById(_id).style.display = '';
            document.getElementById(_id).classList.add('activo');

            if ($this.options.animatedScroll) {
              fln.scroll_to(_this, $this.options.urlVarDistance);
            }

            if (typeof $this.onActive === 'function') $this.onActive(_link, _tab);

            el.preventDefault();
            return false;
          });
        });

        if ($this.options.responsive.active) $this.responsive(_this, _tabs, _items, _links);

        if (typeof $this.afterCreate === 'function') $this.afterCreate(_items, _links, _tabs);

        if ($this.options.anclaHash && fln.getUrlVars()['tab']) {
          let _link = _this.querySelector(`.fln-tabs__link[href="${fln.getUrlVars()['tab']}"]`);
          let _accordeon = _this.querySelector(`.fln-tabs__header[data-id="${fln.getUrlVars()['tab']}"]`);
          let _tab = _this.querySelector(fln.getUrlVars()['tab']);
          if (_link || _tab || _accordeon) {
            $this.clean(_this);
            _link.parentNode.classList.add('activo');
            _tab.classList.add('activo');
            if (_accordeon) {
              _accordeon.classList.add('activo');
              fln.scroll_to(_accordeon, $this.options.urlVarDistance);
            } else {
              fln.scroll_to(_this, $this.options.urlVarDistance);
            }
            _tab.style.display = '';
          }
        }
      });
    }
  }
  clean (container) {
    let _activo = container.querySelectorAll('.activo');
    _activo.forEach(function (el, i) {
      if (_activo[i].classList.contains('fln-tabs__item') || _activo[i].classList.contains('fln-tabs__contenido') || _activo[i].classList.contains('fln-tabs__header')) {
        _activo[i].classList.remove('activo');
      }
      if (_activo[i].classList.contains('fln-tabs__contenido')) {
        _activo[i].style.display = 'none';
      }
    });
  }
  accordion (container, tabs, items, links, method) {
    // let _this = container;
    // let _items = items;
    // let _tabs = tabs;
    // let _links = links;
    let $this = this;
    if (!method) {
      if (!container.classList.contains('fln-tabs--responsive')) {
        links.forEach(function (elc, c) {
          let _link = links[c];
          let _tab = tabs[c];
          let _header = document.createElement('div');
          let _icono = document.createElement('span');
          let _linkText = _link.innerHTML;
          _header.classList.add('fln-tabs__header');
          _header.innerHTML = _linkText;
          _icono.classList.add('fln-tabs__header__icono');
          _icono.classList.add('fln-abajo');
          _header.appendChild(_icono);
          _tab.parentNode.insertBefore(_header, _tab);
          container.classList.add('fln-tabs--responsive');
          if (items[c].classList.contains('activo')) {
            _header.classList.add('activo');
          }
          _header.dataset.id = _link.getAttribute('href');
          _header.addEventListener('click', function (event) {
            if (typeof $this.beforeActive === 'function') $this.beforeActive(_link, _tab);
            if (!_header.classList.contains('activo')) {
              let _allChildrens = container.querySelectorAll('.fln-tabs__header');
              $(_allChildrens).not(_header).removeClass('activo').next().slideUp('fast').removeClass('activo');
              $(items).not(items[c]).removeClass('activo');
              $(items[c]).addClass('activo');

              $(_header).next().slideDown('fast', function () {
                fln.scroll_to(_header);
              }).addClass('activo');
              _header.classList.add('activo');
            } else {
              _header.classList.remove('activo');
              $(_header).next().slideUp('fast');
            }
            if (typeof $this.onActive === 'function') $this.onActive(_link, _tab);
            event.preventDefault();
          });
        });
      }
    } else {
      if (container.classList.contains('fln-tabs--responsive')) {
        tabs.forEach(function (eld, d) {
          let _headers = container.querySelectorAll('.fln-tabs__header');
          _headers.forEach(function (ele, e) {
            ele.remove();
          });
        });
        container.classList.remove('fln-tabs--responsive');
      }
    }
  }
  responsive (el, tabs, items, links) {
    let $this = this;
    fln.responsive(() => {
      if (_width < 768) {
        $this.accordion(el, tabs, items, links);
      } else {
        $this.accordion(el, tabs, items, links, 'destroy');
      }
    });
  }
  init () {
    this.tabs();
  }
}

/* Ejemplo de Uso */
// let _tabs = new FLNTabs();
// _tabs.init();
