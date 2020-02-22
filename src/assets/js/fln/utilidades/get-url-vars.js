/**
 * getUrlVars()["fecha"]
 * 
 */
fln.getUrlVars = () => {
  let _vars = {};
  let _parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    _vars[key] = value;
  });
  return _vars;
}