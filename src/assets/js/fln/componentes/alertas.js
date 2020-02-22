let _clearAlerta;
fln.alerta = opciones => {
  let _opciones = {
    selector: opciones.selector,
    texto: opciones.texto ? opciones.texto : 'Aquí deberias pasar tu mensaje',
    tipo: opciones.tipo ? opciones.tipo : false,
    altoContraste: opciones.altoContraste ? opciones.altoContraste : false,
    
    // TODO: Ver la posibilidad de asignar ancho full y automatico
    //ancho: opciones.ancho ? opciones.ancho : '',

    // TODO: Ver la posibilidad de mostrar distintos tamaños de alerta
    //size: opciones.size ? opciones.size : '',

    posicion: opciones.posicion ? opciones.posicion : 'top',
    tiempo: opciones.tiempo ? opciones.tiempo : 5000,
  };

  const _tipoAlertas = [
    'alerta--exito',
    'alerta--error',
    'alerta--info',
    'alerta--aviso',
    'alerta--hc',
  ];

  if (!_opciones.selector) {
    const _alerta = document.createElement('div');
    const _alertaAnterior = document.querySelector('.alerta--global');
    const _body = document.querySelector('body');
    if (_alertaAnterior) _alertaAnterior.remove();
    _alerta.className = 
      `alerta alerta--global ${
        _opciones.tipo ? `alerta--${_opciones.tipo}` : ''
      } alerta--fixed-${_opciones.posicion} ${
        _opciones.altoContraste ? `alerta--hc` : ''
      }`
    ;
    _alerta.innerText = _opciones.texto;
    _body.appendChild(_alerta);
    clearInterval(_clearAlerta);
    _clearAlerta = setInterval(() => {
      _alerta.remove();
    }, _opciones.tiempo);
  } else {
    const _alerta = document.querySelector(_opciones.selector);
    if (_opciones.texto) _alerta.innerText = _opciones.texto;
    if (_opciones.tipo) {
      _alerta.classList.remove(..._tipoAlertas);
      _alerta.classList.add(`alerta--${_opciones.tipo}`);
    }
    $(_alerta).slideDown('fast');
    clearInterval(_clearAlerta);
    _clearAlerta = setInterval(() => {
      $(_alerta).slideUp('fast');
    }, _opciones.tiempo);
  }
};
