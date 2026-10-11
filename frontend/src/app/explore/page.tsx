'use client';

import { FormEvent, Suspense, useMemo, useState } from 'react';
import DestinationCard from '../../components/DestinationCard';
import Navbar from '../../components/Navbar';
import { useSearchParams } from 'next/navigation';

const destinations = [
  {
    name: 'Bangkok',
    country: 'Thailand',
    region: 'Asia',
    image: '/images/thailand.jpg',
  },
  {
    name: 'Mexico City',
    country: 'Mexico',
    region: 'North America',
    image: '/images/mexico.jpg',
  },
  {
    name: 'Tokyo',
    country: 'Japan',
    region: 'Asia',
    image: '/images/japan.jpg',
  },
  {
    name: 'Rome',
    country: 'Italy',
    region: 'Europe',
    image: '/images/italy.jpg',
  },
  {
    name: 'Madrid',
    country: 'Spain',
    region: 'Europe',
    image: '/images/spain.jpg',
  },
  {
    name: 'Cairo',
    country: 'Egypt',
    region: 'Africa',
    image: '/images/egypt.jpg',
  },
];

function ExploreContent() {
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get('search') ?? '';

  const [search, setSearch] = useState(initialSearch);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  const filteredDestinations = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return destinations;
    }

    return destinations.filter(
    (destination) =>
      destination.name.toLowerCase().includes(query) ||
      destination.country.toLowerCase().includes(query) ||
      destination.region.toLowerCase().includes(query),
  );
  }, [search]);

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="bg-black px-6 pb-20 pt-36 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-white/50">
            Explore
          </p>

          <h1 className="max-w-3xl text-5xl font-semibold tracking-tight sm:text-6xl">
            Find your next destination.
          </h1>
          <form
            onSubmit={handleSubmit}
            className="mt-10 flex max-w-2xl flex-col gap-3 rounded-2xl bg-white p-3 sm:flex-row"
          >
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search destinations..."
              className="min-w-0 flex-1 rounded-xl px-4 py-3 text-gray-900 outline-none placeholder:text-gray-400"
            />

            <button
              type="submit"
              className="rounded-xl bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-gray-400">
                Destinations
              </p>

              <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                Explore the world
              </h2>
            </div>
          </div>

          {filteredDestinations.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredDestinations.map((destination) => (
                <DestinationCard
                  key={destination.name}
                  name={destination.name}
                  country={destination.country}
                  region={destination.region}
                  image={destination.image}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
              <h3 className="text-xl font-semibold text-gray-900">
                No destinations found
              </h3>

              <p className="mt-3 text-gray-500">
                Try searching for another destination or region.
              </p>

              <button
                type="button"
                onClick={() => setSearch('')}
                className="mt-6 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Show all destinations
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={null}>
      <ExploreContent />
    </Suspense>
  );
}