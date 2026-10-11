'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

type Trip = {
  id: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
};

const destinationImages: Record<string, string> = {
  Bangkok: '/images/thailand.jpg',
  'Mexico City': '/images/mexico.jpg',
  Tokyo: '/images/japan.jpg',
  Rome: '/images/italy.jpg',
  Madrid: '/images/spain.jpg',
  Cairo: '/images/egypt.jpg',
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}

function getDuration(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const difference = end.getTime() - start.getTime();
  const days = Math.round(difference / (1000 * 60 * 60 * 24));

  return `${days} ${days === 1 ? 'day' : 'days'}`;
}

export default function TripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadTrips() {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:3001/trips', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to load trips');
        }

        const data = await response.json();
        setTrips(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    loadTrips();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-400">
              Your journeys
            </p>

            <h1 className="mt-4 text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
              My Trips
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-8 text-gray-500">
              Your upcoming adventures, all in one place.
            </p>

            {!isLoading && trips.length > 0 && (
              <p className="mt-4 text-sm font-medium text-gray-400">
                {trips.length} {trips.length === 1 ? 'trip' : 'trips'} planned
              </p>
            )}
          </div>

          <Link
            href="/trips/create"
            className="inline-flex w-fit items-center rounded-full bg-black px-6 py-3.5 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            + Create new trip
          </Link>
        </div>

        {isLoading ? (
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="h-[520px] animate-pulse rounded-3xl bg-gray-200"
              />
            ))}
          </div>
        ) : trips.length > 0 ? (
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {trips.map((trip, index) => (
              <motion.article
                key={trip.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.12,
                }}
                className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={
                      destinationImages[trip.destination] ??
                      '/images/heroBG.jpg'
                    }
                    alt={trip.destination}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <p className="text-sm text-white/70">
                      {trip.destination}
                    </p>

                    <h2 className="mt-1 text-3xl font-semibold tracking-tight">
                      {trip.name}
                    </h2>
                  </div>
                </div>

                <div className="p-6 sm:p-7">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
                        Dates
                      </p>

                      <p className="mt-2 text-sm font-medium text-gray-900">
                        {formatDate(trip.startDate)} –{' '}
                        {formatDate(trip.endDate)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
                        Duration
                      </p>

                      <p className="mt-2 text-sm font-medium text-gray-900">
                        {getDuration(trip.startDate, trip.endDate)}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/trips/${trip.id}`}
                    className="mt-7 flex items-center justify-center rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-900 transition hover:border-gray-900 hover:bg-gray-900 hover:text-white"
                  >
                    View trip
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="mt-16 rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-20 text-center">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-400">
              No trips yet
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900">
              Your next adventure starts here.
            </h2>

            <p className="mx-auto mt-4 max-w-md leading-7 text-gray-500">
              Create your first trip and start building your itinerary.
            </p>

            <Link
              href="/trips/create"
              className="mt-8 inline-flex rounded-full bg-black px-6 py-3.5 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Create your first trip
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}