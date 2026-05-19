import type { Concert } from "@/lib/types";
import {
  costPerHour,
  formatCurrency,
  funPointsPer100,
  totalCost,
} from "@/lib/concert-metrics";

export function DashboardStats({ concerts }: { concerts: Concert[] }) {
  if (concerts.length === 0) return null;

  const totals = concerts.map((c) => totalCost(c));
  const totalSpent = totals.reduce((a, b) => a + b, 0);
  const avgCost = totalSpent / concerts.length;
  const avgFun =
    concerts.reduce((sum, c) => sum + c.fun_rating, 0) / concerts.length;
  const avgCostPerHour =
    concerts.reduce((sum, c) => sum + costPerHour(c), 0) / concerts.length;

  const withFunPer100 = concerts.map((c) => ({
    concert: c,
    funPer100: funPointsPer100(c),
    total: totalCost(c),
  }));

  const bestValue = [...withFunPer100].sort(
    (a, b) => b.funPer100 - a.funPer100
  )[0];
  const mostExpensive = [...withFunPer100].sort((a, b) => b.total - a.total)[0];
  const highestFun = [...concerts].sort((a, b) => b.fun_rating - a.fun_rating)[0];

  const stats = [
    { label: "Total concerts", value: String(concerts.length) },
    { label: "Total amount spent", value: formatCurrency(totalSpent) },
    { label: "Average cost per concert", value: formatCurrency(avgCost) },
    { label: "Average fun rating", value: avgFun.toFixed(1) },
    { label: "Average cost per hour", value: formatCurrency(avgCostPerHour) },
    {
      label: "Best value concert",
      value: bestValue?.concert.concert_name ?? "—",
      sub: bestValue
        ? `${bestValue.funPer100.toFixed(2)} Fun Points per $100`
        : undefined,
    },
    {
      label: "Most expensive concert",
      value: mostExpensive?.concert.concert_name ?? "—",
      sub: mostExpensive ? formatCurrency(mostExpensive.total) : undefined,
    },
    {
      label: "Highest fun rating",
      value: highestFun?.concert_name ?? "—",
      sub: highestFun ? `${highestFun.fun_rating}/10` : undefined,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="stat bg-base-100 rounded-box shadow-md border border-base-300 p-4"
        >
          <div className="stat-title text-xs opacity-70">{stat.label}</div>
          <div className="stat-value text-lg font-bold">{stat.value}</div>
          {stat.sub && (
            <div className="stat-desc text-sm opacity-70 mt-1">{stat.sub}</div>
          )}
        </div>
      ))}
    </div>
  );
}
