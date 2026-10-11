'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AdventureSection() {
  return (
    <section className="bg-gray-50 px-6 py-24 lg:px-8">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-3xl bg-black md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col justify-center px-8 py-16 text-white sm:px-12 lg:px-16"
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-white/50">
            Your next adventure
          </p>

          <h2 className="max-w-lg text-4xl font-semibold tracking-tight sm:text-5xl">
            Find a place worth remembering.
          </h2>

          <p className="mt-6 max-w-lg leading-7 text-white/60">
            Explore new destinations, create unforgettable trips, and
            keep your travel plans organized from the first idea to the
            final day.
          </p>

          <div className="mt-8">
            <Link
              href="/explore"
              className="inline-flex w-fit rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/80"
            >
              Explore destinations
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9 }}
          className="min-h-[420px] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/images/heroBG.jpg')",
          }}
        />
      </div>
    </section>
  );
}