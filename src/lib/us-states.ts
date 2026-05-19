/** US state names and abbreviations for normalizing concert location data. */

export const STATE_NAME_TO_ABBREV: Record<string, string> = {
  alabama: "AL",
  alaska: "AK",
  arizona: "AZ",
  arkansas: "AR",
  california: "CA",
  colorado: "CO",
  connecticut: "CT",
  delaware: "DE",
  florida: "FL",
  georgia: "GA",
  hawaii: "HI",
  idaho: "ID",
  illinois: "IL",
  indiana: "IN",
  iowa: "IA",
  kansas: "KS",
  kentucky: "KY",
  louisiana: "LA",
  maine: "ME",
  maryland: "MD",
  massachusetts: "MA",
  michigan: "MI",
  minnesota: "MN",
  mississippi: "MS",
  missouri: "MO",
  montana: "MT",
  nebraska: "NE",
  nevada: "NV",
  "new hampshire": "NH",
  "new jersey": "NJ",
  "new mexico": "NM",
  "new york": "NY",
  "north carolina": "NC",
  "north dakota": "ND",
  ohio: "OH",
  oklahoma: "OK",
  oregon: "OR",
  pennsylvania: "PA",
  "rhode island": "RI",
  "south carolina": "SC",
  "south dakota": "SD",
  tennessee: "TN",
  texas: "TX",
  utah: "UT",
  vermont: "VT",
  virginia: "VA",
  washington: "WA",
  "west virginia": "WV",
  wisconsin: "WI",
  wyoming: "WY",
  "district of columbia": "DC",
};

export const STATE_ABBREV_TO_NAME: Record<string, string> = Object.fromEntries(
  Object.entries(STATE_NAME_TO_ABBREV).map(([name, abbrev]) => [
    abbrev,
    name.replace(/\b\w/g, (c) => c.toUpperCase()),
  ])
);

/** Normalize user input to a two-letter US state code, or null if unrecognized. */
export function normalizeState(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  const upper = trimmed.toUpperCase();
  if (upper.length === 2 && STATE_ABBREV_TO_NAME[upper]) return upper;

  const key = trimmed.toLowerCase();
  return STATE_NAME_TO_ABBREV[key] ?? null;
}

export function formatStateLabel(abbrev: string): string {
  return STATE_ABBREV_TO_NAME[abbrev] ?? abbrev;
}

/** Match TopoJSON / map geography names (e.g. "California") to a state code. */
export function geoNameToAbbrev(geoName: string): string | null {
  return STATE_NAME_TO_ABBREV[geoName.trim().toLowerCase()] ?? null;
}
