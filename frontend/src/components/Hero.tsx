'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Hero() {
  const router = useRouter();
  const [destination, setDestination] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const query = destination.trim();

    if (!query) {
      router.push('/explore');
      return;
    }

    router.push(`/explore?search=${encodeURIComponent(query)}`);
  }

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/heroBG.jpg')",
        }}
      />

      <div className="absolute inset-0 bg-black/35" />

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-20 pt-32 lg:px-8">
        <div className="max-w-6xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="tracking-tight text-white"
          >
            <span className="block text-5xl font-semibold sm:text-6xl lg:text-7xl">
              Plan Your Way
            </span>

            <span className="mt-1 block text-6xl font-semibold sm:text-7xl lg:text-8xl">
              TRAV3L PLANN3R
            </span>

            <span className="mt-1 block whitespace-nowrap text-5xl font-semibold sm:text-6xl lg:text-7xl">
              Gonna Make Your Stay
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 max-w-xl text-lg leading-8 text-white/80"
          >
            Discover new places, plan your journey, and make every trip your own.
          </motion.p>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex max-w-xl flex-col gap-3 rounded-2xl bg-white p-3 shadow-2xl sm:flex-row"
          >
            <input
              type="text"
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
              placeholder="Where do you want to go?"
              className="min-w-0 flex-1 rounded-xl px-4 py-3 text-gray-900 outline-none placeholder:text-gray-400"
            />

            <button
              type="submit"
              className="rounded-xl bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800"
            >
              Explore
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}