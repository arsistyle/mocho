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
    image: images['batman'],
    extraData: 'Calcetas largas, full body'
  },
  {
    name: 'Batman',
    state: true,
    valor: '$3.500',
    image: images['batman-cartoon'],
    extraData: 'Calcetas largas, pattern'
  },
  {
    name: 'Batman Clásico',
    state: true,
    valor: '$4.500',
    image: images['batman-clasico'],
    extraData: 'Calcetas caña, Whoom, clásico'
  },
  {
    name: 'Escandalosos - Pardo',
    state: true,
    valor: '$3.500',
    image: images['bears-pardo-cana'],
    extraData: 'Calcetas largas, Grizzly'
  },
  {
    name: 'Escandalosos - Pardo',
    state: true,
    valor: '$2.500',
    image: images['bears-pardo-face'],
    extraData: 'Calcetas cortas, face'
  },
  {
    name: 'Escandalosos - Pardo',
    state: true,
    valor: '$2.500',
    image: images['bears-pardo-face-full'],
    extraData: 'Calcetas cortas, full face'
  },
  {
    name: 'Escandalosos - Polar',
    state: true,
    valor: '$2.500',
    image: images['bears-polar-face-full'],
    extraData: 'Calcetas cortas, full face'
  },
  {
    name: 'Capitan América',
    state: true,
    valor: '$4.500',
    image: images['capitan-america'],
    extraData: 'Calcetas largas, full face'
  },
  {
    name: 'Capitan América',
    state: true,
    valor: '$4.500',
    image: images['capitan-america-2'],
    extraData: 'Calcetas largas, full body'
  },
  {
    name: 'Capitan América',
    state: true,
    valor: '$3.500',
    image: images['capitan-america-cartoon'],
    extraData: 'Calcetas largas, cartoon'
  },
  {
    name: 'Comida rápida',
    state: true,
    valor: '$3.000',
    image: images['comida-rapida'],
    extraData: 'Calcetas largas, comida'
  },
  {
    name: 'Deadpool',
    state: true,
    valor: '$4.500',
    image: images['deadpool'],
    extraData: 'Calcetas largas, full body'
  },
  {
    name: 'Flash',
    state: true,
    valor: '$4.500',
    image: images['flash'],
    extraData: 'Calcetas largas, emblema'
  },
  {
    name: 'Hulk',
    state: true,
    valor: '$4.500',
    image: images['hulk-cartoon'],
    extraData: 'Calcetas largas, cartoon'
  },
  {
    name: 'Hulk',
    state: true,
    valor: '$2.500',
    image: images['hulk-smash'],
    extraData: 'Calcetas cortas, smash'
  },
  {
    name: 'Iron Man',
    state: true,
    valor: '$2.500',
    image: images['iron-man-cartoon'],
    extraData: 'Calcetas largas, cartoon'
  },
  {
    name: 'Iron Man Clásico',
    state: true,
    valor: '$4.500',
    image: images['iron-man-clasico'],
    extraData: 'Calcetas largas, clasico'
  },
  {
    name: 'Loki',
    state: true,
    valor: '$2.500',
    image: images['loki-cartoon'],
    extraData: 'Calcetas largas, cartoon'
  },
  {
    name: 'Luigi & hongos',
    state: true,
    valor: '$4.500',
    image: images['luigi-hongo'],
    extraData: 'Calcetas largas'
  },
  {
    name: 'Mario Bross',
    state: true,
    valor: '$4.500',
    image: images['mario-bross'],
    extraData: 'Calcetas largas'
  },
  {
    name: 'Pokemón - Slowpoke',
    state: true,
    valor: '$2.500',
    image: images['pokemon-slowpoke'],
    extraData: 'Calcetas cortas, pokebola'
  },
  {
    name: 'Reptar',
    state: true,
    valor: '$4.500',
    image: images['reptar'],
    extraData: 'Calcetas cortas'
  },
  {
    name: 'Snoopy',
    state: true,
    valor: '$2.500',
    image: images['snoopy'],
    extraData: 'Calcetas cortas, corazón'
  },
  {
    name: 'Spider-Man',
    state: true,
    valor: '$4.500',
    image: images['spiderman'],
    extraData: 'Calcetas largas, full face'
  },
  {
    name: 'Spider-Man',
    state: true,
    valor: '$2.500',
    image: images['spiderman-corto'],
    extraData: 'Calcetas cortas'
  },
  {
    name: 'Sushi',
    state: true,
    valor: '$3.000',
    image: images['sushi'],
    extraData: 'Calcetas caña'
  },
  {
    name: 'Superman',
    state: true,
    valor: '$4.500',
    image: images['superman'],
    extraData: 'Calcetas largas, full body'
  },
  {
    name: 'Superman',
    state: true,
    valor: '$2.500',
    image: images['superman-cartoon'],
    extraData: 'Calcetas largas, cartoon'
  },
  {
    name: 'Superman Clásico',
    state: true,
    valor: '$4.500',
    image: images['superman-clasico'],
    extraData: 'Calcetas largas, clásico'
  },
  {
    name: 'Thanos',
    state: true,
    valor: '$4.500',
    image: images['thanos'],
    extraData: 'Calcetas largas, full body'
  },
  {
    name: 'Thor',
    state: true,
    valor: '$3.000',
    image: images['thor-cartoon'],
    extraData: 'Calcetas largas, cartoon'
  },
  {
    name: 'Thor Clásico',
    state: true,
    valor: '$4.500',
    image: images['thor-clasico'],
    extraData: 'Calcetas largas, clásico'
  },
  {
    name: 'Thor',
    state: true,
    valor: '$2.500',
    image: images['thor-corto'],
    extraData: 'Calcetas cortas, full face'
  },
  {
    name: 'Venom',
    state: true,
    valor: '$4.500',
    image: images['venom'],
    extraData: 'Calcetas largas, full body'
  },
  {
    name: 'Zebras',
    state: true,
    valor: '$3.000',
    image: images['zebras'],
    extraData: 'Calcetas largas, pattern'
  },
];

export default Listado;
