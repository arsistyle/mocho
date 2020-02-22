/**
 * Se usan en cualquier parte del sitio como referencia al cargar el sitio
 * @namespace variables_globales
 */

/**
 * Versión de la librería
 * @type {number}
 * @memberof variables_globales
 * @instance
 */
let _version = 2.0;

/**
 * Ancho del viewport
 * @type {number}
 * @memberof variables_globales
 * @instance
 */
let _width = window.innerWidth;

/**
 * Alto del viewport
 * @type {number}
 * @memberof variables_globales
 * @instance
 */
let _height = window.innerHeight;

/**
 * Distancia actual del scroll
 * @type {number}
 * @memberof variables_globales
 * @instance
 */
let _scroll = window.scrollY;

/**
 * Pregunta si es Internet-explorer
 * @type {number}
 * @memberof variables_globales
 * @instance
 */
let _ie = window.navigator.userAgent.indexOf('MSIE ');
if (_ie) _scroll = document.documentElement.scrollTop;

/**
 * Objeto que contiene todas las funcionalidades de la librería
 * @type {object}
 * @memberof variables_globales
 * @instance
 */
const fln = {};
