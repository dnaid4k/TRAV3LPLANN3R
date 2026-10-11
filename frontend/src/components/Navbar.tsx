'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type NavbarProps = {
  variant?: 'dark' | 'light';
};

type JwtPayload = {
  email?: string;
};

function getUserEmail() {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    return null;
  }

  try {
    const payload = token.split('.')[1];

    if (!payload) {
      return null;
    }

    const decoded: JwtPayload = JSON.parse(
      atob(payload.replace(/-/g, '+').replace(/_/g, '/')),
    );

    return decoded.email || null;
  } catch {
    return null;
  }
}

export default function Navbar({
  variant = 'dark',
}: NavbarProps) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const isLight = variant === 'light';
  const [email, setEmail] = useState<string | null>(null);

useEffect(() => {
  setEmail(getUserEmail());
}, []);

  function handleLogout() {
    localStorage.removeItem('accessToken');
    setEmail(null);
    setIsOpen(false);
    router.push('/');
  }

  const textClass = isLight
    ? 'text-gray-600 hover:text-black'
    : 'text-white/80 hover:text-white';

  const logoClass = isLight
    ? 'text-black'
    : 'text-white';

  const buttonClass = isLight
    ? 'border-gray-200 text-gray-900 hover:bg-black hover:text-white'
    : 'border-white/30 text-white hover:bg-white hover:text-black';

  return (
    <header className="absolute left-0 right-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className={`text-3xl font-semibold tracking-tight ${logoClass}`}
          >
            TRAV3LPLANN3R
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="/explore"
              className={`text-sm transition ${textClass}`}
            >
              Explore
            </Link>

            <Link
              href="/trips"
              className={`text-sm transition ${textClass}`}
            >
              My Trips
            </Link>

            {email ? (
              <>
                <span
                  className={`max-w-48 truncate text-sm ${
                    isLight ? 'text-gray-400' : 'text-white/60'
                  }`}
                >
                  {email}
                </span>

                <button
                  type="button"
                  onClick={handleLogout}
                  className={`rounded-full border px-5 py-2.5 text-sm transition ${buttonClass}`}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className={`rounded-full border px-5 py-2.5 text-sm transition ${buttonClass}`}
              >
                Login
              </Link>
            )}
          </nav>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className={`flex h-10 w-10 items-center justify-center rounded-full border text-xl transition md:hidden ${
              isLight
                ? 'border-gray-200 text-gray-900 hover:bg-gray-100'
                : 'border-white/30 text-white hover:bg-white hover:text-black'
            }`}
          >
            {isOpen ? '×' : '☰'}
          </button>
        </div>

        {isOpen && (
          <nav
            className={`mt-4 rounded-2xl p-4 backdrop-blur-md md:hidden ${
              isLight
                ? 'border border-gray-200 bg-white/95 shadow-xl'
                : 'border border-white/10 bg-black/80'
            }`}
          >
            <div className="flex flex-col gap-2">
              <Link
                href="/explore"
                onClick={() => setIsOpen(false)}
                className={`rounded-xl px-4 py-3 text-sm transition ${
                  isLight
                    ? 'text-gray-700 hover:bg-gray-100 hover:text-black'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                Explore
              </Link>

              <Link
                href="/trips"
                onClick={() => setIsOpen(false)}
                className={`rounded-xl px-4 py-3 text-sm transition ${
                  isLight
                    ? 'text-gray-700 hover:bg-gray-100 hover:text-black'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                My Trips
              </Link>

              {email ? (
                <>
                  <div
                    className={`rounded-xl px-4 py-3 text-sm ${
                      isLight ? 'text-gray-400' : 'text-white/50'
                    }`}
                  >
                    {email}
                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className={`rounded-xl px-4 py-3 text-left text-sm transition ${
                      isLight
                        ? 'text-gray-700 hover:bg-gray-100 hover:text-black'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm transition ${
                    isLight
                      ? 'text-gray-700 hover:bg-gray-100 hover:text-black'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  Login
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}