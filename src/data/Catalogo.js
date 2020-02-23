const importAll = r => r.keys().map(r);
const images = importAll(require.context('../assets/img/catalogo', false, /\.(jpeg|jpg|JPEG|JPG)$/));

export const Listado = [
  {
    id: 0,
    name: 'Superman Clásico',
    wsp: `https://wa.me/56981902681?text=Hola gente de Mocho, Quiero comprar las calcetas *Superman Clásico*.`,
    state: true,
    image: images[0],
    valor: '$2.500'
  },
  {
    id: 1,
    name: 'Donkey Kong',
    wsp: `https://wa.me/56981902681?text=Hola gente de Mocho, Quiero comprar las calcetas *Donkey Kong*.`,
    state: false,
    image: images[1],
    valor: '$2.500'
  }
]