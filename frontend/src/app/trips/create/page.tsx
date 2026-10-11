'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreateTripPage() {
  const router = useRouter();

  const [tripName, setTripName] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  setError('');

  if (endDate < startDate) {
    setError('End date cannot be earlier than start date.');
    return;
  }

  const token = localStorage.getItem('accessToken');

  if (!token) {
    setError('You need to be logged in to create a trip.');
    return;
  }

  setIsSubmitting(true);

  try {
    const response = await fetch('http://localhost:3001/trips', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: tripName,
        destination,
        startDate,
        endDate,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || 'Failed to create trip.');
      return;
    }

    router.push('/trips');
  } catch {
    setError('Unable to connect to the server.');
  } finally {
    setIsSubmitting(false);
  }
}

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div>
          <Link
            href="/trips"
            className="text-sm font-medium text-gray-500 transition hover:text-gray-900"
          >
            ← Back to my trips
          </Link>

          <p className="mt-10 text-sm font-medium uppercase tracking-[0.25em] text-gray-400">
            My Trips
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
            Create a new trip
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-500">
            Start planning your next adventure.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-12 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10"
        >
          <div className="space-y-8">
            <div>
              <label
                htmlFor="tripName"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Trip name
              </label>

              <input
                id="tripName"
                type="text"
                value={tripName}
                onChange={(event) => setTripName(event.target.value)}
                placeholder="Japan Adventure"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-2 focus:ring-black/5"
              />
            </div>

            <div>
              <label
                htmlFor="destination"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Destination
              </label>

              <select
                id="destination"
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
                required
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-black focus:ring-2 focus:ring-black/5"
              >
                <option value="">Select a destination</option>
                <option value="Bangkok">Bangkok</option>
                <option value="Mexico City">Mexico City</option>
                <option value="Tokyo">Tokyo</option>
                <option value="Rome">Rome</option>
                <option value="Madrid">Madrid</option>
                <option value="Cairo">Cairo</option>
              </select>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="startDate"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Start date
                </label>

                <input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(event) => setStartDate(event.target.value)}
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 outline-none transition focus:border-black focus:ring-2 focus:ring-black/5"
                />
              </div>

              <div>
                <label
                  htmlFor="endDate"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  End date
                </label>

                <input
                  id="endDate"
                  type="date"
                  value={endDate}
                  min={startDate || undefined}
                  onChange={(event) => setEndDate(event.target.value)}
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 outline-none transition focus:border-black focus:ring-2 focus:ring-black/5"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-8 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/trips"
              className="inline-flex items-center justify-center rounded-full border border-gray-200 px-6 py-3.5 text-sm font-medium text-gray-900 transition hover:bg-gray-100"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-full bg-black px-7 py-3.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? 'Creating trip...' : 'Create trip'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}