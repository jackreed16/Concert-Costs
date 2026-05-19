import type { Concert } from "@/lib/types";
import {
  costPerHour,
  formatCurrency,
  formatDate,
  funPointsPer100,
  getTopCostCategories,
  totalCost,
} from "@/lib/concert-metrics";

export function ConcertCard({ concert }: { concert: Concert }) {
  const total = totalCost(concert);
  const perHour = costPerHour(concert);
  const funPer100 = funPointsPer100(concert);
  const categories = getTopCostCategories(concert);

  return (
    <div className="card bg-base-100 shadow-md border border-base-300">
      <div className="card-body gap-3">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
          <div>
            <h2 className="card-title text-lg">{concert.concert_name}</h2>
            <p className="opacity-80">{concert.artist}</p>
            <p className="text-sm opacity-70">
              {concert.venue} · {concert.city}, {concert.state}
            </p>
            <p className="text-sm font-medium mt-1">{formatDate(concert.concert_date)}</p>
          </div>
          <div className="badge badge-primary badge-lg self-start">
            Fun: {concert.fun_rating}/10
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Stat label="Total cost" value={formatCurrency(total)} />
          <Stat label="Cost per hour" value={formatCurrency(perHour)} />
          <Stat label="Fun Points per $100" value={funPer100.toFixed(2)} />
          <Stat
            label="Distance"
            value={`${Number(concert.distance_from_home).toFixed(1)} mi`}
          />
        </div>

        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <span key={cat.label} className="badge badge-outline">
                {cat.label}: {formatCurrency(cat.amount)}
              </span>
            ))}
          </div>
        )}

        {concert.notes && (
          <p className="text-sm opacity-80 border-t border-base-300 pt-3">
            <span className="font-medium">Notes:</span> {concert.notes}
          </p>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-base-200 rounded-lg p-3">
      <p className="text-xs opacity-70">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}
