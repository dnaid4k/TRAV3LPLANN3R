'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

type DestinationCardProps = {
  name: string;
  country: string;
  region: string;
  image: string;
};

export default function DestinationCard({
  name,
  country,
  region,
  image,
}: DestinationCardProps) {
  const slug = name.toLowerCase().replaceAll(' ', '-');

  return (
    <Link href={`/explore/${slug}`}>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.25 }}
        className="group relative h-[420px] overflow-hidden rounded-3xl"
      >
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute bottom-0 left-0 p-7 text-white">
          <p className="text-xs uppercase tracking-[0.2em] text-white">
            {region} <span className="mx-1 text-white/40">·</span> {country}
          </p>

          <h3 className="mt-2 text-3xl font-semibold">
            {name}
          </h3>
        </div>
      </motion.div>
    </Link>
  );
}