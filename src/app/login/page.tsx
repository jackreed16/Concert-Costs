import { AuthForm } from "@/components/AuthForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse gap-10 w-full max-w-6xl px-4 py-8">
          <div className="flex-1 text-center lg:text-left">
            <p className="text-primary font-semibold uppercase tracking-wide text-sm mb-2">
              Your shows, your stats
            </p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Concert Cost Tracker
            </h1>
            <p className="py-4 text-lg opacity-80 max-w-lg mx-auto lg:mx-0">
              Track every show and every dollar. See what you spend, how long you
              stayed, and whether the night was worth it — all in one friendly
              dashboard.
            </p>
            <ul className="text-sm opacity-70 space-y-2 max-w-md mx-auto lg:mx-0 text-left list-disc list-inside">
              <li>Log tickets, travel, food, merch, and more</li>
              <li>Rate the fun from 1 to 10</li>
              <li>Charts and summaries built for you</li>
            </ul>
          </div>
          <div className="w-full max-w-md flex flex-col gap-4">
            {error && (
              <div role="alert" className="alert alert-error text-sm">
                <span>{error}</span>
              </div>
            )}
            <AuthForm />
          </div>
        </div>
      </div>
    </div>
  );
}
