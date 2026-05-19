"use client";

import { useMemo, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { formatCurrency } from "@/lib/concert-metrics";
import type { StatePlace } from "@/lib/place-metrics";
import { formatStateLabel, geoNameToAbbrev } from "@/lib/us-states";

const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

type PlacesStateMapProps = {
  states: StatePlace[];
  stateCounts: Record<string, number>;
};

type HoveredState = {
  abbrev: string;
  label: string;
  data: StatePlace | null;
  count: number;
};

/** White (never visited) → dark green (most concerts). */
function getFill(count: number, maxCount: number, isHovered: boolean): string {
  if (count === 0) {
    return isHovered ? "#f0fdf4" : "#ffffff";
  }
  const t = maxCount > 0 ? Math.min(1, count / maxCount) : 1;
  const hue = 142;
  const saturation = 42 + t * 38;
  const lightness = 94 - t * 58;
  const base = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  if (!isHovered) return base;
  return `hsl(${hue}, ${Math.min(100, saturation + 8)}%, ${Math.max(18, lightness - 8)}%)`;
}

function MapTooltip({ hovered }: { hovered: HoveredState }) {
  const { data, count, label } = hovered;

  return (
    <div className="bg-base-100 border border-base-300 rounded-lg shadow-lg p-4 min-w-[14rem]">
      <p className="font-bold text-lg">{label}</p>
      {data ? (
        <ul className="text-sm mt-2 space-y-1 opacity-90">
          <li>
            <span className="font-medium">Concerts:</span> {count}
          </li>
          <li>
            <span className="font-medium">Total spent:</span>{" "}
            {formatCurrency(data.totalSpent)}
          </li>
          <li>
            <span className="font-medium">Avg fun:</span>{" "}
            {data.averageFun.toFixed(1)}/10
          </li>
          <li>
            <span className="font-medium">Cities:</span>{" "}
            {data.cities.map((c) => c.city).join(", ")}
          </li>
          {data.totalMiles > 0 && (
            <li>
              <span className="font-medium">Travel (mi):</span>{" "}
              {data.totalMiles.toFixed(1)} total
            </li>
          )}
        </ul>
      ) : (
        <p className="text-sm opacity-70 mt-2">No concerts logged here yet.</p>
      )}
    </div>
  );
}

export function PlacesStateMap({ states, stateCounts }: PlacesStateMapProps) {
  const [hovered, setHovered] = useState<HoveredState | null>(null);

  const maxCount = useMemo(
    () => Math.max(0, ...Object.values(stateCounts)),
    [stateCounts]
  );

  const stateByAbbrev = useMemo(
    () => Object.fromEntries(states.map((s) => [s.stateAbbrev, s])),
    [states]
  );

  const defaultHint: HoveredState = useMemo(
    () => ({
      abbrev: "",
      label: "Explore the map",
      data: null,
      count: 0,
    }),
    []
  );

  const display = hovered ?? defaultHint;

  return (
    <div className="card bg-base-100 shadow-md border border-base-300">
      <div className="card-body">
        <h3 className="card-title text-lg">Interactive concert map</h3>
        <p className="text-sm opacity-70 -mt-2 mb-2">
          Hover over a state to see your shows. White = never visited; darker green =
          more concerts.
        </p>

        <div className="flex flex-col lg:flex-row gap-4">
          <div
            className="flex-1 min-h-[280px] bg-base-200/50 rounded-lg p-2 touch-pan-x"
            role="application"
            aria-label="Interactive map of the United States"
          >
            <ComposableMap
              projection="geoAlbersUsa"
              width={800}
              height={500}
              style={{ width: "100%", height: "auto" }}
            >
              <ZoomableGroup center={[-96, 38]} zoom={1}>
                <Geographies geography={GEO_URL}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const name = geo.properties?.name as string | undefined;
                      if (!name) return null;

                      const abbrev = geoNameToAbbrev(name);
                      if (!abbrev) return null;

                      const count = stateCounts[abbrev] ?? 0;
                      const isHovered = hovered?.abbrev === abbrev;

                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onMouseEnter={() => {
                            setHovered({
                              abbrev,
                              label: formatStateLabel(abbrev),
                              data: stateByAbbrev[abbrev] ?? null,
                              count,
                            });
                          }}
                          onMouseLeave={() => setHovered(null)}
                          onFocus={() => {
                            setHovered({
                              abbrev,
                              label: formatStateLabel(abbrev),
                              data: stateByAbbrev[abbrev] ?? null,
                              count,
                            });
                          }}
                          onBlur={() => setHovered(null)}
                          tabIndex={0}
                          style={{
                            default: {
                              fill: getFill(count, maxCount, false),
                              stroke: "#000000",
                              strokeWidth: 0.75,
                              outline: "none",
                              transition: "fill 0.15s ease",
                            },
                            hover: {
                              fill: getFill(count, maxCount, true),
                              stroke: "#000000",
                              strokeWidth: 1,
                              outline: "none",
                              cursor: "pointer",
                            },
                            pressed: {
                              fill: getFill(count, maxCount, true),
                              stroke: "#000000",
                              strokeWidth: 1,
                              outline: "none",
                            },
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>
          </div>

          <div className="lg:w-56 shrink-0 flex flex-col justify-center">
            {display.abbrev === "" ? (
              <div className="bg-base-200 rounded-lg p-4 text-sm opacity-80 text-center">
                <p className="font-medium">Hover a state</p>
                <p className="mt-1">
                  Move your mouse over the map to see concert counts, spending,
                  and cities.
                </p>
              </div>
            ) : (
              <MapTooltip hovered={display} />
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs opacity-80 mt-2">
          <span>Concert visits</span>
          <div
            className="flex h-4 w-44 rounded-sm overflow-hidden border border-base-300"
            aria-hidden
          >
            <span className="flex-1 bg-white" />
            <span className="flex-1" style={{ background: "hsl(142, 55%, 70%)" }} />
            <span className="flex-1" style={{ background: "hsl(142, 80%, 32%)" }} />
          </div>
          <span className="opacity-70">White → dark green</span>
        </div>
      </div>
    </div>
  );
}
