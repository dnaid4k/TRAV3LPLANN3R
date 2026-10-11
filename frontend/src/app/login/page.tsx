'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage('');
    setIsLoading(true);

    try {
      const endpoint =
        mode === 'login'
          ? 'http://localhost:3001/auth/login'
          : 'http://localhost:3001/auth/register';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || 'Something went wrong.');
        return;
      }

      if (mode === 'login') {
        localStorage.setItem('accessToken', data.accessToken);
        router.push('/trips');
        setMessage('Login successful.');
      } else {
        setMessage('Account created successfully. You can now log in.');
        setMode('login');
        setPassword('');
      }
    } catch {
      setMessage('Unable to connect to the server.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center">
            <Link
              href="/"
              className="text-sm font-semibold tracking-[0.25em] text-white/70 transition hover:text-white"
            >
              TRAV3LPLANN3R
            </Link>

            <h1 className="mt-8 text-4xl font-semibold tracking-tight">
              {mode === 'login' ? 'Welcome back.' : 'Start your journey.'}
            </h1>

            <p className="mt-3 text-sm leading-6 text-white/50">
              {mode === 'login'
                ? 'Sign in to access your trips and plans.'
                : 'Create an account and start planning your next adventure.'}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
            <div className="mb-8 grid grid-cols-2 rounded-2xl bg-white/[0.04] p-1">
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setMessage('');
                }}
                className={`rounded-xl px-4 py-2.5 text-sm transition ${
                  mode === 'login'
                    ? 'bg-white text-black'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                Login
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode('register');
                  setMessage('');
                }}
                className={`rounded-xl px-4 py-2.5 text-sm transition ${
                  mode === 'register'
                    ? 'bg-white text-black'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                Register
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm text-white/70"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-white/30"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm text-white/70"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-white/30"
                />
              </div>

              {message && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/70">
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-2xl bg-white px-4 py-3.5 text-sm font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading
                  ? 'Please wait...'
                  : mode === 'login'
                    ? 'Login'
                    : 'Create account'}
              </button>
            </form>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="text-sm text-white/40 transition hover:text-white"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}