"use client";

import Link from "next/link";
import { DashboardCharts } from "@/components/DashboardCharts";
import { DashboardStats } from "@/components/DashboardStats";
import { DatabaseSetupAlert } from "@/components/DatabaseSetupAlert";
import { EmptyState } from "@/components/EmptyState";
import { useConcerts } from "@/hooks/useConcerts";

export default function DashboardPage() {
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
        <h2 className="text-2xl font-bold">Dashboard</h2>
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
        action={
          <Link href="/concerts/new" className="btn btn-primary">
            Add your first concert
          </Link>
        }
      />
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="opacity-70 mt-1">
          A snapshot of your concert spending and fun.
        </p>
      </div>
      <DashboardStats concerts={concerts} />
      <DashboardCharts concerts={concerts} />
    </div>
  );
}
