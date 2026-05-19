"use client";

import Link from "next/link";
import { ConcertCard } from "@/components/ConcertCard";
import { DatabaseSetupAlert } from "@/components/DatabaseSetupAlert";
import { EmptyState } from "@/components/EmptyState";
import { useConcerts } from "@/hooks/useConcerts";

export default function MyConcertsPage() {
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
        <h2 className="text-2xl font-bold">My Concerts</h2>
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

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">My Concerts</h2>
          <p className="opacity-70 mt-1">Every show you have logged.</p>
        </div>
        <Link href="/concerts/new" className="btn btn-primary">
          Add concert
        </Link>
      </div>

      {concerts.length === 0 ? (
        <EmptyState
          action={
            <Link href="/concerts/new" className="btn btn-primary">
              Add your first concert
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {concerts.map((concert) => (
            <ConcertCard key={concert.id} concert={concert} />
          ))}
        </div>
      )}
    </div>
  );
}
