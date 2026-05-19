import { UpcomingConcertSearch } from "@/components/UpcomingConcertSearch";

export default function SearchConcertsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold">Find Shows</h2>
        <p className="opacity-70 mt-1">
          Explore sample upcoming concerts around the U.S. to plan your next trip.
        </p>
      </div>
      <UpcomingConcertSearch />
    </div>
  );
}
