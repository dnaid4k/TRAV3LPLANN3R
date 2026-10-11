import DestinationDetails from '../../../components/DestinationDetails';

const destinations = {
  bangkok: {
    name: 'Bangkok',
    region: 'Thailand',
    image: '/images/thailand.jpg',
    description:
      'A vibrant city filled with incredible food, golden temples, busy streets, and a unique mix of tradition and modern life.',
    places: ['Grand Palace', 'Wat Arun', 'Chinatown'],
  },

  'mexico-city': {
    name: 'Mexico City',
    region: 'Mexico',
    image: '/images/mexico.jpg',
    description:
      'A vibrant capital filled with historic neighborhoods, impressive architecture, incredible food, and a unique mix of tradition and modern culture.',
    places: ['Zócalo', 'Chapultepec Park', 'Frida Kahlo Museum'],
  },

  tokyo: {
    name: 'Tokyo',
    region: 'Japan',
    image: '/images/japan.jpg',
    description:
      'A fascinating city where futuristic technology, neon streets, traditional temples, and incredible food come together.',
    places: ['Shibuya', 'Senso-ji Temple', 'Tokyo Skytree'],
  },

  rome: {
    name: 'Rome',
    region: 'Italy',
    image: '/images/italy.jpg',
    description:
      'Explore ancient history, iconic architecture, incredible food, and the timeless atmosphere of the Italian capital.',
    places: ['Colosseum', 'Vatican City', 'Trevi Fountain'],
  },

  madrid: {
    name: 'Madrid',
    region: 'Spain',
    image: '/images/spain.jpg',
    description:
      'Discover lively streets, beautiful architecture, world-class museums, and the relaxed rhythm of Spain’s capital.',
    places: ['Gran Vía', 'Plaza Mayor', 'Retiro Park'],
  },

  cairo: {
    name: 'Cairo',
    region: 'Egypt',
    image: '/images/egypt.jpg',
    description:
      'Experience the energy of Egypt’s capital, ancient history, remarkable monuments, and one of the world’s most iconic landscapes.',
    places: ['Giza Pyramids', 'Egyptian Museum', 'Khan el-Khalili'],
  },
};

type DestinationPageProps = {
  params: Promise<{
    destination: string;
  }>;
};

export default async function DestinationPage({
  params,
}: DestinationPageProps) {
  const { destination } = await params;

  const data =
    destinations[destination as keyof typeof destinations] ??
    destinations.bangkok;

  return (
    <DestinationDetails
      name={data.name}
      region={data.region}
      image={data.image}
      description={data.description}
      places={data.places}
    />
  );
}