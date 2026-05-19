"use client";

import type { StatePlace } from "@/lib/place-metrics";
import { formatCurrency, formatDate } from "@/lib/concert-metrics";

type PlacesListProps = {
  states: StatePlace[];
};

export function PlacesList({ states }: PlacesListProps) {
  if (states.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-bold">Places you&apos;ve been</h3>
      <div className="flex flex-col gap-3">
        {states.map((state) => (
          <details
            key={state.stateAbbrev}
            className="group bg-base-100 border border-base-300 shadow-sm rounded-lg"
            open={states.length <= 3}
          >
            <summary className="font-medium flex flex-wrap items-center gap-2 p-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <span className="badge badge-primary">{state.stateAbbrev}</span>
              <span>{state.stateLabel}</span>
              <span className="text-sm opacity-70">
                {state.concertCount} show{state.concertCount === 1 ? "" : "s"} ·{" "}
                {formatCurrency(state.totalSpent)} · avg fun{" "}
                {state.averageFun.toFixed(1)}/10
              </span>
            </summary>
            <ul className="flex flex-col gap-3 px-4 pb-4">
              {state.cities.map((city) => (
                <li
                  key={city.key}
                  className="bg-base-200 rounded-lg p-4 flex flex-col gap-2"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                    <div>
                      <p className="font-semibold">
                        {city.city}, {city.stateAbbrev}
                      </p>
                      <p className="text-sm opacity-70">
                        {city.concertCount} concert
                        {city.concertCount === 1 ? "" : "s"}
                        {city.totalMiles > 0 &&
                          ` · ${city.totalMiles.toFixed(1)} mi from home (total)`}
                      </p>
                    </div>
                    <div className="text-sm sm:text-right shrink-0">
                      <p className="font-medium">{formatCurrency(city.totalSpent)}</p>
                      <p className="opacity-70">
                        Avg fun {city.averageFun.toFixed(1)}/10
                      </p>
                    </div>
                  </div>
                  <ul className="text-xs opacity-70 border-t border-base-300 pt-2">
                    {city.concerts.slice(0, 5).map((c) => (
                      <li key={c.id}>
                        {c.concert_name} — {formatDate(c.concert_date)}
                      </li>
                    ))}
                    {city.concerts.length > 5 && (
                      <li>+{city.concerts.length - 5} more</li>
                    )}
                  </ul>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </div>
  );
}
