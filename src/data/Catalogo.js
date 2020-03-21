function importAll(r) {
  let images = {};
  r.keys().map(x => images[x.replace('./', '').replace(/\.(jpeg|jpg|JPEG|JPG)$/, '')] = r(x));
  return images;
}
const images = importAll(require.context('../assets/img/catalogo', false, /\.(jpeg|jpg|JPEG|JPG)$/));

const Listado = [
  {
    name: 'Batman',
    state: true,
    valor: '$4.500',
    image: images['batman']
  },
  {
    name: 'Batman Cartoon',
    state: true,
    valor: '$3.000',
    image: images['batman-cartoon']
  },
  {
    name: 'Batman Clásico',
    state: true,
    valor: '$4.500',
    image: images['batman-clasico']
  },
  {
    name: 'Escandalosos - Pardo',
    state: true,
    valor: '$3.500',
    image: images['bears-pardo-cana'],
    extraData: 'Calcetas con caña'
  }
];

// for(let i in images) {
//   if (images[i]) Listado[i].image = images[i];
// }

export default Listado;
