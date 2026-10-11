'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

type DestinationDetailsProps = {
  name: string;
  region: string;
  image: string;
  description: string;
  places: string[];
};

export default function DestinationDetails({
  name,
  region,
  image,
  description,
  places,
}: DestinationDetailsProps) {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative h-[75vh] min-h-[600px] overflow-hidden">
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${image}')`,
          }}
        />

        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-6 pb-16 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-white"
          >
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-white/70">
              {region}
            </p>

            <h1 className="text-6xl font-semibold tracking-tight sm:text-7xl lg:text-9xl">
              {name}
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-400">
                About
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-gray-900">
                Start planning your journey.
              </h2>
            </div>

            <div>
              <p className="max-w-3xl text-xl leading-9 text-gray-600">
                {description}
              </p>

              <div className="mt-12">
                <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-400">
                  Popular places
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {places.map((place, index) => (
                    <motion.div
                      key={place}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                      }}
                      className="rounded-2xl border border-gray-200 p-6 transition hover:-translate-y-1 hover:shadow-lg"
                    >
                      <span className="text-sm text-gray-400">
                        0{index + 1}
                      </span>

                      <h3 className="mt-8 text-xl font-semibold text-gray-900">
                        {place}
                      </h3>
                    </motion.div>
                  ))}
                </div>

                <Link
                  href="/trips/create"
                  className="mt-10 inline-flex rounded-full bg-black px-7 py-3.5 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                  Create a trip
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}