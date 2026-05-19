import type { Concert } from "./types";
import { formatCurrency, funPointsPer100, totalCost } from "./concert-metrics";
import { formatStateLabel, normalizeState } from "./us-states";

export type CityPlace = {
  key: string;
  city: string;
  stateAbbrev: string;
  stateLabel: string;
  concertCount: number;
  totalSpent: number;
  averageFun: number;
  totalMiles: number;
  concerts: Concert[];
};

export type StatePlace = {
  stateAbbrev: string;
  stateLabel: string;
  concertCount: number;
  totalSpent: number;
  averageFun: number;
  totalMiles: number;
  cities: CityPlace[];
};

export type PlacesSummary = {
  uniqueCities: number;
  uniqueStates: number;
  totalMilesTraveled: number;
  farthestConcert: Concert | null;
  states: StatePlace[];
  unknownStateConcerts: Concert[];
};

function cityKey(city: string, stateAbbrev: string): string {
  return `${city.trim().toLowerCase()}|${stateAbbrev}`;
}

export function aggregatePlaces(concerts: Concert[]): PlacesSummary {
  const unknownStateConcerts: Concert[] = [];
  const cityMap = new Map<string, CityPlace>();

  for (const concert of concerts) {
    const stateAbbrev = normalizeState(concert.state);
    if (!stateAbbrev) {
      unknownStateConcerts.push(concert);
      continue;
    }

    const key = cityKey(concert.city, stateAbbrev);
    const cost = totalCost(concert);
    const miles = Number(concert.distance_from_home) || 0;
    const existing = cityMap.get(key);

    if (existing) {
      existing.concertCount += 1;
      existing.totalSpent += cost;
      existing.totalMiles += miles;
      existing.concerts.push(concert);
      existing.averageFun =
        existing.concerts.reduce((s, c) => s + c.fun_rating, 0) /
        existing.concerts.length;
    } else {
      cityMap.set(key, {
        key,
        city: concert.city.trim(),
        stateAbbrev,
        stateLabel: formatStateLabel(stateAbbrev),
        concertCount: 1,
        totalSpent: cost,
        averageFun: concert.fun_rating,
        totalMiles: miles,
        concerts: [concert],
      });
    }
  }

  const stateMap = new Map<string, StatePlace>();

  for (const city of cityMap.values()) {
    const existing = stateMap.get(city.stateAbbrev);
    if (existing) {
      existing.concertCount += city.concertCount;
      existing.totalSpent += city.totalSpent;
      existing.totalMiles += city.totalMiles;
      existing.cities.push(city);
    } else {
      stateMap.set(city.stateAbbrev, {
        stateAbbrev: city.stateAbbrev,
        stateLabel: city.stateLabel,
        concertCount: city.concertCount,
        totalSpent: city.totalSpent,
        totalMiles: city.totalMiles,
        averageFun: 0,
        cities: [city],
      });
    }
  }

  for (const state of stateMap.values()) {
    const allConcerts = state.cities.flatMap((c) => c.concerts);
    state.averageFun =
      allConcerts.reduce((s, c) => s + c.fun_rating, 0) / allConcerts.length;
    state.cities.sort((a, b) => b.concertCount - a.concertCount);
  }

  const states = [...stateMap.values()].sort(
    (a, b) => b.concertCount - a.concertCount
  );

  const uniqueCities = cityMap.size;
  const uniqueStates = stateMap.size;
  const totalMilesTraveled = concerts.reduce(
    (sum, c) => sum + (Number(c.distance_from_home) || 0),
    0
  );

  let farthestConcert: Concert | null = null;
  let maxMiles = -1;
  for (const concert of concerts) {
    const miles = Number(concert.distance_from_home) || 0;
    if (miles > maxMiles) {
      maxMiles = miles;
      farthestConcert = concert;
    }
  }

  return {
    uniqueCities,
    uniqueStates,
    totalMilesTraveled,
    farthestConcert: maxMiles > 0 ? farthestConcert : null,
    states,
    unknownStateConcerts,
  };
}

export function stateConcertCounts(
  summary: PlacesSummary
): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const state of summary.states) {
    counts[state.stateAbbrev] = state.concertCount;
  }
  return counts;
}

export { formatCurrency, funPointsPer100, totalCost };
