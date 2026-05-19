"use client";

import type { ReactNode } from "react";
import type { Concert } from "@/lib/types";
import {
  categoryTotals,
  funPointsPer100,
  totalCost,
} from "@/lib/concert-metrics";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function ChartCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="card bg-base-100 shadow-md border border-base-300">
      <div className="card-body">
        <h3 className="card-title text-base">{title}</h3>
        <div className="h-64 w-full min-h-[16rem]">{children}</div>
      </div>
    </div>
  );
}

export function DashboardCharts({ concerts }: { concerts: Concert[] }) {
  if (concerts.length === 0) return null;

  const categoryData = categoryTotals(concerts).map((item) => ({
    name: item.label,
    amount: Number(item.amount.toFixed(2)),
  }));

  const byConcert = concerts.map((c) => ({
    name:
      c.concert_name.length > 18
        ? `${c.concert_name.slice(0, 16)}…`
        : c.concert_name,
    fullName: c.concert_name,
    total: Number(totalCost(c).toFixed(2)),
    fun: c.fun_rating,
    funPer100: Number(funPointsPer100(c).toFixed(2)),
  }));

  const tooltipStyle = {
    backgroundColor: "oklch(var(--b1))",
    border: "1px solid oklch(var(--b3))",
    borderRadius: "8px",
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ChartCard title="Spending by cost category">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={categoryData} margin={{ top: 8, right: 8, left: 0, bottom: 48 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11 }}
              angle={-25}
              textAnchor="end"
              height={70}
            />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(value) => [`$${value}`, "Spent"]}
            />
            <Bar dataKey="amount" fill="oklch(var(--p))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Total cost by concert">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={byConcert} margin={{ top: 8, right: 8, left: 0, bottom: 48 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-25} textAnchor="end" height={70} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={tooltipStyle}
              labelFormatter={(_, payload) =>
                payload?.[0]?.payload?.fullName ?? ""
              }
              formatter={(value) => [`$${value}`, "Total cost"]}
            />
            <Bar dataKey="total" fill="oklch(var(--s))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Fun rating by concert">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={byConcert} margin={{ top: 8, right: 8, left: 0, bottom: 48 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-25} textAnchor="end" height={70} />
            <YAxis domain={[0, 10]} tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={tooltipStyle}
              labelFormatter={(_, payload) =>
                payload?.[0]?.payload?.fullName ?? ""
              }
              formatter={(value) => [value, "Fun rating"]}
            />
            <Bar dataKey="fun" fill="oklch(var(--a))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Fun Points per $100 by concert">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={byConcert} margin={{ top: 8, right: 8, left: 0, bottom: 48 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-25} textAnchor="end" height={70} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={tooltipStyle}
              labelFormatter={(_, payload) =>
                payload?.[0]?.payload?.fullName ?? ""
              }
              formatter={(value) => [value, "Fun Points per $100"]}
            />
            <Bar dataKey="funPer100" fill="oklch(var(--su))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
