const multipleEventsListeners = (elem, events, func) => {
  var event = events.split(' ');
  for (var i = 0; i < event.length; i++) {
    elem.addEventListener(event[i], func, false);
  }
}