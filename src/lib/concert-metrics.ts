import type { Concert, CostFields } from "./types";

export const COST_CATEGORIES: {
  key: keyof CostFields;
  label: string;
}[] = [
  { key: "ticket_cost", label: "Tickets" },
  { key: "ticket_fees", label: "Ticket fees" },
  { key: "parking_cost", label: "Parking" },
  { key: "food_drink_cost", label: "Food & drink" },
  { key: "merchandise_cost", label: "Merchandise" },
  { key: "lodging_cost", label: "Hotel / lodging" },
  { key: "travel_cost", label: "Travel / gas" },
  { key: "other_cost", label: "Other" },
];

export function getCostValues(concert: Pick<Concert, keyof CostFields>): number[] {
  return COST_CATEGORIES.map(({ key }) => Number(concert[key]) || 0);
}

export function totalCost(concert: Pick<Concert, keyof CostFields>): number {
  return getCostValues(concert).reduce((sum, value) => sum + value, 0);
}

export function costPerHour(
  concert: Pick<Concert, keyof CostFields | "hours_at_event">
): number {
  const hours = Number(concert.hours_at_event);
  if (!hours || hours <= 0) return 0;
  return totalCost(concert) / hours;
}

export function funPointsPer100(
  concert: Pick<Concert, keyof CostFields | "fun_rating">
): number {
  const cost = totalCost(concert);
  if (cost <= 0) return 0;
  return (Number(concert.fun_rating) / cost) * 100;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split("-");
  if (!year || !month || !day) return dateString;
  return new Date(Number(year), Number(month) - 1, Number(day)).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "short", day: "numeric" }
  );
}

export function getTopCostCategories(
  concert: Pick<Concert, keyof CostFields>,
  limit = 3
): { label: string; amount: number }[] {
  return COST_CATEGORIES.map(({ key, label }) => ({
    label,
    amount: Number(concert[key]) || 0,
  }))
    .filter((item) => item.amount > 0)
    .sort((a, b) => b.amount - a.amount)
    .slice(0, limit);
}

export function categoryTotals(concerts: Concert[]): { label: string; amount: number }[] {
  return COST_CATEGORIES.map(({ key, label }) => ({
    label,
    amount: concerts.reduce((sum, concert) => sum + (Number(concert[key]) || 0), 0),
  })).filter((item) => item.amount > 0);
}
