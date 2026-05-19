"use client";

import Link from "next/link";
import { DatabaseSetupAlert } from "@/components/DatabaseSetupAlert";
import { EmptyState } from "@/components/EmptyState";
import { PlacesList } from "@/components/PlacesList";
import { PlacesStateMap } from "@/components/PlacesStateMap";
import { useConcerts } from "@/hooks/useConcerts";
import {
  aggregatePlaces,
  formatCurrency,
  stateConcertCounts,
} from "@/lib/place-metrics";

export default function PlacesPage() {
  const { concerts, loading, error, needsDatabaseSetup } = useConcerts();

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (needsDatabaseSetup) {
    return (
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold">Places I&apos;ve Been</h2>
        <DatabaseSetupAlert />
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <span>Could not load concerts: {error}</span>
      </div>
    );
  }

  if (concerts.length === 0) {
    return (
      <EmptyState
        title="No places to show yet"
        message="Add your first concert to see where you've been on the map."
        action={
          <Link href="/concerts/new" className="btn btn-primary">
            Add your first concert
          </Link>
        }
      />
    );
  }

  const summary = aggregatePlaces(concerts);
  const counts = stateConcertCounts(summary);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-bold">Places I&apos;ve Been</h2>
        <p className="opacity-70 mt-1">
          Cities and states from your logged shows, plus how far you traveled.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat bg-base-100 rounded-box shadow-md border border-base-300 p-4">
          <div className="stat-title text-xs">Cities visited</div>
          <div className="stat-value text-2xl">{summary.uniqueCities}</div>
        </div>
        <div className="stat bg-base-100 rounded-box shadow-md border border-base-300 p-4">
          <div className="stat-title text-xs">States visited</div>
          <div className="stat-value text-2xl">{summary.uniqueStates}</div>
        </div>
        <div className="stat bg-base-100 rounded-box shadow-md border border-base-300 p-4">
          <div className="stat-title text-xs">Miles from home (total)</div>
          <div className="stat-value text-2xl">
            {summary.totalMilesTraveled.toFixed(0)}
          </div>
        </div>
        <div className="stat bg-base-100 rounded-box shadow-md border border-base-300 p-4 col-span-2 lg:col-span-1">
          <div className="stat-title text-xs">Farthest show</div>
          <div className="stat-value text-lg leading-tight">
            {summary.farthestConcert ? (
              <>
                {summary.farthestConcert.concert_name}
                <span className="block text-sm font-normal opacity-70 mt-1">
                  {Number(summary.farthestConcert.distance_from_home).toFixed(1)} mi
                </span>
              </>
            ) : (
              "—"
            )}
          </div>
        </div>
      </div>

      {summary.unknownStateConcerts.length > 0 && (
        <div className="alert alert-warning text-sm">
          <span>
            {summary.unknownStateConcerts.length} concert
            {summary.unknownStateConcerts.length === 1 ? "" : "s"} use a state we
            couldn&apos;t map (use a US state name or 2-letter code like CA).
          </span>
        </div>
      )}

      <PlacesStateMap states={summary.states} stateCounts={counts} />
      <PlacesList states={summary.states} />
    </div>
  );
}
