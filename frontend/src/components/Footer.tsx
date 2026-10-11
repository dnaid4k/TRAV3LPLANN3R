import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white px-6 py-12 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-gray-900"
          >
            TRAV3LPLANN3R
          </Link>

          <p className="mt-2 text-sm text-gray-500">
            Plan less. Travel more.
          </p>
        </div>

        <div className="flex gap-6 text-sm text-gray-500">
          <Link
            href="/explore"
            className="transition hover:text-gray-900"
          >
            Explore
          </Link>

          <Link
            href="/trips"
            className="transition hover:text-gray-900"
          >
            My Trips
          </Link>

          <Link
            href="/login"
            className="transition hover:text-gray-900"
          >
            Login
          </Link>
        </div>
      </div>
    </footer>
  );
}