class Wizard {
  constructor(selector, inicio, fin) {
    this.selector = $(selector);
    this.inicio = inicio;
    this.fin = fin;
    this.estructura = '<div class="wizard__valor">0</div><div class="wizard__total"><div class="wizard__valor wizard__valor--total">0</div></div>';
    this.ancho_selector = $(this.selector).width();
    this.ancho = valor => {
      $(selector).find('.wizard__total').width(`${valor}%`);
    };
  }

  iniciar () {
    this.selector.append(this.estructura);
    let anchoSelector = this.ancho;
    this.selector.find(".wizard__valor--total").css("left", this.ancho_selector / 2)

    $(window).resize(() => {
      anchoSelector = $(selector).width()
      $(selector).find(".wizard__valor--total").css("left", anchoSelector / 2)
    })
  }

  actualizar (valorInicial, valor, tiempo) {
    this.ancho(valor)
    $({
      Counter: valorInicial
    }).animate({
      Counter: valor
    }, {
      duration: tiempo,
      easing: "swing",
      step() {
        const _counter = this.Counter;
        $(selector).find(".wizard__valor").each(function () {
          $(this).text(Math.ceil(_counter))
        })
      }
    });

    setTimeout(() => {
      $(selector)
        .find(".wizard__valor")
        .text(valor)
    }, tiempo + 10);
  }
}

/*
function animateValue(id, start, end, duration) {
  var range = end - start;
  var current = start;
  var increment = end > start? 1 : -1;
  var stepTime = Math.abs(Math.floor(duration / range));
  var obj = document.getElementById(id);
  var timer = setInterval(function() {
      current += increment;
      obj.innerHTML = current;
      if (current == end) {
          clearInterval(timer);
      }
  }, stepTime);
}
*/