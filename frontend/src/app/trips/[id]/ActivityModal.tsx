import { FormEvent, useState } from 'react';

type Activity = {
  id: string;
  date: string;
  time: string;
  title: string;
};

type Trip = {
  startDate: string;
  endDate: string;
};

type ActivityModalProps = {
  activity: Activity | null;
  trip: Trip;
  onSave: (
    event: FormEvent<HTMLFormElement>,
    data: {
      date: string;
      time: string;
      title: string;
    },
  ) => Promise<void>;
  onClose: () => void;
};

export default function ActivityModal({
  activity,
  trip,
  onSave,
  onClose,
}: ActivityModalProps) {
  const [date, setDate] = useState(
    activity?.date.slice(0, 10) ??
      trip.startDate.slice(0, 10),
  );

  const [time, setTime] = useState(
    activity?.time ?? '09:00',
  );

  const [title, setTitle] = useState(
    activity?.title ?? '',
  );

  const [error, setError] = useState('');

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    try {
      setError('');
      await onSave(event, {
        date,
        time,
        title,
      });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Failed to save activity.',
      );
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6 py-8">
      <div className="w-full max-w-lg rounded-3xl bg-white p-7 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-gray-400">
              Itinerary
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
              {activity
                ? 'Edit activity'
                : 'Add activity'}
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
              htmlFor="activity-date"
              className="mb-2 block text-sm font-medium"
            >
              Date
            </label>

            <input
              id="activity-date"
              type="date"
              value={date}
              min={trip.startDate.slice(0, 10)}
              max={trip.endDate.slice(0, 10)}
              onChange={(event) =>
                setDate(event.target.value)
              }
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <div>
            <label
              htmlFor="activity-time"
              className="mb-2 block text-sm font-medium"
            >
              Time
            </label>

            <input
              id="activity-time"
              type="time"
              value={time}
              onChange={(event) =>
                setTime(event.target.value)
              }
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <div>
            <label
              htmlFor="activity-title"
              className="mb-2 block text-sm font-medium"
            >
              Activity
            </label>

            <input
              id="activity-title"
              type="text"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              placeholder="Visit Fushimi Inari Shrine"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-black"
            />
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
              {activity
                ? 'Save changes'
                : 'Add activity'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}