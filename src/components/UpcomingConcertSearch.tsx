"use client";

import { useMemo, useState } from "react";
import { EmptyState } from "@/components/EmptyState";
import {
  formatConcertDate,
  getUpcomingStateOptions,
  searchUpcomingConcerts,
  UPCOMING_CONCERTS,
  type UpcomingConcert,
} from "@/lib/upcoming-concerts";
import { formatStateLabel } from "@/lib/us-states";

function UpcomingConcertCard({ concert }: { concert: UpcomingConcert }) {
  return (
    <article className="card bg-base-100 border border-base-300 shadow-sm">
      <div className="card-body gap-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="font-bold text-lg leading-tight">{concert.artist}</h3>
            <p className="text-sm opacity-80">{concert.concertName}</p>
          </div>
          <span className="badge badge-primary badge-outline">{concert.genre}</span>
        </div>

        <ul className="text-sm space-y-1 opacity-90">
          <li>
            <span className="font-medium">When:</span> {formatConcertDate(concert.date)}
          </li>
          <li>
            <span className="font-medium">Where:</span> {concert.venue}
          </li>
          <li>
            <span className="font-medium">City:</span> {concert.city},{" "}
            {formatStateLabel(concert.state)}
          </li>
          <li>
            <span className="font-medium">From:</span> ${concert.ticketFrom} (sample price)
          </li>
        </ul>

        <p className="text-xs opacity-60 pt-1 border-t border-base-300">
          Demo listing — not a real ticket link.
        </p>
      </div>
    </article>
  );
}

export function UpcomingConcertSearch() {
  const [query, setQuery] = useState("");
  const [stateFilter, setStateFilter] = useState("");

  const stateOptions = useMemo(() => getUpcomingStateOptions(), []);

  const results = useMemo(
    () => searchUpcomingConcerts(query, stateFilter),
    [query, stateFilter]
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="card bg-base-100 border border-base-300 shadow-md">
        <div className="card-body gap-4">
          <div>
            <h2 className="card-title text-lg">Search upcoming shows</h2>
            <p className="text-sm opacity-70">
              Browse sample concerts across the United States. Search by artist,
              tour name, city, venue, state, or genre.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <label className="form-control flex-1">
              <span className="label">
                <span className="label-text font-medium">Search</span>
              </span>
              <input
                type="search"
                className="input input-bordered w-full"
                placeholder="e.g. Nashville, rock, Red Rocks…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search upcoming concerts"
              />
            </label>
            <label className="form-control w-full md:w-48">
              <span className="label">
                <span className="label-text font-medium">State</span>
              </span>
              <select
                className="select select-bordered w-full"
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                aria-label="Filter by state"
              >
                <option value="">All states</option>
                {stateOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {formatStateLabel(opt.value)}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <p className="text-xs opacity-60">
            Showing {results.length} of {UPCOMING_CONCERTS.length} sample upcoming
            shows (demo data only).
          </p>
        </div>
      </div>

      {results.length === 0 ? (
        <EmptyState
          title="No shows found"
          message="Try a different search term or choose another state. This page uses sample data, not live listings."
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {results.map((concert) => (
            <UpcomingConcertCard key={concert.id} concert={concert} />
          ))}
        </div>
      )}
    </div>
  );
}
