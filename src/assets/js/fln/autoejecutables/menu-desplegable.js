/**
 * Funcionalidad que genera menués desplegables, hasta 3 niveles
 * @namespace menu_desplegable
 */

/**
 * @function
 * @memberof menu_desplegable
 */

fln.menu_desplegable = () => {
  /**
   * Define el item activo dentro del menú para poder abrir el menú
   * @type {boolean}
   * @memberof menu_desplegable
   * @instance
   */
  let _activo = false;

  /**
   * Selecciona todos los objetos con la clase "menu-desplegable" para iniciar la funcionalidad
   * @type {object}
   * @memberof menu_desplegable
   * @instance
   */
  const _menuDesplegable = $('.menu-desplegable');

  if (_menuDesplegable.length) {
    _menuDesplegable.each((i, el) => {
      $(el).find('ul').addClass('submenu');
      $(el).find('> ul').addClass('submenu--uno');
      $(el).find('.submenu--uno > li').has('ul').each((i, el) => {
        if ($(el).hasClass('abierto')) _activo = i;
        else _activo = false;
      })
      let abrirSubmenu0 = $(el).find('.submenu--uno > li:has(ul) > a');
      $(el).find('.submenu--uno').accordion({
        animate: 200,
        active: _activo,
        collapsible: true,
        heightStyle: 'content',
        header: abrirSubmenu0,
        icons: {
          'header': 'fln-mas',
          'activeHeader': 'fln-menos'
        }
      });
      $(el).find('.submenu--uno > li > ul').addClass('submenu--dos');
      _activo = false;
      $(el).find('.submenu--dos li').has('ul').each((i, el) => {
        if ($(el).hasClass('abierto')) _activo = i;
        else _activo = false;
      });
      let abrirSubmenu1 = $(el).find('.submenu--dos > li:has(ul) > a');
      $(el).find('.submenu--dos').accordion({
        animate: 200,
        active: _activo,
        collapsible: true,
        heightStyle: 'content',
        header: abrirSubmenu1,
        icons: {
          'header': 'fln-mas',
          'activeHeader': 'fln-menos'
        }
      })
      $(el).find('.submenu--dos > li > ul').addClass('submenu--tres');
      _activo = false;
      $(el).find('.submenu--tres li').has('ul').each((i, el) => {
        if ($(el).hasClass('abierto')) _activo = i;
        else _activo = false;
      })
      let abrirSubmenu2 = $(el).find('.submenu--tres > li:has(ul) > a');
      $(el).find('.submenu--tres').accordion({
        animate: 200,
        active: _activo,
        collapsible: true,
        heightStyle: 'content',
        header: abrirSubmenu2,
        icons: {
          'header': 'fln-mas',
          'activeHeader': 'fln-menos'
        }
      });
    })
  }
};
fln.menu_desplegable();
