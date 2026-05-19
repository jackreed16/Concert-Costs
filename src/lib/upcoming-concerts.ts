/** Sample upcoming US concerts for demo search (not live ticket data). */

export type UpcomingConcert = {
  id: string;
  artist: string;
  concertName: string;
  venue: string;
  city: string;
  state: string;
  date: string;
  genre: string;
  ticketFrom: number;
};

export const UPCOMING_CONCERTS: UpcomingConcert[] = [
  {
    id: "1",
    artist: "The Midnight Echoes",
    concertName: "Neon Horizons Tour",
    venue: "Bridgestone Arena",
    city: "Nashville",
    state: "TN",
    date: "2026-06-14",
    genre: "Indie Rock",
    ticketFrom: 45,
  },
  {
    id: "2",
    artist: "Luna Park",
    concertName: "Starlight Sessions",
    venue: "Red Rocks Amphitheatre",
    city: "Morrison",
    state: "CO",
    date: "2026-07-02",
    genre: "Alternative",
    ticketFrom: 65,
  },
  {
    id: "3",
    artist: "DJ Prism",
    concertName: "Electric Summer",
    venue: "United Center",
    city: "Chicago",
    state: "IL",
    date: "2026-08-09",
    genre: "Electronic",
    ticketFrom: 55,
  },
  {
    id: "4",
    artist: "Maya Rivers",
    concertName: "Golden Hour Live",
    venue: "Greek Theatre",
    city: "Los Angeles",
    state: "CA",
    date: "2026-06-22",
    genre: "Pop",
    ticketFrom: 72,
  },
  {
    id: "5",
    artist: "Iron County",
    concertName: "Dust & Thunder",
    venue: "AT&T Stadium",
    city: "Arlington",
    state: "TX",
    date: "2026-09-18",
    genre: "Country Rock",
    ticketFrom: 38,
  },
  {
    id: "6",
    artist: "The Velvet Assembly",
    concertName: "Assembly Line Tour",
    venue: "Madison Square Garden",
    city: "New York",
    state: "NY",
    date: "2026-10-04",
    genre: "Rock",
    ticketFrom: 89,
  },
  {
    id: "7",
    artist: "Sable & The Coast",
    concertName: "Tide Lines",
    venue: "Mercedes-Benz Stadium",
    city: "Atlanta",
    state: "GA",
    date: "2026-07-19",
    genre: "R&B",
    ticketFrom: 52,
  },
  {
    id: "8",
    artist: "Harbor Lights",
    concertName: "Summer Sail",
    venue: "TD Garden",
    city: "Boston",
    state: "MA",
    date: "2026-08-15",
    genre: "Folk",
    ticketFrom: 48,
  },
  {
    id: "9",
    artist: "Kai Nova",
    concertName: "Pulse Wave",
    venue: "Climate Pledge Arena",
    city: "Seattle",
    state: "WA",
    date: "2026-06-28",
    genre: "Pop",
    ticketFrom: 58,
  },
  {
    id: "10",
    artist: "Desert Bloom",
    concertName: "Mirage Nights",
    venue: "Footprint Center",
    city: "Phoenix",
    state: "AZ",
    date: "2026-07-11",
    genre: "Indie",
    ticketFrom: 42,
  },
  {
    id: "11",
    artist: "The Brass Theory",
    concertName: "Second Line Celebration",
    venue: "Smoothie King Center",
    city: "New Orleans",
    state: "LA",
    date: "2026-09-06",
    genre: "Jazz Funk",
    ticketFrom: 44,
  },
  {
    id: "12",
    artist: "Northline",
    concertName: "Frozen Fire",
    venue: "Target Center",
    city: "Minneapolis",
    state: "MN",
    date: "2026-08-23",
    genre: "Rock",
    ticketFrom: 50,
  },
  {
    id: "13",
    artist: "Coral Street",
    concertName: "Boardwalk Beats",
    venue: "Hard Rock Live",
    city: "Hollywood",
    state: "FL",
    date: "2026-06-07",
    genre: "Hip-Hop",
    ticketFrom: 60,
  },
  {
    id: "14",
    artist: "Ember & Oak",
    concertName: "Wildfire Acoustic",
    venue: "Ryman Auditorium",
    city: "Nashville",
    state: "TN",
    date: "2026-10-12",
    genre: "Americana",
    ticketFrom: 55,
  },
  {
    id: "15",
    artist: "Voltage Crew",
    concertName: "City Circuit",
    venue: "Little Caesars Arena",
    city: "Detroit",
    state: "MI",
    date: "2026-07-26",
    genre: "Hip-Hop",
    ticketFrom: 47,
  },
  {
    id: "16",
    artist: "Silver Atlas",
    concertName: "Orbital Dreams",
    venue: "Ball Arena",
    city: "Denver",
    state: "CO",
    date: "2026-09-27",
    genre: "Synth Pop",
    ticketFrom: 54,
  },
  {
    id: "17",
    artist: "The Wandering Keys",
    concertName: "Piano Roads",
    venue: "Wells Fargo Center",
    city: "Philadelphia",
    state: "PA",
    date: "2026-08-02",
    genre: "Classical Crossover",
    ticketFrom: 40,
  },
  {
    id: "18",
    artist: "Blaze County",
    concertName: "Honky Tonk Highway",
    venue: "Bridgestone Arena",
    city: "Nashville",
    state: "TN",
    date: "2026-11-08",
    genre: "Country",
    ticketFrom: 35,
  },
  {
    id: "19",
    artist: "Neon Palm",
    concertName: "Heatwave",
    venue: "Kaseya Center",
    city: "Miami",
    state: "FL",
    date: "2026-07-04",
    genre: "Latin Pop",
    ticketFrom: 62,
  },
  {
    id: "20",
    artist: "Static Garden",
    concertName: "Bloom Tour",
    venue: "Moda Center",
    city: "Portland",
    state: "OR",
    date: "2026-08-30",
    genre: "Indie Rock",
    ticketFrom: 46,
  },
  {
    id: "21",
    artist: "Queen City Collective",
    concertName: "Crown Sessions",
    venue: "Bank of America Stadium",
    city: "Charlotte",
    state: "NC",
    date: "2026-09-13",
    genre: "Soul",
    ticketFrom: 41,
  },
  {
    id: "22",
    artist: "River & Rail",
    concertName: "Crossing Lines",
    venue: "Empower Field",
    city: "Denver",
    state: "CO",
    date: "2026-10-25",
    genre: "Folk Rock",
    ticketFrom: 49,
  },
  {
    id: "23",
    artist: "Apex Theory",
    concertName: "Zero Gravity",
    venue: "Toyota Center",
    city: "Houston",
    state: "TX",
    date: "2026-06-19",
    genre: "Metal",
    ticketFrom: 56,
  },
  {
    id: "24",
    artist: "Sunset Protocol",
    concertName: "After Hours",
    venue: "T-Mobile Arena",
    city: "Las Vegas",
    state: "NV",
    date: "2026-08-08",
    genre: "Electronic",
    ticketFrom: 75,
  },
];

export function getUpcomingStateOptions(): { value: string; label: string }[] {
  const abbrevs = [...new Set(UPCOMING_CONCERTS.map((c) => c.state))].sort();
  return abbrevs.map((abbrev) => ({ value: abbrev, label: abbrev }));
}

export function searchUpcomingConcerts(
  query: string,
  stateFilter: string
): UpcomingConcert[] {
  const q = query.trim().toLowerCase();
  const today = new Date().toISOString().slice(0, 10);

  return UPCOMING_CONCERTS.filter((concert) => {
    if (concert.date < today) return false;
    if (stateFilter && concert.state !== stateFilter) return false;
    if (!q) return true;

    const haystack = [
      concert.artist,
      concert.concertName,
      concert.venue,
      concert.city,
      concert.state,
      concert.genre,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(q);
  }).sort((a, b) => a.date.localeCompare(b.date));
}

export function formatConcertDate(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
