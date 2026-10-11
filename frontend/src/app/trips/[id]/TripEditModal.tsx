import { FormEvent, useState } from 'react';

type Trip = {
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
};

type TripEditModalProps = {
  trip: Trip;
  onSave: (
    event: FormEvent<HTMLFormElement>,
    data: {
      name: string;
      destination: string;
      startDate: string;
      endDate: string;
    },
  ) => Promise<void>;
  onClose: () => void;
};

export default function TripEditModal({
  trip,
  onSave,
  onClose,
}: TripEditModalProps) {
  const [name, setName] = useState(trip.name);
  const [destination, setDestination] = useState(
    trip.destination,
  );
  const [startDate, setStartDate] = useState(
    trip.startDate.slice(0, 10),
  );
  const [endDate, setEndDate] = useState(
    trip.endDate.slice(0, 10),
  );

  const [error, setError] = useState('');

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    if (endDate < startDate) {
      event.preventDefault();
      setError(
        'End date cannot be before start date.',
      );
      return;
    }

    try {
      setError('');

      await onSave(event, {
        name,
        destination,
        startDate,
        endDate,
      });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Failed to update trip.',
      );
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6 py-8">
      <div className="w-full max-w-lg rounded-3xl bg-white p-7 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-gray-400">
              Trip settings
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
              Edit trip
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-2xl text-gray-400 hover:text-black"
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5"
        >
          <div>
            <label
              htmlFor="trip-name"
              className="mb-2 block text-sm font-medium"
            >
              Trip name
            </label>

            <input
              id="trip-name"
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <div>
            <label
              htmlFor="trip-destination"
              className="mb-2 block text-sm font-medium"
            >
              Destination
            </label>

            <input
              id="trip-destination"
              type="text"
              value={destination}
              onChange={(event) =>
                setDestination(event.target.value)
              }
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="trip-start"
                className="mb-2 block text-sm font-medium"
              >
                Start date
              </label>

              <input
                id="trip-start"
                type="date"
                value={startDate}
                onChange={(event) =>
                  setStartDate(event.target.value)
                }
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label
                htmlFor="trip-end"
                className="mb-2 block text-sm font-medium"
              >
                End date
              </label>

              <input
                id="trip-end"
                type="date"
                value={endDate}
                min={startDate}
                onChange={(event) =>
                  setEndDate(event.target.value)
                }
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-black"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-gray-200 px-5 py-3 text-sm font-medium hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}