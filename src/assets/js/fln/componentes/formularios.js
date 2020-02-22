fln['formularios'] = () => {
  $('.form__grupo--animado').each(function () {
    const grupo = $(this)
    const input = grupo.find(".text, textarea")

    input.change(function () {
      if ($(this).val().length !== 0) {
        grupo.find("label").addClass("focus")
      }
    })

    input.focus(() => {
      grupo.find("label").addClass("focus")
    })

    input.blur(function () {
      if (
        $(this).val().length === 0 ||
        ($(this).data("tipo") == "tipo_telefono" && $(this).val() == "+")
      ) {
        grupo.find("label").removeClass("focus")
      }
    })
  })
}

fln.formularios();