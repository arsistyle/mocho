/**
 * Observa las mutaciones del DOM
 * @namespace mutation_observer
 */

const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    console.log(mutation.type);
  });    
});

let target = document.querySelector('#check1');

// configuration of the observer:
var config = { attributes: true, childList: true, characterData: true };
 
// pass in the target node, as well as the observer options
observer.observe(target, config);