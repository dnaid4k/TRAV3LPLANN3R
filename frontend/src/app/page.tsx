import Link from 'next/link';
import DestinationCard from '../components/DestinationCard';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Features from '../components/Features';
import AdventureSection from '../components/AdventureSection';
import Footer from '../components/Footer';

const destinations = [
  {
    name: 'Tokyo',
    country: 'Japan',
    region: 'Asia',
    image: '/images/japan.jpg',
  },
  {
    name: 'Bangkok',
    country: 'Thailand',
    region: 'Asia',
    image: '/images/thailand.jpg',
  },
  {
    name: 'Rome',
    country: 'Italy',
    region: 'Europe',
    image: '/images/italy.jpg',
  },
];

export default function Home() {
  return (
    <main>
      <Navbar />

      <Hero />

      <section className="bg-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-gray-400">
                Discover
              </p>

              <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                Popular destinations
              </h2>
            </div>

            <Link
              href="/explore"
              className="hidden rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium transition hover:bg-gray-100 sm:block"
            >
              View all
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {destinations.map((destination) => (
              <DestinationCard
                key={destination.name}
                name={destination.name}
                country={destination.country}
                region={destination.region}
                image={destination.image}
              />
            ))}
          </div>
        </div>
      </section>
      <Features />
      <AdventureSection />
      <Footer />
    </main>
  );
}