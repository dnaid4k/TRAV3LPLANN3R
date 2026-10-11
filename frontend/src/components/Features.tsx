'use client';

import { motion } from 'framer-motion';

const features = [
  {
    number: '01',
    title: 'Discover',
    description:
      'Find inspiring destinations and discover places worth adding to your journey.',
  },
  {
    number: '02',
    title: 'Plan',
    description:
      'Build your itinerary, organize activities, and turn ideas into a real travel plan.',
  },
  {
    number: '03',
    title: 'Travel',
    description:
      'Keep everything about your trip organized and enjoy the journey without the stress.',
  },
];

export default function Features() {
  return (
    <section className="bg-white px-6 py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-gray-400">
            Why TRAV3LPLANN3R
          </p>

          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Everything you need to plan your next adventure.
          </h2>
        </motion.div>

        <div className="mt-20 grid gap-12 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
              }}
              className="border-t border-gray-200 pt-6"
            >
              <span className="text-sm font-medium text-gray-400">
                {feature.number}
              </span>

              <h3 className="mt-8 text-2xl font-semibold text-gray-900">
                {feature.title}
              </h3>

              <p className="mt-4 max-w-sm leading-7 text-gray-500">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}