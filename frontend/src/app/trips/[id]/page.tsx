'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ActivityModal from './ActivityModal';
import TripEditModal from './TripEditModal';
import Image from 'next/image';

type Activity = {
  id: string;
  date: string;
  time: string;
  title: string;
};

type Trip = {
  id: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  activities: Activity[];
};

const images: Record<string, string> = {
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

function duration(start: string, end: string) {
  const days = Math.round(
    (new Date(end).getTime() - new Date(start).getTime()) /
      (1000 * 60 * 60 * 24),
  );

  return `${days} ${days === 1 ? 'day' : 'days'}`;
}

export default function TripDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const tripId = id as string;

  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [activity, setActivity] = useState<Activity | null>(null);
  const [showActivityModal, setShowActivityModal] = useState(false);

  const [showTripModal, setShowTripModal] = useState(false);

  useEffect(() => {
    async function loadTrip() {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3001/trips/${tripId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to load trip.');
        }

        setTrip(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : 'Failed to load trip.',
        );
      } finally {
        setLoading(false);
      }
    }

    loadTrip();
  }, [tripId, router]);

  function openAddActivity() {
    setActivity(null);
    setShowActivityModal(true);
  }

  function openEditActivity(item: Activity) {
    setActivity(item);
    setShowActivityModal(true);
  }

  async function saveActivity(
    event: FormEvent<HTMLFormElement>,
    data: {
      date: string;
      time: string;
      title: string;
    },
  ) {
    event.preventDefault();

    if (!trip) return;

    const token = localStorage.getItem('accessToken');

    if (!token) {
      router.push('/login');
      return;
    }

    const editing = activity !== null;

    const url = editing
      ? `http://localhost:3001/activities/${activity.id}`
      : `http://localhost:3001/trips/${trip.id}/activities`;

    try {
      const response = await fetch(url, {
        method: editing ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || 'Failed to save activity.',
        );
      }

      setTrip({
        ...trip,
        activities: editing
          ? trip.activities.map((item) =>
              item.id === result.id ? result : item,
            )
          : [...trip.activities, result],
      });

      setShowActivityModal(false);
    } catch (error) {
      throw error;
    }
  }

  async function deleteActivity(id: string) {
    const confirmed = window.confirm(
      'Delete this activity?',
    );

    if (!confirmed) return;

    const token = localStorage.getItem('accessToken');

    if (!token) return;

    try {
      const response = await fetch(
        `http://localhost:3001/activities/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to delete activity.');
      }

      setTrip({
        ...trip!,
        activities: trip!.activities.filter(
          (item) => item.id !== id,
        ),
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function saveTrip(
    event: FormEvent<HTMLFormElement>,
    data: {
      name: string;
      destination: string;
      startDate: string;
      endDate: string;
    },
  ) {
    event.preventDefault();

    if (!trip) return;

    const token = localStorage.getItem('accessToken');

    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/trips/${trip.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || 'Failed to update trip.',
        );
      }

      setTrip({
        ...trip,
        ...result,
      });

      setShowTripModal(false);
    } catch (error) {
      throw error;
    }
  }

  async function deleteTrip() {
    if (!trip) return;

    const confirmed = window.confirm(
      'Are you sure you want to delete this trip?',
    );

    if (!confirmed) return;

    const token = localStorage.getItem('accessToken');

    if (!token) return;

    try {
      const response = await fetch(
        `http://localhost:3001/trips/${trip.id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to delete trip.');
      }

      router.push('/trips');
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-32">
        <div className="mx-auto max-w-5xl">
          <div className="h-10 w-64 animate-pulse rounded bg-gray-200" />
          <div className="mt-4 h-6 w-40 animate-pulse rounded bg-gray-200" />
        </div>
      </main>
    );
  }

  if (!trip) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">
            Trip not found
          </h1>

          <p className="mt-3 text-gray-500">
            {error || 'This trip could not be loaded.'}
          </p>

          <button
            onClick={() => router.push('/trips')}
            className="mt-6 rounded-full bg-black px-6 py-3 text-sm text-white"
          >
            Back to trips
          </button>
        </div>
      </main>
    );
  }

  const image =
    images[trip.destination] ??
    '/images/heroBG.jpg';

  const activities = [...trip.activities].sort((a, b) => {
    return (
      new Date(a.date).getTime() -
        new Date(b.date).getTime() ||
      a.time.localeCompare(b.time)
    );
  });

  return (
    <main className="min-h-screen bg-white">
      <section className="relative h-[55vh] min-h-[450px]">
        <Image
          src={image}
          alt={trip.destination}
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-6 pb-14 lg:px-8">
          <div className="text-white">
            <p className="text-sm uppercase tracking-[0.2em] text-white/70">
              {formatDate(trip.startDate)} –{' '}
              {formatDate(trip.endDate)} ·{' '}
              {duration(trip.startDate, trip.endDate)}
            </p>

            <h1 className="mt-4 text-5xl font-semibold sm:text-6xl">
              {trip.name}
            </h1>

            <p className="mt-3 text-lg text-white/70">
              {trip.destination}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
        <div className="flex gap-3">
          <button
            onClick={() => setShowTripModal(true)}
            className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium hover:bg-gray-100"
          >
            Edit trip
          </button>

          <button
            onClick={deleteTrip}
            className="rounded-full border border-red-200 px-5 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            Delete trip
          </button>
        </div>

        <div className="mt-20 flex items-end justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-gray-400">
              Itinerary
            </p>

            <h2 className="mt-3 text-4xl font-semibold">
              {trip.destination}, day by day.
            </h2>
          </div>

          <button
            onClick={openAddActivity}
            className="rounded-full bg-black px-5 py-3 text-sm font-medium text-white hover:bg-gray-800"
          >
            + Add activity
          </button>
        </div>

        {activities.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-gray-300 px-6 py-16 text-center">
            <p className="text-gray-500">
              No activities yet.
            </p>
          </div>
        ) : (
          <div className="mt-10 space-y-8">
            {activities.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 border-b border-gray-100 pb-6 sm:flex-row sm:items-center"
              >
                <div className="w-32 shrink-0">
                  <p className="text-sm text-gray-400">
                    {formatDate(item.date)}
                  </p>

                  <p className="mt-1 font-mono text-sm text-gray-500">
                    {item.time}
                  </p>
                </div>

                <p className="flex-1 font-medium text-gray-900">
                  {item.title}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => openEditActivity(item)}
                    className="rounded-full border border-gray-200 px-4 py-2 text-xs font-medium hover:bg-gray-100"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteActivity(item.id)}
                    className="rounded-full border border-red-200 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => router.push('/trips')}
          className="mt-20 text-sm text-gray-500 hover:text-black"
        >
          ← Back to My Trips
        </button>
      </section>

      {showActivityModal && (
        <ActivityModal
          activity={activity}
          trip={trip}
          onSave={saveActivity}
          onClose={() => setShowActivityModal(false)}
        />
      )}

      {showTripModal && (
        <TripEditModal
          trip={trip}
          onSave={saveTrip}
          onClose={() => setShowTripModal(false)}
        />
      )}
    </main>
  );
}