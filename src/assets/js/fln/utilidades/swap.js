$.fn.swap = function (elem) {
  elem = elem.jquery ? elem : $(elem);
  return this.each(function () {
    $(document.createTextNode('')).insertBefore(this).before(elem.before(this)).remove();
  });
};