const isIE9 = () => {
  if (navigator.appVersion.indexOf('MSIE 9.') !== -1) {
    return true;
  } else {
    return false;
  }
}